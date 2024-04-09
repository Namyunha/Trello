import 
{ 
  DragDropContext, 
} from 'react-beautiful-dnd';
import {
  AppWrapper,
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
  trashTodo,
  addBoard
} from './features/todo/todosSlice';
import { addBoards } from './features/board/boardSlice';

import { FaTrash } from "react-icons/fa6";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form'
import { TrashCan, BoardAddFormArea } from './styles';

function App() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const todos = useAppSelector((state) => state.todosReducer);
  const boards = useAppSelector((state) => state.boardsReducer);
  const boardList = boards.map(id => todos[id])
  const dispatch = useAppDispatch();
  console.log("boards = ", boards);
  const onDragEnd = ( info: DropResult) => {
    let {destination, source, type} = info;
    if(!destination) return;

    if(destination?.droppableId === "boards") {
      // dispatch(setBoards(info))
      console.log(info)
      return;
    }

    if(destination?.droppableId === "TrashCan"){
      // dispatch(trashTodo(source));
      return ;
    }
    
    if(destination?.droppableId === source.droppableId) {
      console.log(info);
      dispatch(setSameTodos({ todos, source, destination }))
      return;
    }

    if(destination?.droppableId !== source.droppableId) {
      dispatch(setCrossTodos({todos, destination, source}));
      return
    }
  }
  const onValid = ({boardId}: any) => {
    let newId = boards.length === 0 ? 0 : Math.max(...boards.map(id => id)) + 1;
    dispatch(addBoard({boardId, newId}));
    dispatch(addBoards(newId));
  }

  return <DragDropContext onDragEnd={onDragEnd}>
      <AppWrapper>
        <BoardAddFormArea>
          Board 만들기
          <form onSubmit={handleSubmit(onValid)}>
            <input {...register("boardId")} type="text" />
            <button>만들기</button>
          </form>
        </BoardAddFormArea>

        <Droppable droppableId='boards' type='boards'>
          {(magic, info) => (
            <Boards ref={magic.innerRef}>
              {boardList.map((board, idx) => (
                <div key={idx}>
                  <Board key={board.name} boardId={board.name} todosId={boards[idx]} toDos={board.todos} idx={idx}/>
                </div>
              ))}
            </Boards>
          )}
        </Droppable>

        <Droppable droppableId="TrashCan">

          {(magic, info) => (
            
            <TrashCan ref={magic.innerRef} 
            
            {...magic.droppableProps}  
            $isDraggingOver={info.isDraggingOver} 
            $draggingOverWith={Boolean(info.draggingOverWith)} 
            $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            >
              {Boolean(info.draggingOverWith) ? <FaTrashRestoreAlt /> : <FaTrash /> }
            </TrashCan>
          )}
        </Droppable>

      </AppWrapper>
  </DragDropContext>
}

export default App;