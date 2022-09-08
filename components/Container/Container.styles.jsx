import styled from 'styled-components';

export const MainContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 8px 8px;
  min-height: 100vh;
`;

export const GistContainer = styled.section`
  width: 100%;
  max-width: 640px;
  max-height: 320px; // ! For Safari
`;

export const ButtonsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 640px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;
