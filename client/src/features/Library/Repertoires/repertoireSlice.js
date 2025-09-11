import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentRepertoire: null,
}

const repertoireSlice = createSlice({
  name: "repertoire",
  initialState,
  reducers: {
    setCurrentRepertoire: (state, action) => {
      state.currentRepertoire = action.payload
    }
  }

})

export const { setCurrentRepertoire } = repertoireSlice.actions;
export default repertoireSlice.reducer;