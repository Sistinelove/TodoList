import { ReactNode, useState } from 'react';
import { TodoUpdateContext } from '../type/TodoContext.ts';
import ApiClient from '../type/ApiClient.ts';
import { TodoItem } from '../type/TodoItem.ts';

const TodoUpdateAllTodo = ({ children }: { children: ReactNode }) => {
  const [updateTodos, setUpdateTodos] = useState<TodoItem[]>([]);
  const refreshTodos = async () => {
    try {
      const res = await ApiClient.getTodos();
      setUpdateTodos(res);
    } catch (error) {
      console.error('Failed to refresh', error);
    }
  };
  return <TodoUpdateContext.Provider value={{ refreshTodos }}>{children}</TodoUpdateContext.Provider>;
};

export default TodoUpdateAllTodo;
