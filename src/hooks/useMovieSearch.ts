import React from "react";
import { Movie } from "../@types/movie";
import { useGetMoviesQuery, useSearchMoviesQuery } from "../services/movie-api";

interface UseMoviesSearchResult {
  movies: Movie[] | undefined;
  isLoading: boolean;
  isError: boolean;
  searchTerm: string;
  searchBy: "title" | "actor";
  handleSearch: (query: string, type: "title" | "actor") => void;
}

export const useMovieSearch = (): UseMoviesSearchResult => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchBy, setSearchBy] = React.useState<"title" | "actor">("title");

  const {
    data: allMovies,
    isLoading: loadingAll,
    isError: errorAll,
  } = useGetMoviesQuery();

  const {
    data: searchMovies,
    isLoading: loadingSearch,
    isError: errorSearch,
  } = useSearchMoviesQuery(
    searchBy === "title" ? { title: searchTerm } : { actor: searchTerm },
    { skip: !searchTerm }
  );

  const moviesToShow = searchTerm ? searchMovies?.data : allMovies?.data;
  const isLoading = searchTerm ? loadingSearch : loadingAll;
  const isError = searchTerm ? errorSearch : errorAll;

  const handleSearch = (query: string, type: "title" | "actor") => {
    setSearchTerm(query);
    setSearchBy(type);
  };

  return {
    movies: moviesToShow,
    isLoading,
    isError,
    searchTerm,
    searchBy,
    handleSearch,
  };
};
