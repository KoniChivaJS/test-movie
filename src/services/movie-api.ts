import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateMovieReq,
  MovieResponse,
  SearchMovieResponse,
} from "../@types/movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers: Headers) => {
      const token = process.env.REACT_APP_API_TOKEN;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Movie"],
  endpoints: (builder) => ({
    getMovies: builder.query<
      MovieResponse,
      { sort?: string; order?: "ASC" | "DESC" } | void
    >({
      query: (params) => ({
        url: "/movies",
        params: {
          sort: params?.sort || "title",
          order: params?.order || "ASC",
        },
      }),
      providesTags: ["Movie"],
    }),

    getMovie: builder.query<SearchMovieResponse, string>({
      query: (id) => `/movies/${id}`,
    }),

    createMovie: builder.mutation<MovieResponse, CreateMovieReq>({
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

    searchMovies: builder.query<
      MovieResponse,
      { title?: string; actor?: string }
    >({
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
