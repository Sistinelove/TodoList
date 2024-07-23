import { ReactNode, useContext, useEffect, useState } from 'react';
import { TodoItem } from '../type/TodoItem';
import TodoContext from '../type/TodoContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filterText, setFilterText] = useState('');

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:4000/todos');
    const res = await response.json();
    setTodos(res);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    const response = await fetch('http://localhost:4000/addTodo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: text, done: false }),
    });
    if (!response.ok) {
      throw new Error('Не получилось добавить задачу в бд');
    }
    const newTodo: TodoItem = await response.json();
    setTodos([...todos, newTodo]);
  };

  const toggleDone = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };
  const deleteTodo = async (id: number) => {
    const response = await fetch(`http://localhost:4000/deleteTodo/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.error('Failed to delete todo');
      return;
    }
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const changeTodo = async (id: number, text: string) => {
    const response = await fetch(' http://localhost:4000/changeTodo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text }),
    });
    if (!response.ok) {
      console.error('Failed to delete todo');
      return;
    }
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
