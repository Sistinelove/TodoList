import { ChangeEvent, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../Context/ContextProvider.tsx';
import { TodoFilterContext } from '../type/TodoContext.ts';

const TodoFilter = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const { setFilterText } = useAppContext(TodoFilterContext);
  const handleFiltered = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilterText(e.target.value);
    },
    [setFilterText],
  );
  return (
    <FilterContainer>
      <input ref={refInput} placeholder="filter" onChange={handleFiltered} />
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: 100%;
`;

export default TodoFilter;
