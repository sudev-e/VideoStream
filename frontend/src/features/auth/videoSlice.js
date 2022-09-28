import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:false,
}

export const videoSlice = createSlice({
    name:"video",
    initialState,
    reducers:{
        setVideo: (state, action) => {
            state.selectedPlayer = action.payload
    }
},

}
)
export const { setVideo } = videoSlice.actions;
export default videoSlice.reducer;