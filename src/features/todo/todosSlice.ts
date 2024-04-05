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
            const { todos, 
                    source: {droppableId, index: sourceIndex}, 
                    destination: {index: destinationIndex} } = action.payload;
            let changeTodos = [...todos[droppableId]]
            let changeTodo = changeTodos.splice(sourceIndex, 1);
            changeTodos.splice(destinationIndex, 0, changeTodo[0])
            return {
                ...state,
                [droppableId] : changeTodos
            }
        },
        setCrossTodos: (state, action) => {
            const { todos, 
                destination: { droppableId: destinationId, index: destinationIndex },
                source: {droppableId: sourceId, index: sourceIndex}} = action.payload;
            let changeSourceTodos = [...todos[sourceId]]
            let changeDestinationTodos = [...todos[destinationId]]
            let changeTodo = changeSourceTodos.splice(sourceIndex, 1);
            changeDestinationTodos.splice(destinationIndex, 0, changeTodo[0])
            return {
                ...state,
                [sourceId]: changeSourceTodos,
                [destinationId]: changeDestinationTodos
            }
        }
    }
})

export const { setSameTodos, setCrossTodos } = todosSlice.actions
export default todosSlice.reducer