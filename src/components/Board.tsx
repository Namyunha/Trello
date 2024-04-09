import { Draggable, Droppable } from "react-beautiful-dnd"
import { useForm } from 'react-hook-form'
import styled from "styled-components"
import DraggableCard from '../components/Draggable'
import { BoardWrapper } from "../styles"
import { ITodo } from "../features/todo/todosSlice";
import { useAppDispatch } from "../app/hook"
import { v4 as uuidv4 } from "uuid";
import { BoardFormWrapper } from "../styles"
import 
{ BoardTitle,
  BoardForm,
  BoardFormInput
} from "../styles"

import 
{ addTodo,
  deleteBd 
} from "../features/todo/todosSlice"

import { deleteBoards } from "../features/board/boardSlice"

import { ErrorMessage } from "../styles"

interface IBoard {
    toDos: ITodo[]
    boardId: string;
    idx: number;
    todosId: number;
}

const Board = ({toDos, boardId, idx, todosId}:IBoard) => {
  console.log("toDos = ", toDos)
  const { register, setValue, handleSubmit, formState : { errors } } = useForm();
  const dispatch = useAppDispatch();
  const id = uuidv4();
  setValue("id", id.substr(0, 4));
  
  const onSaveHandler = (data:any) => {
    dispatch(addTodo({data, boardId, toDos, todosId}))
  }

  const deleteBoard = () => {
    dispatch(deleteBd(todosId));
    dispatch(deleteBoards(todosId));
  }

  return (
    <Draggable draggableId={boardId} index={idx}>
    {magic => (
        <BoardFormWrapper
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <div>
            <button onClick={deleteBoard}>X</button>
          </div>
          <BoardTitle>{boardId}</BoardTitle>
          <BoardForm onSubmit={handleSubmit(onSaveHandler)}>
            <BoardFormInput {...register("title", 
              {
                required: "제목을 입력 해주세요",
                minLength: {
                  value: 5,
                  message: "5글자 이상 입력해주세요"
                }
              })}  placeholder="제목" />
            {errors?.title && typeof errors.title.message === 'string' && <ErrorMessage>{errors.title.message}</ErrorMessage>}

            <BoardFormInput {...register("content")} placeholder="내용" />
            <button>저장하기</button>
          </BoardForm>
        <Droppable droppableId={boardId} type="todos">
          {(magic, info) => (
            <div>
              <BoardWrapper
                $isDraggingOver={info.isDraggingOver}
                $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef} {...magic.droppableProps}
              >
                {toDos.map((toDo, index)=> (
                  <DraggableCard key={toDo.id} boardId={boardId} toDoId={toDo.id} toDoTitle={toDo.title} toDoContent={toDo.content} index={index}/>
                ))}

                {magic.placeholder}
              </BoardWrapper>
            </div>
          )}
        </Droppable>
        </BoardFormWrapper>
    )}
    </Draggable>
  )
}

export default Board
