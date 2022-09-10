import styled from 'styled-components';

export const MainContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 12px 8px;
  min-height: 100vh;
`;

export const GistContainer = styled.section`
  width: 100%;
  max-width: 800px;
  max-height: 320px; // ! For Safari
`;

export const ButtonsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  width: 100%;
  max-width: calc(800px * 0.97);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 16px;
    width: 97%;
  }
`;
