import { createSlice, current } from "@reduxjs/toolkit";

interface ITodosSlice {
    [key: string]: ITodo[];
}
export interface ITodo {
    id: number;
    title: string;
    content: string;
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        Todo: [],
        doing: [],
        done: []
    } as ITodosSlice ,
    reducers: {
        addTodo: (state, action) => {
            const {data, toDos, boardId} = action.payload
            console.log("data = ", data);
            console.log("toDos = ", ...toDos);
            console.log("boardId = ", boardId)
            return {
                ...state,
                [boardId]: [...toDos, data]
            }
        },
        deleteTodo: (state, action) => {
            console.log("delete action = ", action.payload);
            const { boardId, toDoId } = action.payload;
            let todos = current(state[boardId])
            return {
                ...state,
                [boardId] : todos.filter(todo => todo.id !== toDoId)
            }
        },
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

export const { setSameTodos, setCrossTodos, addTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer