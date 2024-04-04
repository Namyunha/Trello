import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
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
  background-color: ${props => props.$isDraggingOver ? "#dfe6e9" : props.$isDraggingFromThis ? "#b2bec3" : "transparent"};
  border-radius: 5px;
  min-height: 200px;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

export const Card = styled.div<{ $isDraggingOver: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.$isDraggingOver ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props => 
  props.$isDraggingOver ? '0px 2px 10px rgba(0, 0, 0, 0.05)' : "none"}
`;