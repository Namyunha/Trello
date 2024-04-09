import styled from "styled-components";

// interface

export interface IAreaProps {
  $isDraggingFromThis: boolean;
  $isDraggingOver: boolean;
}
export interface TrashCanProps {
  $isDraggingFromThis: boolean;
  $draggingOverWith: boolean;
  $isDraggingOver: boolean;
}


// styled Components

// App.tsx
export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10%;
  align-items: center;
`;

export const BoardAddFormArea = styled.div`
`
export const Boards = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 3%;
  padding: 0% 5%;
  max-width: 70%;
`;
export const TrashCan = styled.div<TrashCanProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  width: 100px;
  height: 100px;
  background-color: tomato;
`;


// Board.tsx
export const BoardFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;
  padding: 20px;
`;

export const BoardTitle = styled.h2`
`;

export const BoardForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const BoardFormInput = styled.input`
  
`

export const BoardWrapper = styled.div<IAreaProps>`
`;

// Draggable.tsx
export const Card = styled.div<{ $isDraggingOver: boolean }>`
`;

export const ErrorMessage = styled.span`
color: red;
font-size: 14px;
`

