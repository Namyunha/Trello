import { createSlice, current } from "@reduxjs/toolkit"



const boardsReducer = createSlice({
    name: "boards",
    initialState: [] as number[],
    reducers: {
        addBoards: (state, action) => {
            console.log("boardSLice action = ", action)
            let boards = current(state);
            let newBoards = [...boards, action.payload]
            return newBoards
        },
        setBoards: (state, action) => {
            console.log("boardSLice action = ", action);
            return state
        },
        deleteBoards: (state, action) => {
            console.log("board slice = ",action.payload);
            let boards = [...current(state)]
            return boards.filter(id => id !== action.payload)
        }
    }
})


export const { setBoards,  addBoards, deleteBoards} = boardsReducer.actions

export default boardsReducer.reducer