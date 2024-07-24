import express, { Request, Response } from 'express';
import cors from 'cors';
import prisma from './prisma/prisma';

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/todos', async (req: Request, res: Response) => {
  const todos = await prisma.todoList.findMany();
  res.json(todos);
});

app.post('/todos/addTodo', async (req: Request, res: Response) => {
  const { title, done } = req.body;
  try {
    const newTodo = await prisma.todoList.create({
      data: {
        title,
        done: done || false,
      },
    });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/todos/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteTodo = await prisma.todoList.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.put('/todos/changeTodo/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body; // title изменяется
  try {
    const changeTodo = await prisma.todoList.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
      },
    });
    res.json(changeTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.put('/todos/toggle/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todoList.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedCheckBox = await prisma.todoList.update({
      where: {
        id: Number(id),
      },
      data: {
        done: !todo.done,
      },
    });
    res.json(updatedCheckBox);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update checkbox' });
  }
});

const server = app.listen(PORT, () => console.log('backend started'));

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
