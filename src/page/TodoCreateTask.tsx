import React, { useRef } from 'react';

import { TodoCreateTaskContext } from '../type/TodoContext.ts';
import { useAppContext } from '../Context/ContextProvider.tsx';

const TodoCreateTask = () => {
  const { addTodo } = useAppContext(TodoCreateTaskContext);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const value = formData.get('value') as string;
      if (value !== '') {
        await addTodo(value);
      }
      formRef.current.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type="text" name="value" />
      <input type="submit" />
    </form>
  );
};

export default TodoCreateTask;
