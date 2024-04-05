import { createSlice } from "@reduxjs/toolkit";

interface ITodosSlice {
    [key: string]: ITodo[];
}

export interface ITodo {
    id: number;
    text: string;
}


const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        Todo: [{ id:1, text: "hello"}, {id:4, text: "hello4"}],
        doing: [{id:2, text: "hello2"}],
        done: [{id:3, text: "hello3"}]
    } as ITodosSlice ,
    reducers: {
        setSameTodos: (state, action)  => {
            const { todos, source: {droppableId, index: sourceIndex}, destination: {index: destinationIndex} } = action.payload
            let changeTodos = [...todos[droppableId]]
            let changeTodo = changeTodos.splice(sourceIndex, 1);
            changeTodos.splice(destinationIndex, 0, changeTodo[0])
            return {
                ...state,
                [droppableId] : changeTodos
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