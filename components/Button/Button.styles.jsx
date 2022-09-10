import styled from 'styled-components';

const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: transparent;
  background-color: var(--white);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  cursor: pointer;
  color: var(--black);
  font-family: 'Roboto', sans-serif;
  user-select: none;
  :hover {
    transform: scale(1.02);
  }
  :active {
    opacity: 0.8;
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
    :hover {
      transform: none;
    }
  }
`;

export const OptionButton = styled(DefaultButton)`
  width: 100%;
  height: 44px;
  border-radius: 16px;
  font-size: 15px;

  @media (max-width: 800px) {
    height: 56px;
  }
`;

export const ActionButton = styled(DefaultButton)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 100%;
`;
