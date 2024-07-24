import express from 'express';
import cors from 'cors';
import prisma from './prisma/prisma';
import todoRoutes from './routes/todoRoutes';

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.use(todoRoutes);

const server = app.listen(PORT, () => console.log('Backend started on port', PORT));

const gracefulShutdown = (signal: string) => {
  console.log(`Received ${signal}. Closing server...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    await prisma.$disconnect();
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Force closing server...');
    process.exit(1);
  }, 5000);
};

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

process.on('SIGTERM', () => {
  gracefulShutdown('SIGTERM');
});

process.on('SIGINT', () => {
  gracefulShutdown('SIGINT');
});
