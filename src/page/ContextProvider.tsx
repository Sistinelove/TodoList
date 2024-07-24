import { ReactNode, useContext, useEffect, useState } from 'react';
import { TodoItem } from '../type/TodoItem';
import TodoContext from '../type/TodoContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filterText, setFilterText] = useState('');

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3001/todos');
    const res = await response.json();
    setTodos(res);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
    setTodos([...todos, newTodo]);
  };
  const toggleDone = async (id: number) => {
    const response = await fetch(`http://localhost:3001/todos/toggle/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.error('Не получилось изменить checkbox');
      return;
    }
    const updatedTodo: TodoItem = await response.json();
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id: number) => {
    const response = await fetch(`http://localhost:3001/todos/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.error('Failed to delete todo');
      return;
    }
    const updateTodo: TodoItem = await response.json();
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updateTodo : todo)));
  };

  const changeTodo = async (id: number, title: string) => {
    const response = await fetch(`http://localhost:3001/todos/changeTodo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      console.error('Failed to update todo');
      return;
    }
    const updatedTodo: TodoItem = await response.json();
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: updatedTodo.title, done: updatedTodo.done } : todo)),
    );
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
