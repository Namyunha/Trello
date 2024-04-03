import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

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
            console.log("droppableId = ", droppableId);
            console.log("changeTodos = ", changeTodos);
            
            return {
                ...state,
                [droppableId]: changeTodos
            }
        },
    }
})

export const { setSameTodos } = todosSlice.actions
export default todosSlice.reducer