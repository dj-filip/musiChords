import { baseApi } from "@features/api/baseApi";

export const artistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query({query: () => "artists"}) 
  })
})

export const { useGetArtistsQuery } = artistsApi;