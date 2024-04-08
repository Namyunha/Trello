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

import { FaTrash } from "react-icons/fa6";

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
        </Boards>
        <Droppable droppableId="TrashCan">
          {(magic, info) => (
            <TrashCan ref={magic.innerRef} {...magic.droppableProps}>
              <FaTrash />
            </TrashCan>
          )}
        </Droppable>
      </Wrapper>
  </DragDropContext>
}

const TrashCan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  padding: 10px;
  background-color: tomato; /* backgroundColor 대신 background-color 사용 */
`;


export default App;