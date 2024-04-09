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

import { FaTrashRestoreAlt } from "react-icons/fa";

import styled from 'styled-components';

import { Droppable } from 'react-beautiful-dnd';

import {useForm} from 'react-hook-form'

import { addBoard } from './features/todo/todosSlice';

export interface IAreaProps {
  $isDraggingFromThis: boolean;
  $draggingOverWith: boolean;
  $isDraggingOver: boolean;
}

function App() {
  const { register, handleSubmit, formState: {errors} } = useForm();
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

  const onValid = ({boardId}: any) => {
    dispatch(addBoard(boardId));
  }

  return <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <div>
          Board 만들기
          <form onSubmit={handleSubmit(onValid)}>
            <input {...register("boardId")} type="text" />
            <button>만들기</button>
          </form>
        </div>
        <Boards>
          {Object.keys(todos).map(boardId => <Board key={boardId} boardId={boardId} toDos={todos[boardId]} />)}
        </Boards>
        <Droppable droppableId="TrashCan">
          {(magic, info) => (
            <TrashCan ref={magic.innerRef} {...magic.droppableProps}  $isDraggingOver={info.isDraggingOver} $draggingOverWith={Boolean(info.draggingOverWith)} $isDraggingFromThis={Boolean(info.draggingFromThisWith)}>
              {Boolean(info.draggingOverWith) ? <FaTrashRestoreAlt /> : <FaTrash /> }
            
            </TrashCan>
          )}
        </Droppable>
      </Wrapper>
  </DragDropContext>
}

const TrashCan = styled.div<IAreaProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  padding: 10px;
  color: ${(props) =>
    props.$draggingOverWith ? "white" : "black"};
  transition: all 0.5s
`;

export default App;