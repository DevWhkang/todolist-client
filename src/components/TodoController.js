import React, { useState } from 'react';
import styled from 'styled-components';
import { BsPlusSquare } from 'react-icons/bs';
import { GoX } from 'react-icons/go';
import fetch from '../utils/fetch';

const ControllerWrapper = styled.div`
  display: flex;
  justify-content: ${({ isClickedAddBtn }) =>
    isClickedAddBtn ? 'center' : 'space-between'};
  align-items: center;
  width: 700px;

  input {
    width: ${({ isClickedAddBtn }) => (isClickedAddBtn ? '400px' : '200px')};
    height: 35px;
    outline: 0;
    border: 0;
    border-bottom: 2px solid #8c8c8c;
    text-indent: 10px;
    font-size: 20px;
    color: #8c8c8c;

    &::placeholder {
      padding-left: 5px;
    }
  }

  select {
    width: 80px;
    height: 40px;
    color: #8c8c8c;
  }

  button {
    margin-left: 10px;
    width: 50px;
    height: 40px;
    font-size: 15px;
    background: #fff;
    border-radius: 5px;
    cursor: pointer;
    color: #8c8c8c;
    border: 2px solid #8c8c8c;

    &:active {
      transform: translate(0, 5%);
      transition: 0.2s;
    }

    &:hover {
      background: #5f9ea0;
      color: #fff;
    }
  }
`;

const AddForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddIcon = styled(BsPlusSquare)`
  font-size: 35px;
  cursor: pointer;
  color: #5f9ea0;
  margin-top: 5px;

  &:active {
    font-size: 28px;
  }

  &:hover {
    transform: translate(0, -10%);
    transition: 0.2s;
  }
`;

const InputTodo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-size: 20px;
    font-weight: bolder;
    margin-right: 10px;
  }
`;

const RefList = styled.div`
  display: flex;
  margin-top: 10px;
  padding-left: 70px;
  span {
    font-size: 20px;
    color: #5f9ea0;
    margin-right: 10px;
  }
`;

const CancelIcon = styled(GoX)`
  font-size: 30px;
  cursor: pointer;
  color: #b22222;
  margin-left: 20px;

  &:active {
    font-size: 28px;
  }

  &:hover {
    transform: translate(0, -10%);
    transition: 0.2s;
  }
`;

const SearchTodo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RefCancel = styled.a`
  border: 0;
  color: #b22222;
  margin-right: 20px;
`;

const TodoController = ({
  todos,
  tab,
  handleChangeTodos,
  handleChangeLoading,
}) => {
  const [isClickedAddBtn, setIsClickedAddBtn] = useState(false);
  const [text, setText] = useState('');
  const [reference, setReference] = useState([]);

  const handleClickSearch = () => {
    // filter todos and set filter todos
    if (text.length) {
      const filterTodos = todos.filter((item) => item.text.includes(text));
      handleChangeTodos(filterTodos);
      setText('');
    }
  };

  const handleChangeInputText = (e) => {
    setText(e.target.value);
  };

  const handleClickAddBtn = () => {
    setIsClickedAddBtn((state) => !state);
    setText('');
    setReference([]);
  };

  const handleClickRefCancel = (ref) => {
    setReference((state) => state.filter((item) => item !== ref));
  };

  const handleChangeRef = (e) => {
    const selected = e.target.value;

    if (selected.length && !reference.includes(selected)) {
      setReference((state) => [...state, selected]);
    }
  };

  const handleClickAddTodo = () => {
    if (text.length) {
      (async () => {
        handleChangeLoading(true);

        let query = {};
        if (tab === 'incomplete') query.completed = 0;
        else if (tab === 'complete') query.completed = 1;
        else query = null;

        await fetch('post', null, null, {
          text,
          completed: 0,
          reference,
        });
        const data = await fetch('get', null, query);
        handleChangeTodos(data.sort((a, b) => b.id - a.id));
        handleChangeLoading(false);
      })();
    }
  };

  return (
    <ControllerWrapper isClickedAddBtn={isClickedAddBtn}>
      {isClickedAddBtn ? (
        <AddForm>
          <InputTodo>
            <label>Todo:</label>
            <input
              onChange={handleChangeInputText}
              placeholder="What to do?"
              className="input__add"
              type="text"
            />
            <label>Ref:</label>
            <select
              onChange={handleChangeRef}
              name="ref-todos"
              id="select-todo"
            >
              <option value="">TODO ID</option>
              {todos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
            <button onClick={handleClickAddTodo}>생성</button>
            <CancelIcon onClick={handleClickAddBtn} />
          </InputTodo>
          <RefList>
            {reference.map((ref) => (
              <div key={ref}>
                <span>{`@${ref}`}</span>
                <RefCancel onClick={() => handleClickRefCancel(ref)}>
                  ✖️
                </RefCancel>
              </div>
            ))}
          </RefList>
        </AddForm>
      ) : (
        <SearchTodo>
          <div>
            <input
              type="text"
              value={text}
              onChange={handleChangeInputText}
              placeholder="검색어를 입력하세요"
              autoFocus
            />
            <button onClick={handleClickSearch}>검색</button>
          </div>
          <AddIcon onClick={handleClickAddBtn} />
        </SearchTodo>
      )}
    </ControllerWrapper>
  );
};

export default TodoController;
