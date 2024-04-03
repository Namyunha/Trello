import 
{ 
  DragDropContext, 
  Droppable, 
  Draggable 
} from 'react-beautiful-dnd';
import {
  Wrapper,
  Boards,
} 
from "./styles"
import 
{ 
  DropResult 
} from 'react-beautiful-dnd';

import 
{ 
  useAppSelector 
} from './app/hook';
import Board from './components/Board';

function App() {
  const todos = useAppSelector((state) => state.todos);
  console.log('todos = ', todos);

  const onDragEnd = ({destination, source}: DropResult) => {
    if(!destination){
      return
    }
    if(source?.index === destination?.index) {
        return;
    }
    // let newTodos = [...toDos];
    // let src = newTodos.splice(source.index, 1);
    // newTodos.splice(destination?.index, 0, src[0]);
    // toDos = newTodos;
  }

  return <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map(boardId => <Board key={boardId} boardId={boardId} toDos={todos[boardId]} />)}
        </Boards>
      </Wrapper>
  </DragDropContext>
}

export default App;