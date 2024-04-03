import 
{ 
  DragDropContext, 
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
  useAppSelector,
  useAppDispatch
} from './app/hook';
import Board from './components/Board';
import 
{ 
  setSameTodos,
  setCrossTodos
} from './features/todo/todosSlice';

function App() {
  const todos = useAppSelector((state) => state.todos);
  console.log('todos = ', todos);
  const dispatch = useAppDispatch();

  const onDragEnd = ( info: DropResult) => {
    let {destination, draggableId, source} = info;

    if(!destination) return;

    if(destination?.droppableId === source.droppableId) {
      let changeTodos = [...todos[destination.droppableId]];
      changeTodos.splice(source.index, 1);
      changeTodos.splice(destination.index, 0, draggableId);
      dispatch(setSameTodos({changeTodos, destination}))
    }

    if(destination?.droppableId !== source.droppableId) {
      dispatch(setCrossTodos({...todos, destination, source, draggableId}));
    }
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