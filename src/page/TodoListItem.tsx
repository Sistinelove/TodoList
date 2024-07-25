import styled from 'styled-components';
import { useAppContext } from '../Context/ContextProvider.tsx';
import { ChangeEvent, useState } from 'react';
import { TodoFilterContext, TodoListItemContext } from '../type/TodoContext.ts';

const TodoListItem = () => {
  const { todos, toggleDone, deleteTodo, changeTodo } = useAppContext(TodoListItemContext);
  const { filterText } = useAppContext(TodoFilterContext);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const filteredTodos = todos.filter((todo) => todo.title.includes(filterText));

  const handleEdit = (id: number, currentText: string) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleSave = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      console.error(`Не найден ${id}`);
      return;
    }
    const oldText = todo.title;
    const userConfirmed = window.confirm(`Вы хотите перезаписать старое значение "${oldText}" на "${editText}"?`);
    if (userConfirmed) {
      await changeTodo(id, editText);
      setEditId(null);
      setEditText('');
    }
  };

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  return (
    <ContainerTodo>
      {filteredTodos.map((todo) => (
        <ContainerTask key={todo.id}>
          <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo.id)} />
          {editId === todo.id ? (
            <input type="text" value={editText} onChange={handleChangeText} />
          ) : (
            <TodoTask $done={todo.done}>{todo.title}</TodoTask>
          )}
          <ContainerButtonTask>
            {editId === todo.id ? (
              <button onClick={() => handleSave(todo.id)}>Сохранить</button>
            ) : (
              <button onClick={() => handleEdit(todo.id, todo.title)}>Редактировать</button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
          </ContainerButtonTask>
        </ContainerTask>
      ))}
    </ContainerTodo>
  );
};

const ContainerTask = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContainerTodo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContainerButtonTask = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const TodoTask = styled.div<{ $done: boolean }>`
  margin: 0 10px;
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
`;

export default TodoListItem;
