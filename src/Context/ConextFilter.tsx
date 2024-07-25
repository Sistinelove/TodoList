import { ReactNode, useState } from 'react';
import { TodoFilterContext } from '../type/TodoContext';

const TodoFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterText, setFilterText] = useState<string>('');

  return <TodoFilterContext.Provider value={{ filterText, setFilterText }}>{children}</TodoFilterContext.Provider>;
};

export default TodoFilterProvider;
