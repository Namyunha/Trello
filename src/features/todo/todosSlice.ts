import { createSlice } from "@reduxjs/toolkit";

interface ITodosSlice {
    [key: string]: string[];
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todo: [ "a",  "d", "e" ],
        doing: [ "b", "c" ],
        done: [ "f" ]
    } as ITodosSlice ,
    reducers: {}
})

export const {} = todosSlice.actions
export default todosSlice.reducer