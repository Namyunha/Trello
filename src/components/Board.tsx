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
    <Droppable droppableId={boardId}>
    {(magic) => (
      <BoardWrapper ref={magic.innerRef} {...magic.droppableProps}>
        {toDos.map((toDo, index)=> (
          <DraggableCard key={toDo} toDo={toDo} index={index}/>
        ))}
        {magic.placeholder}
      </BoardWrapper>
    )}
  </Droppable>
  )
}

export default Board