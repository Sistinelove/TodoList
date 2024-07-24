import { Request, Response, Router } from 'express';
import prisma from '../prisma/prisma';

const router = Router();

router.get('/todos', async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todoList.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.post('/todos/addTodo', async (req: Request, res: Response) => {
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

router.delete('/todos/delete/:id', async (req: Request, res: Response) => {
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

router.put('/todos/changeTodo/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
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

router.put('/todos/toggle/:id', async (req: Request, res: Response) => {
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

export default router;
