import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Wrapper,
  Boards,
  Board,
  Card } 
from "./styles"
import { DropResult } from 'react-beautiful-dnd';
import DraggableCard from './components/Draggable';

let toDos = ["a", "b", "c", "d", "e", "f"];


function App() {
  const onDragEnd = ({destination, source}: DropResult) => {
    if(!destination){
      return
    }
    if(source?.index === destination?.index) {
        return;
    }
    let newTodos = [...toDos];
    let src = newTodos.splice(source.index, 1);
    newTodos.splice(destination?.index, 0, src[0]);
    toDos = newTodos;
  }

  return <DragDropContext onDragEnd={onDragEnd}>
     <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} toDo={toDo} index={index}/>
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