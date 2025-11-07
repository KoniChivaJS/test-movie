import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateMovieReq, Movie } from "../@types/movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["Movie"],
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => "/movies",
      providesTags: ["Movie"],
    }),

    getMovie: builder.query<Movie, string>({
      query: (id) => `/movies/${id}`,
    }),

    createMovie: builder.mutation<Movie, CreateMovieReq>({
      query: (movie) => ({
        url: "/movies",
        method: "POST",
        body: movie,
      }),
      invalidatesTags: ["Movie"],
    }),

    deleteMovie: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),

    searchMovies: builder.query<Movie[], { title?: string; actor?: string }>({
      query: (params) => ({
        url: "/movies",
        params,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useCreateMovieMutation,
  useDeleteMovieMutation,
  useSearchMoviesQuery,
} = movieApi;
