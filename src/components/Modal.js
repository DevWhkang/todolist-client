import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 20%;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 60%;
`;

const ModalFooter = styled.div`
  width: 100%;
  height: 20%;
`;

const ModalController = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    margin-right: 20px;
    width: 70px;
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

const Modal = ({ text, target, handleClickOk, handleClickClose }) => {
  return (
    <Background>
      <ModalWrapper>
        <ModalHeader />
        <ModalContent>
          <h2>{text}</h2>
        </ModalContent>
        <ModalFooter>
          <ModalController>
            <button onClick={() => handleClickOk(target)}>네</button>
            <button onClick={() => handleClickClose(false)}>아니오</button>
          </ModalController>
        </ModalFooter>
      </ModalWrapper>
    </Background>
  );
};

export default Modal;
