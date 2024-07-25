import { ReactNode, useState } from 'react';
import { TodoItem } from '../type/TodoItem';
import { TodoCreateTaskContext } from '../type/TodoContext';

const TodoCreateProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = async (text: string) => {
    const response = await fetch('http://localhost:3001/todos/addTodo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: text, done: false }),
    });
    if (!response.ok) {
      throw new Error('Не получилось добавить задачу в бд');
    }
    const newTodo: TodoItem = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return <TodoCreateTaskContext.Provider value={{ addTodo }}>{children}</TodoCreateTaskContext.Provider>;
};

export default TodoCreateProvider;
