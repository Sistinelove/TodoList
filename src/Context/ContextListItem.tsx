import { ReactNode, useEffect, useState } from 'react';
import { TodoItem } from '../type/TodoItem';
import { TodoListItemContext } from '../type/TodoContext';
import ApiClient from '../type/ApiClient.ts';

const TodoListProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await ApiClient.getTodos();
      setTodos(res);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleDone = async (id: number) => {
    try {
      const updatedTodo = await ApiClient.toggleDone(id);
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Failed to toggle todo', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await ApiClient.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  const changeTodo = async (id: number, title: string) => {
    try {
      const updatedTodo = await ApiClient.updateTodo(id, { title });
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  };

  return (
    <TodoListItemContext.Provider value={{ todos, toggleDone, deleteTodo, changeTodo, fetchTodos }}>
      {children}
    </TodoListItemContext.Provider>
  );
};

export default TodoListProvider;
