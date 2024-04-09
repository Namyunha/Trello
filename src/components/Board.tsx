import { Droppable } from "react-beautiful-dnd"
import { useForm } from 'react-hook-form'
import styled from "styled-components"
import DraggableCard from '../components/Draggable'
import { BoardWrapper } from "../styles"
import { ITodo } from "../features/todo/todosSlice";
import { useAppDispatch } from "../app/hook"
import { v4 as uuidv4 } from "uuid"; // ES Modules
import { addTodo } from "../features/todo/todosSlice"
import { deleteBd } from "../features/todo/todosSlice"

interface IBoard {
    toDos: ITodo[]
    boardId: string
}

const Board = ({toDos, boardId}:IBoard) => {
  const { register, setValue, handleSubmit, formState : { errors } } = useForm();
  const dispatch = useAppDispatch();
  const id = uuidv4();
  setValue("id", id.substr(0, 4));

  console.log(errors?.title?.message);

  const onSaveHandler = (data:any) => {
    console.log(data);
    dispatch(addTodo({data, boardId, toDos}))
  }

  const deleteBoard = () => {
    dispatch(deleteBd(boardId))
  }

  return (
    <Wrapper>
        <div>
          <button onClick={deleteBoard}>X</button>
        </div>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onSaveHandler)}>
          <Input {...register("title", 
            {
              required: "제목을 입력 해주세요",
              minLength: {
                value: 5,
                message: "5글자 이상 입력해주세요"
              }
            })}  placeholder="제목" />
          {errors?.title && typeof errors.title.message === 'string' && <ErrorMessage>{errors.title.message}</ErrorMessage>}

          <Input {...register("content")} placeholder="내용" />
          <button>add {boardId}</button>
        </Form>
        <Droppable droppableId={boardId}>
            {(magic, info) => (
                <BoardWrapper
                  $isDraggingOver={info.isDraggingOver}
                  $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                  ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index)=> (
                      <DraggableCard key={toDo.id} boardId={boardId} toDoId={toDo.id} toDoTitle={toDo.title} toDoContent={toDo.content} index={index}/>
                    ))}
                    {magic.placeholder}
                </BoardWrapper>
            )}
        </Droppable>
    </Wrapper>
  )
}
const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Input = styled.input`
  width: 100%;
  padding: 5px;
`



const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 10% 5%;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 30%;
`;
export default Board