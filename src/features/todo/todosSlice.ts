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
        addBoard: (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                [action.payload]: []
            }
        },
        deleteBd: (state, action) => {
            let nBoards = {...current(state)};
            delete nBoards[action.payload];
            return nBoards
        },
        addTodo: (state, action) => {
            const {data, toDos, boardId} = action.payload
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
        trashTodo: (state, action) => {
            const {index, droppableId:boardId} = action.payload;
            let todos = current(state[boardId]);
            console.log( todos.filter((item, i) => i !== index) );
            console.log("index = ", index," /  id = ", boardId);
            return { 
                ...state,
                [boardId] : todos.filter((item, i) => i !== index)
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

export const 
{ 
setSameTodos,
setCrossTodos,
addTodo,
deleteTodo,
trashTodo,
addBoard,
deleteBd
} = todosSlice.actions
export default todosSlice.reducer