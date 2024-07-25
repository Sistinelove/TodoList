import { ReactNode, useEffect, useState } from 'react';
import { TodoItem } from '../type/TodoItem';
import { TodoListItemContext } from '../type/TodoContext';

const TodoListProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3001/todos');
    const res = await response.json();
    setTodos(res);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

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
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
    <TodoListItemContext.Provider value={{ todos, toggleDone, deleteTodo, changeTodo }}>
      {children}
    </TodoListItemContext.Provider>
  );
};

export default TodoListProvider;
