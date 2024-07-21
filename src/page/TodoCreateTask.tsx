import React, { useState } from 'react';

import { useAppContext } from './ContextProvider.tsx';

const TodoCreateTask = () => {
  const { addTodo } = useAppContext();
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <input type="submit" />
    </form>
  );
};

export default TodoCreateTask;
