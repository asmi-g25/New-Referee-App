import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import * as pdfModule from 'pdf-parse/node';
const pdf = (pdfModule as any).default || pdfModule;
import { GoogleGenAI, Type } from '@google/genai';
import { SessionState, Document, Dispute, AIResult } from './src/types';
import dotenv from 'dotenv';

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  const PORT = 3000;

  // Session storage (in-memory for MVP)
  const sessions: Map<string, SessionState> = new Map();

  app.use(express.json());

  // API Routes
  app.post('/api/upload-pdf', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    try {
      const data = await pdf(req.file.buffer);
      res.json({ text: data.text });
    } catch (error) {
      console.error('PDF parsing error:', error);
      res.status(500).json({ error: 'Failed to parse PDF' });
    }
  });

  // Socket.io Logic
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-session', (sessionId: string) => {
      socket.join(sessionId);
      
      if (!sessions.has(sessionId)) {
        sessions.set(sessionId, {
          sessionId,
          users: [],
          documents: [],
          dispute: null,
          aiResult: null,
          isProcessing: false,
        });
      }

      const session = sessions.get(sessionId)!;
      
      // Assign role if possible
      let role: 'client' | 'provider' | null = null;
      if (session.users.length === 0) role = 'client';
      else if (session.users.length === 1) role = 'provider';

      const newUser = { id: socket.id, role, agreed: false };
      session.users.push(newUser);

      io.to(sessionId).emit('session-update', session);
      socket.emit('assigned-role', role);
    });

    socket.on('update-agreement', ({ sessionId, agreed }: { sessionId: string, agreed: boolean }) => {
      const session = sessions.get(sessionId);
      if (!session) return;

      const user = session.users.find(u => u.id === socket.id);
      if (user) {
        user.agreed = agreed;
        io.to(sessionId).emit('session-update', session);
      }
    });

    socket.on('add-document', ({ sessionId, doc }: { sessionId: string, doc: Partial<Document> }) => {
      const session = sessions.get(sessionId);
      if (!session) return;

      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: doc.name || 'Untitled',
        content: doc.content || '',
        uploadedBy: socket.id,
        status: 'pending',
        approvals: [],
        rejections: [],
        timestamp: new Date().toISOString(),
      };

      session.documents.push(newDoc);
      io.to(sessionId).emit('session-update', session);
    });

    socket.on('approve-document', ({ sessionId, docId, approved }: { sessionId: string, docId: string, approved: boolean }) => {
      const session = sessions.get(sessionId);
      if (!session) return;

      const doc = session.documents.find(d => d.id === docId);
      if (!doc) return;

      if (approved) {
        if (!doc.approvals.includes(socket.id)) doc.approvals.push(socket.id);
        doc.rejections = doc.rejections.filter(id => id !== socket.id);
      } else {
        if (!doc.rejections.includes(socket.id)) doc.rejections.push(socket.id);
        doc.approvals = doc.approvals.filter(id => id !== socket.id);
      }

      // Check status
      const activeUsers = session.users.filter(u => u.role !== null);
      if (doc.approvals.length >= activeUsers.length && activeUsers.length >= 2) {
        doc.status = 'approved';
      } else if (doc.rejections.length > 0) {
        doc.status = 'rejected';
      } else {
        doc.status = 'pending';
      }

      io.to(sessionId).emit('session-update', session);
    });

    socket.on('submit-dispute', ({ sessionId, text }: { sessionId: string, text: string }) => {
      const session = sessions.get(sessionId);
      if (!session) return;

      session.dispute = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        submittedBy: socket.id,
        status: 'pending',
        approvals: [socket.id],
        rejections: [],
        timestamp: new Date().toISOString(),
      };

      io.to(sessionId).emit('session-update', session);
    });

    socket.on('approve-dispute', async ({ sessionId, approved }: { sessionId: string, approved: boolean }) => {
      const session = sessions.get(sessionId);
      if (!session || !session.dispute) return;

      if (approved) {
        if (!session.dispute.approvals.includes(socket.id)) session.dispute.approvals.push(socket.id);
        session.dispute.rejections = session.dispute.rejections.filter(id => id !== socket.id);
      } else {
        if (!session.dispute.rejections.includes(socket.id)) session.dispute.rejections.push(socket.id);
        session.dispute.approvals = session.dispute.approvals.filter(id => id !== socket.id);
      }

      const activeUsers = session.users.filter(u => u.role !== null);
      if (session.dispute.approvals.length >= activeUsers.length && activeUsers.length >= 2) {
        session.dispute.status = 'accepted';
        // Trigger AI
        await runAIArbitration(sessionId);
      } else if (session.dispute.rejections.length > 0) {
        session.dispute.status = 'rejected';
      }

      io.to(sessionId).emit('session-update', session);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      // Optional: Cleanup empty sessions or handle user leaving
    });
  });

  async function runAIArbitration(sessionId: string) {
    const session = sessions.get(sessionId);
    if (!session || !session.dispute) return;

    session.isProcessing = true;
    io.to(sessionId).emit('session-update', session);

    try {
      const approvedDocs = session.documents.filter(d => d.status === 'approved');
      const docContext = approvedDocs.map(d => `Document: ${d.name}\nContent: ${d.content}`).join('\n\n---\n\n');
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `You are a neutral AI referee resolving a project scope dispute. 
        Use ONLY the provided approved documents as context.
        
        Approved Documents:
        ${docContext}
        
        Dispute:
        "${session.dispute.text}"
        
        Provide a structured response in JSON format with:
        - ruling: A clear, neutral decision (Yes/No or Party A/B).
        - explanation: Simple reasoning based on the documents.
        - references: Quotes or specific sections from the documents that support the ruling.
        - nextSteps: 2-3 actionable steps for the parties to resolve the issue.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ruling: { type: Type.STRING },
              explanation: { type: Type.STRING },
              references: { type: Type.ARRAY, items: { type: Type.STRING } },
              nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['ruling', 'explanation', 'references', 'nextSteps'],
          },
        }
      });

      const response = await model;
      const result = JSON.parse(response.text || '{}');
      session.aiResult = result;
    } catch (error) {
      console.error('AI Arbitration error:', error);
      session.aiResult = {
        ruling: 'Error',
        explanation: 'The AI was unable to process the dispute at this time.',
        references: [],
        nextSteps: ['Try again later', 'Contact support'],
      };
    } finally {
      session.isProcessing = false;
      io.to(sessionId).emit('session-update', session);
    }
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
