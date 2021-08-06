import React from 'react';
import styled from 'styled-components';
import { VscLoading } from 'react-icons/vsc';
import TodoItem from './TodoItem';

const TodosWrapper = styled.div`
  background: #f9feff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 100%;
  border: 2px solid rgba(200, 200, 200, 0.5);
  border-radius: 0 5px 10px 10px;
  border-top: 0;
  height: 550px;
`;

const TodoList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

const EmptyTodos = styled.h2`
  margin-top: 180px;
  color: #5f9ea0;
`;

const Loading = styled(VscLoading)``;

const Todos = ({
  todos,
  tab,
  loading,
  handleChangeTodos,
  handleChangeShowModal,
  handleChangeSelectedTodo,
}) => {
  return (
    <TodosWrapper>
      {loading ? (
        <Loading />
      ) : (
        <TodoList>
          {todos.length ? (
            todos.map((todo) => (
              <TodoItem
                handleChangeSelectedTodo={handleChangeSelectedTodo}
                handleChangeTodos={handleChangeTodos}
                handleChangeShowModal={handleChangeShowModal}
                key={todo.id}
                todos={todos}
                todo={todo}
                tab={tab}
              />
            ))
          ) : (
            <EmptyTodos>할 일이 없어요...</EmptyTodos>
          )}
        </TodoList>
      )}
    </TodosWrapper>
  );
};

export default Todos;
