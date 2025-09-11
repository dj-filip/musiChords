import { baseApi } from "@features/api/baseApi";


export const songsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSongs: builder.query({
      query: ({ repertoireId, artistId } = {}) => {
        if (artistId) {
          return `artists/${artistId}/songs`;
        } else if (repertoireId) {
          return `repertoires/${repertoireId}/songs`;
        } else {
          return 'songs';
        }
      }
    }),
  })
})

export const { useGetSongsQuery } = songsApi;