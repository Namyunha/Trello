import React from "react";
import { Draggable } from "react-beautiful-dnd"
import { Card } from "../styles"
import { useAppDispatch } from "../app/hook";
import { deleteTodo } from "../features/todo/todosSlice";


interface IDraggableCard {
    toDoId: number;
    toDoTitle: string;
    toDoContent: string;
    boardId: string
    index: number;
}

const DraggableCard = ({toDoId, toDoTitle, toDoContent, index, boardId}:IDraggableCard) => {
    const dispatch = useAppDispatch();

    console.log(toDoId, "has been rendered");

    const onDeleteHandler = () => {
      dispatch(deleteTodo({boardId, toDoId}))
    }

  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
        {(magic, info) => (
            <Card $isDraggingOver={info.isDragging}
              ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}
              >
            title:&nbsp;{toDoTitle} <br />
            content:&nbsp;{toDoContent} <br />
            <button>update</button>
            <button onClick={onDeleteHandler}>delete</button>
            </Card>
        )}
    </Draggable>
  )
}

export default React.memo(DraggableCard);