import express, { Request, Response } from 'express';
import cors from 'cors';
import prisma from './prisma/prisma';

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/todos', async (req: Request, res: Response) => {
  const todos = await prisma.todoList.findMany();
  res.json(todos);
});

app.post('/addTodo', async (req: Request, res: Response) => {
  const { title, done } = req.body;
  try {
    const newTodo = await prisma.todoList.create({
      data: {
        title: title,
        done: done || false,
      },
    });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/deleteTodo/:id', async (req: Request, res: Response) => {
  console.log('Received request to delete todo');
  const { id } = req.body;
  console.log('Todo ID to delete:', id);
  try {
    const deleteTodo = await prisma.todoList.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteTodo);
  } catch (error) {
    console.error('Failed to delete todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(PORT, () => console.log('HELLO MOTHERFUCKER'));
