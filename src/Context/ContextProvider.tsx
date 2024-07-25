import { ReactNode, useContext } from 'react';
import TodoFilterProvider from './ConextFilter.tsx';
import TodoListProvider from './ContextListItem.tsx';
import TodoCreateProvider from './ContextCreateTask.tsx';

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TodoFilterProvider>
      <TodoListProvider>
        <TodoCreateProvider>{children}</TodoCreateProvider>
      </TodoListProvider>
    </TodoFilterProvider>
  );
};

export function useAppContext<T>(context: React.Context<T | null>): T {
  const contextValue = useContext(context);
  if (contextValue === null) throw new Error('Не получилось использовать контекс!');
  return contextValue;
}

export default TodoProvider;
