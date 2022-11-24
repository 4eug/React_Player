import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { genres } from '../../assets/constants';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '47977a8876mshee1bdfc73acbeb4p114995jsnfdc9e143d406');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongsByGenre: builder.query({ query: () => `/charts/genre-world?genre_code=${genres}` }),
    getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
    getSongRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
    getArtistDetails: builder.query({ query: ({ artistid }) => `/artists/details?artist_id=${artistid}` }),
    getSongsByCounrty: builder.query({ query: (countryCode) => `/charts/country?countryCode=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCounrtyQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
