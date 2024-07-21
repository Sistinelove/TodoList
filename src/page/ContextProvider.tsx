import React, { ReactNode, useContext, useState } from 'react';
import { TodoItem } from '../type/TodoItem';
import TodoContext from '../type/TodoContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filterText, setFilterText] = useState('');

  const addTodo = (text: string) => {
    const newTodo: TodoItem = { id: Date.now(), text, done: false };
    setTodos([...todos, newTodo]);
  };

  const toggleDone = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const changeTodo = (id: number, text: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <TodoContext.Provider value={{ todos, filterText, addTodo, toggleDone, deleteTodo, changeTodo, setFilterText }}>
      {children}
    </TodoContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(TodoContext);
  if (context === null) throw new Error('Use app context within provider!');
  return context;
}
