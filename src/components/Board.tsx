import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DraggableCard from '../components/Draggable'
import { BoardWrapper } from "../styles"

interface IBoard {
    toDos: string[]
    boardId: string
}
const Board = ({toDos, boardId}:IBoard) => {
    
  return (
    <Wrapper>  
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
            {(magic, info) => (
                <BoardWrapper 
                $isDraggingOver={info.isDraggingOver}
                $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index)=> (
                    <DraggableCard key={toDo} toDo={toDo} index={index}/>
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