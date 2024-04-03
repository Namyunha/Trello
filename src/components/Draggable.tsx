import React from "react";
import { Draggable } from "react-beautiful-dnd"
import { Card } from "../styles"

interface IDraggableCard {
    toDo: string;
    index: number;
}

const DraggableCard = ({toDo, index}:IDraggableCard) => {
    console.log(toDo, "has been rendered");
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
        {(magic) => (
            <Card
            ref={magic.innerRef}
              {...magic.dragHandleProps}
              {...magic.draggableProps}
            >
            {toDo}
            </Card>
        )}
    </Draggable>
  )
}

export default React.memo(DraggableCard);