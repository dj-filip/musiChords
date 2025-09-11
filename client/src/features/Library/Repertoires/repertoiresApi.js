import { baseApi } from "@features/api/baseApi";


export const repertoiresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRepertoires: builder.query({query: () => "repertoires"}),
    getRepertoireSongs: builder.query({query: (repertoireId) => `repertoires/${repertoireId}/songs`})

  })
})

export const { useGetRepertoiresQuery, useGetRepertoireSongsQuery } = repertoiresApi;