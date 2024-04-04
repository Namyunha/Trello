import { createSlice } from "@reduxjs/toolkit";

interface ITodosSlice {
    [key: string]: string[];
}

type ITodosProps  = {
    destination: locationInfo;
    draggableId: string;
    source: locationInfo;
}

type locationInfo = {
    droppable: string;
    index: number;
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        Todo: [ "a",  "d", "e" ],
        doing: [ "b", "c" ],
        done: [ "f" ]
    } as ITodosSlice ,
    reducers: {
        setSameTodos: (state, action)  => {
            let {payload : {destination : {droppableId}, changeTodos}} = action;
            return {
                ...state,
                [droppableId]: changeTodos
            }
        },
        setCrossTodos: (state, action) => {
            const {payload, payload : {destination, source, draggableId} } = action
            let sourceBoard = [...payload[source.droppableId]];
            sourceBoard.splice(source.index, 1);
            let destinationBoard = [...payload[destination.droppableId]];
            destinationBoard.splice(destination.index, 0, draggableId)
            return {
                ...state,
                [source.droppableId]: sourceBoard,
                [destination.droppableId]: destinationBoard
            }
        }
    }
})

export const { setSameTodos, setCrossTodos } = todosSlice.actions
export default todosSlice.reducer