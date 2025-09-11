import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentArtist: null,
}

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setCurrentArtist: (state, action) => {
      state.currentArtist = action.payload
    }
  }

})

export const { setCurrentArtist } = artistSlice.actions;
export default artistSlice.reducer;