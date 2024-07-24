import React from 'react';

import { useAppContext } from './ContextProvider.tsx';

const TodoCreateTask = () => {
  const { addTodo } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('value') as string;
    await addTodo(value);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="value" />
      <input type="submit" />
    </form>
  );
};

export default TodoCreateTask;
