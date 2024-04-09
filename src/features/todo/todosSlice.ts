import { createSlice, current } from "@reduxjs/toolkit";

interface ITodosSlice {
    [key: number]: { name: string, todos:ITodo[] };
}

export interface ITodo {
    id: string;
    title: string;
    content: string;
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        0 : { name: "Todo", todos: [
            {id: "1", title: "예시제목1", content: "예시내용1"}
        ]},
        1 : { name: "doing", todos: [
            {id: "2", title: "예시제목2", content: "예시내용2"}
        ]},
        2 : { name: "done", todos: [
            {id: "3", title: "예시제목3", content: "예시내용3"}
        ]},
    } as ITodosSlice ,
    reducers: {
        addBoard: (state, action) => {
            console.log(action.payload)
            const {boardId, newId} = action.payload;
            return {
                ...state,
                [newId]: {name: boardId, todos: []} 
            }
        },
        deleteBd: (state, action) => {
            console.log("todoSlice action" ,action.payload)
            let nBoards = {...current(state)};
            delete nBoards[action.payload];
            return nBoards
        },
        addTodo: (state, action) => {
            const {data, toDos, boardId, todosId} = action.payload
            return {
                ...state,
                [todosId]: {name: boardId, todos:[...toDos, data]}
            }
        },
        trashTodo: (state, action) => {
            // const {index, droppableId:boardId} = action.payload;
            // let todos = current(state[boardId]);
            // console.log( todos.filter((item, i) => i !== index) );
            // console.log("index = ", index," /  id = ", boardId);
            // return { 
            //     ...state,
            //     [boardId] : todos.filter((item, i) => i !== index)
            // }
            console.log(action);
            return state
        },
        
        setSameTodos: (state, action)  => {
            const { todos, todos: { name }, 
                    source: {droppableId, index: sourceIndex}, 
                    destination: {index: destinationIndex} } = action.payload;
            let changeTodos = [...todos[droppableId].todos]
            let changeTodo = changeTodos.splice(sourceIndex, 1);
            changeTodos.splice(destinationIndex, 0, changeTodo[0])
            return {
                ...state,
                [droppableId] : { name : todos[droppableId].name,  todos: changeTodos}
            }
        },
        setCrossTodos: (state, action) => {
            const { todos, 
                destination: { droppableId: destinationId, index: destinationIndex },
                source: {droppableId: sourceId, index: sourceIndex}} = action.payload;

            let changeSourceTodos = [...todos[sourceId].todos]
            console.log("changeSourceTodos = ", changeSourceTodos);
            let changeDestinationTodos = [...todos[destinationId].todos]
            console.log("changeDestinationTodos = ", changeDestinationTodos);

            let changeTodo = changeSourceTodos.splice(sourceIndex, 1);
            changeDestinationTodos.splice(destinationIndex, 0, changeTodo[0])
            return {
                ...state,
                [sourceId]: {name: todos[sourceId].name, todos: changeSourceTodos},
                [destinationId]: {name: todos[destinationId].name, todos: changeDestinationTodos}
            }
        }
    }
})

export const 
{ 
setSameTodos,
setCrossTodos,
addTodo,
trashTodo,
addBoard,
deleteBd
} = todosSlice.actions

export default todosSlice.reducer