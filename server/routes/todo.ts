import { Router } from 'express';
import Todo from '../models';

const router = Router();

router.get('/todos', async (_req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

export default router;
