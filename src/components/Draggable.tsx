import React from "react";
import { Draggable } from "react-beautiful-dnd"
import { Card } from "../styles"

interface IDraggableCard {
    toDoId: number;
    toDoText: string;
    index: number;
}

const DraggableCard = ({toDoId, toDoText, index}:IDraggableCard) => {
    console.log(toDoText, "has been rendered");
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
        {(magic, info) => (
            <Card $isDraggingOver={info.isDragging}
              ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}
              >
            {toDoText}
            </Card>
        )}
    </Draggable>
  )
}

export default React.memo(DraggableCard);