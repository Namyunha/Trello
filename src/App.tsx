import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Wrapper,
  Boards,
  Board,
  Card } 
from "./styles"

const toDos = ["a", "b", "c", "d", "e", "f"];


function App() {
  const onDragEnd = () => {}
  return <DragDropContext onDragEnd={onDragEnd}>
     <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
  </DragDropContext>
}

export default App;