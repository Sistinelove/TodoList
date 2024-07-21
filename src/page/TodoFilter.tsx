import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useAppContext } from './ContextProvider';

const TodoFilter = () => {
  const { setFilterText } = useAppContext();
  const handleFiltered = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };
  return (
    <FilterContainer>
      <input onChange={handleFiltered} placeholder="filter" />
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: 100%;
`;

export default TodoFilter;
