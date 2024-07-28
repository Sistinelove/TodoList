import { Context, ReactNode, useContext } from 'react';
import TodoFilterProvider from './ConextFilter.tsx';
import TodoListProvider from './ContextListItem.tsx';
import TodoCreateProvider from './ContextCreateTask.tsx';
import TodoUpdateAllTodo from './ContextUpdateAllTodo.tsx';

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TodoFilterProvider>
      <TodoListProvider>
        <TodoCreateProvider>
          <TodoUpdateAllTodo>{children}</TodoUpdateAllTodo>
        </TodoCreateProvider>
      </TodoListProvider>
    </TodoFilterProvider>
  );
};

export function useAppContext<T>(context: Context<T | null>): T {
  const contextValue = useContext(context);
  if (contextValue === null) throw new Error('Не получилось использовать контекс!');
  return contextValue;
}

export default TodoProvider;
