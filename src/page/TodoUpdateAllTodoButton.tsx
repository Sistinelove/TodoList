import { useContext } from 'react';
import { TodoUpdateContext } from '../type/TodoContext.ts';

const TodoUpdateAllTodoButton = () => {
  const { refreshTodos } = useContext(TodoUpdateContext)!;

  return (
    <div>
      <button onClick={refreshTodos}>Обновить все тудухи</button>
    </div>
  );
};

export default TodoUpdateAllTodoButton;
