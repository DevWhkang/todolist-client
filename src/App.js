import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Todos from './components/Todos';
import Pagination from './components/Pagination';
import TodoController from './components/TodoController';
import fetch from './utils/fetch';
import Modal from './components/Modal';

const AppWrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 60px;
    color: #5f9ea0;
  }
`;

const TodosSection = styled.section`
  border-radius: 10px;
  width: 700px;
  margin-top: 20px;
`;

const Tab = styled.div`
  display: flex;
`;

const EmptyTab = styled.div`
  border-bottom: 2px solid rgba(200, 200, 200, 0.5);
  width: 10%;
`;

const TabButton = styled.button`
  border: 0;
  border-radius: 10px 10px 0 0;
  border: 2px solid rgba(200, 200, 200, 0.5);
  border-bottom: ${({ tab, id }) =>
    tab === id ? 'none' : '2px solid rgba(200, 200, 200, 0.5)'};
  background: ${({ tab, id }) => (tab === id ? '#f9feff' : '#fff')};
  width: 30%;
  height: 50px;
  font-size: 20px;
  color: #8c8c8c;
  cursor: pointer;

  &:hover {
    font-size: 22px;
    transition: 0.2s;
  }
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(4);
  const [tab, setTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSeletedTodo] = useState({});

  const currentTodos = useMemo(() => {
    const indexOfLastTodos = currentPage * todosPerPage;
    const indexOfFirstTodos = indexOfLastTodos - todosPerPage;
    return todos.slice(indexOfFirstTodos, indexOfLastTodos);
  }, [currentPage, todosPerPage, todos]);

  const paginate = (num) => setCurrentPage(num);

  const handleClickTab = (e) => {
    setTab(e.currentTarget.id);
    let query = {};
    if (e.currentTarget.id === 'incomplete') query.completed = 0;
    else if (e.currentTarget.id === 'complete') query.completed = 1;
    else query = null;

    (async () => {
      const data = await fetch('get', null, query);
      setTodos(data.sort((a, b) => b.id - a.id));
      setCurrentPage(1);
    })();
  };

  const handleClickDelete = (todo) => {
    (async () => {
      let query = {};
      if (tab === 'incomplete') query.completed = 0;
      else if (tab === 'complete') query.completed = 1;
      else query = null;

      await fetch('delete', todo.id);
      const data = await fetch('get', null, query);
      setTodos(data.sort((a, b) => b.id - a.id));
      setShowModal(false);
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetch('get');
      setTodos(data.sort((a, b) => b.id - a.id));
      setLoading(false);
    })();
  }, []);

  return (
    <AppWrapper>
      <h1>🗒 Todos</h1>
      <TodoController
        todos={todos}
        tab={tab}
        handleChangeTodos={setTodos}
        handleChangeLoading={setLoading}
      />
      <TodosSection>
        <Tab>
          <TabButton id="all" tab={tab} onClick={handleClickTab}>
            <div>모든 할 일</div>
          </TabButton>
          <TabButton id="incomplete" tab={tab} onClick={handleClickTab}>
            <div>미완료</div>
          </TabButton>
          <TabButton id="complete" tab={tab} onClick={handleClickTab}>
            <div>완료</div>
          </TabButton>
          <EmptyTab />
        </Tab>
        <Todos
          handleChangeSelectedTodo={setSeletedTodo}
          handleChangeTodos={setTodos}
          handleChangeShowModal={setShowModal}
          todos={currentTodos}
          loading={loading}
          tab={tab}
        />
      </TodosSection>
      <Pagination
        currentPage={currentPage}
        handleChangeCurrentPage={setCurrentPage}
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        paginate={paginate}
      />
      {showModal && (
        <Modal
          text="정말 삭제 하시겠습니까?"
          target={selectedTodo}
          handleClickOk={handleClickDelete}
          handleClickClose={setShowModal}
        />
      )}
    </AppWrapper>
  );
}

export default App;
