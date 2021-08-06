import React, { useState } from 'react';
import styled from 'styled-components';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import fetch from '../utils/fetch';
import { refCompletedCheck, relationCheck } from '../utils/refCheck';
import { GoX } from 'react-icons/go';

const TodoItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  border: 2px solid rgba(200, 200, 200, 0.5);
  margin: 30px 13px 13px 13px;
  height: ${({ isRef }) => (isRef ? '85px' : '65px')};
  background: #fff;
`;

const Text = styled.p`
  margin-left: 40px;
  font-size: 20px;

  text-decoration: ${({ isCompleted }) =>
    isCompleted ? 'line-through' : 'none'};
`;

const EditTodo = styled.div`
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModifyTodo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  select {
    width: 80px;
    height: 40px;
    margin-right: 20px;
    color: #8c8c8c;
  }

  label {
    margin-right: 10px;
    font-size: 20px;
    color: #8c8c8c;
  }

  button {
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

const ModifyTodoIcon = styled(BiEditAlt)`
  cursor: pointer;
  font-size: 20px;
  margin-right: 40px;

  &:active {
    font-size: 18px;
  }

  &:hover {
    color: #5f9ea0;
  }
`;

const DeleteTodoIcon = styled(AiOutlineDelete)`
  cursor: pointer;
  font-size: 20px;

  &:active {
    font-size: 18px;
  }

  &:hover {
    color: #b22222;
  }
`;

const CheckBox = styled.input`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: 25px;
  border: 2px solid #bcbcbc;

  &:checked {
    background-color: #34495e;
  }
`;

const ModifyForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
`;

const RefList = styled.div`
  display: flex;
  padding-left: 70px;
  span {
    font-size: 20px;
    color: #5f9ea0;
    margin-right: 10px;
  }
`;

const RefCancel = styled.a`
  border: 0;
  color: #b22222;
  margin-right: 20px;
`;

const ModifyInput = styled.input`
  width: 50%;
  height: 35px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid #8c8c8c;
  text-indent: 10px;
  font-size: 20px;
  color: #8c8c8c;
  margin-right: 10px;
`;

const Todo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RefernceInfo = styled.div`
  background: #f2f2f2;
  border-radius: 0px 0px 10px 10px;
  margin-top: 3px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  color: #8c8c8c;
  font-size: 15px;

  span {
    margin: 0 5px;
    color: #5f9ea0;
  }
`;

const TodoMainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CancelIcon = styled(GoX)`
  font-size: 30px;
  cursor: pointer;
  color: #b22222;
  margin-left: 10px;

  &:active {
    font-size: 28px;
  }

  &:hover {
    transform: translate(0, -10%);
    transition: 0.2s;
  }
`;

const TodoItem = ({
  todo,
  todos,
  tab,
  handleChangeTodos,
  handleChangeShowModal,
  handleChangeSelectedTodo,
}) => {
  const [isModify, setIsModify] = useState(false);
  const [text, setText] = useState(todo.text);
  const [reference, setReference] = useState(
    todo.reference.toString().split(','),
  );
  const handleClickCheckBox = (e) => {
    // patch todo complete
    (async () => {
      let query = {};
      if (tab === 'incomplete') query.completed = 0;
      else if (tab === 'complete') query.completed = 1;
      else query = null;

      await fetch('patch', todo.id, null, {
        completed: e.target.checked,
      });

      const data = await fetch('get', null, query);
      handleChangeTodos(data.sort((a, b) => b.id - a.id));
    })();
  };

  const handleClickModify = () => {
    (async () => {
      let query = {};
      if (tab === 'incomplete') query.completed = 0;
      else if (tab === 'complete') query.completed = 1;
      else query = null;

      await fetch('patch', todo.id, null, {
        text,
        reference,
      });
      const data = await fetch('get', null, query);
      handleChangeTodos(data.sort((a, b) => b.id - a.id));
      setIsModify(false);
    })();
  };
  const handleClickModifyCancel = () => {
    setIsModify(false);
    setReference(todo.reference.toString().split(','));
  };

  const handleClickDeleteIcon = () => {
    handleChangeShowModal(true);
    handleChangeSelectedTodo(todo);
  };

  const handleChangeRef = (e) => {
    if (e.target.value.length && !reference.includes(e.target.value))
      setReference((state) => [...state, e.target.value]);
  };

  const handleClickRefCancel = (ref) => {
    setReference((state) => state.filter((item) => item !== ref));
  };

  return (
    <TodoItemWrapper isRef={reference.length}>
      {isModify ? (
        <ModifyForm>
          <ModifyTodo>
            <label>Todo:</label>
            <ModifyInput
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <label>Ref:</label>
            <select
              onChange={handleChangeRef}
              name="ref-todos"
              id="select-todo"
            >
              <option value="">TODO ID</option>
              {todos.map(
                (item) =>
                  item.id !== todo.id &&
                  !relationCheck(item, todo) && (
                    <option key={item.id} value={item.id}>
                      {item.id}
                    </option>
                  ),
              )}
            </select>
            <button onClick={handleClickModify}>수정</button>
            <CancelIcon onClick={handleClickModifyCancel} />
          </ModifyTodo>
          <RefList>
            {reference.map(
              (ref) =>
                ref && (
                  <div key={ref}>
                    <span>{`@${ref}`}</span>
                    <RefCancel onClick={() => handleClickRefCancel(ref)}>
                      ✖️
                    </RefCancel>
                  </div>
                ),
            )}
          </RefList>
        </ModifyForm>
      ) : (
        <>
          <TodoMainInfo>
            <Todo>
              <CheckBox
                onClick={handleClickCheckBox}
                type="checkbox"
                disabled={!refCompletedCheck(todo, todos) && !todo.completed}
                defaultChecked={todo.completed ? 'checked' : null}
              />
              <Text isCompleted={todo.completed}>{todo.text}</Text>
            </Todo>

            <EditTodo>
              <ModifyTodoIcon onClick={() => setIsModify(true)} />
              <DeleteTodoIcon onClick={handleClickDeleteIcon} />
            </EditTodo>
          </TodoMainInfo>
          <RefernceInfo>
            <div>
              Reference Todo:
              {todo.reference
                .toString()
                .split(',')
                .map((ref) => (
                  <span key={ref}>{ref && `@${ref}`}</span>
                ))}
            </div>
            <div>
              <span>{todo.updated_at}</span>
            </div>
          </RefernceInfo>
        </>
      )}
    </TodoItemWrapper>
  );
};

export default TodoItem;
