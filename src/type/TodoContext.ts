import { createContext } from 'react';
import { TodoItem } from './TodoItem';

interface TodoListFilter {
  setFilterText: (text: string) => void;
  filterText: string;
}

interface TodoListItem {
  todos: TodoItem[];
  toggleDone: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, text: string) => void;
  filterText: string;
}

interface TodoCreateTask {
  addTodo: (text: string) => void;
}

const TodoListItemContext = createContext<TodoListItem | null>(null);
const TodoCreateTaskContext = createContext<TodoCreateTask | null>(null);
const TodoFilterContext = createContext<TodoListFilter | null>(null);

export { TodoListItemContext, TodoCreateTaskContext, TodoFilterContext };
