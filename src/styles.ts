import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

interface IAreaProps {
  $isDraggingFromThis: boolean;
  $isDraggingOver: boolean;
}


export const BoardWrapper = styled.div<IAreaProps>`
  background-color: ${props => props.$isDraggingOver ? "pink" : props.$isDraggingFromThis ? "red" : "blue"};
  border-radius: 5px;
  min-height: 200px;
  transition: background-color 0.3s ease-in-out;
`;

export const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;