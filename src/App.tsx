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
  setCrossTodos,
  trashTodo
} from './features/todo/todosSlice';

import styled from 'styled-components';

import { Droppable } from 'react-beautiful-dnd';
function App() {
  const todos = useAppSelector((state) => state.todosReducer);
  const dispatch = useAppDispatch();
  const onDragEnd = ( info: DropResult) => {
    let {destination, source} = info;
    
    if(!destination) return;

    if(destination?.droppableId === "TrashCan"){
      dispatch(trashTodo(source));
      return ;
    }

    if(destination?.droppableId === source.droppableId) {
      dispatch(setSameTodos({ todos, source, destination }))
    }

    if(destination?.droppableId !== source.droppableId) {
      dispatch(setCrossTodos({todos, destination, source}));
    }
  }

  return <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map(boardId => <Board key={boardId} boardId={boardId} toDos={todos[boardId]} />)}
          <Droppable droppableId="TrashCan">
            {(magic, info) => (
              <TrashCan ref={magic.innerRef} {...magic.droppableProps}>
                나는 휴지통
              </TrashCan>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
  </DragDropContext>
}

const TrashCan = styled.div`
  height: 100px;
  background-color: tomato; /* backgroundColor 대신 background-color 사용 */
`;


export default App;