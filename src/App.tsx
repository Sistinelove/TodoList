import TodoFilter from './page/TodoFilter.tsx';
import TodoListItem from './page/TodoListItem.tsx';
import TodoCreateTask from './page/TodoCreateTask.tsx';
import styled from 'styled-components';

function App() {
  // const fetchApi = async () => {
  //   const response = await fetch('http://localhost:4000/todos');
  //   const res = await response.json();
  //   console.log(res);
  //   return res;
  // };
  // useEffect(() => {
  //   fetchApi();
  // }, []);
  return (
    <Container>
      <TodoTitle>TodoList</TodoTitle>
      <TodoFilter />
      <TodoListItem />
      <TodoCreateTask />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const TodoTitle = styled.h1`
  font-size: 50px;
  margin: 0 auto;
`;

export default App;
