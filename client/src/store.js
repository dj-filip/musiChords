import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@features/api/baseApi";
import repertoireReducer from "@features/Library/Repertoires/repertoireSlice";
import artistReducer from "@features/Artists/artistSlice";


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    repertoire: repertoireReducer,
    artist: artistReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})