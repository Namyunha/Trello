import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DraggableCard from '../components/Draggable'
import { BoardWrapper } from "../styles"
import { useRef } from "react";
import { ITodo } from "../features/todo/todosSlice";

interface IBoard {
    toDos: ITodo[]
    boardId: string
}
const Board = ({toDos, boardId}:IBoard) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // 위는 JS에서  document.querySelector 하는 것과 동일하다.
  const onClick = () => {
    inputRef.current?.focus();
    // 위는 react가 아니라 일반 JS를 이용한 것이다.
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000)
  };
  return (
    <Wrapper>  
        <Title>{boardId}</Title>
        <input ref={inputRef} placeholder="grab me" />
        <button onClick={onClick}>click me</button>
        <Droppable droppableId={boardId}>
            {(magic, info) => (
                <BoardWrapper
                  $isDraggingOver={info.isDraggingOver}
                  $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                  ref={magic.innerRef} {...magic.droppableProps}>
                {/* 위는 beautiful-dnd가 HTML 요소에 접근할 수 있어야 한다는 것이다. 
                beautiful-dnd를 이용해서 transformation을 하고 event listener를 넣고
                여러가지를 시작하는 트리거 역할을 한다. */}
                    {toDos.map((toDo, index)=> (
                      <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index}/>
                    ))}
                    {magic.placeholder}
                </BoardWrapper>
            )}
        </Droppable>
    </Wrapper>
  )
}

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;
export default Board