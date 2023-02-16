import { createSlice } from "@reduxjs/toolkit";

const initialTestsState = {
testId:null,
questions:null,
province:null,

}

const testSlice = createSlice({
    name:'tests',
    initialState:initialTestsState,
    reducers:{
        testIdHandler(state, action){
            state.testId = action.payload
        },
        questionsHandler(state, action){
            state.questions = action.payload
        }
    }
})

export const testActions = testSlice.actions;
export default testSlice.reducer;