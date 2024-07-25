import { ReactNode, useState } from 'react';
import TodoListItem from '../page/TodoListItem.tsx';
import { TodoUpdateContext } from '../type/TodoContext.ts';

const TodoUpdateAllTodo = ({ children }: { children: ReactNode }) => {
  const [updateTodos, setUpdateTodos] = useState<(typeof TodoListItem)[]>([]);
  const refreshTodos = async () => {
    const response = await fetch('http://localhost:3001/todos');
    const res = await response.json();
    setUpdateTodos(res);
  };
  return <TodoUpdateContext.Provider value={{ refreshTodos }}>{children}</TodoUpdateContext.Provider>;
};

export default TodoUpdateAllTodo;
