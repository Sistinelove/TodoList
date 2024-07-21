import { TodoItem } from './TodoItem.ts';
import { createContext } from 'react';

interface ContextType {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleDone: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, text: string) => void;
  setFilterText: (text: string) => void;
  filterText: string;
}

const TodoContext = createContext<ContextType | null>(null);

export default TodoContext;
