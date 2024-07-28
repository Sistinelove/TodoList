import { ReactNode, useState } from 'react';
import { TodoItem } from '../type/TodoItem';
import { TodoCreateTaskContext } from '../type/TodoContext';
import ApiClient from '../type/ApiClient.ts';

const TodoCreateProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = async (text: string) => {
    try {
      const newTodo = await ApiClient.addTodo({ title: text, done: false });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  };

  return <TodoCreateTaskContext.Provider value={{ addTodo }}>{children}</TodoCreateTaskContext.Provider>;
};

export default TodoCreateProvider;
