import React from "react";
import { Movie } from "../@types/movie";
import { useGetMoviesQuery, useSearchMoviesQuery } from "../services/movie-api";

interface UseMoviesSearchResult {
  movies: Movie[] | undefined;
  isLoading: boolean;
  isError: boolean;
  searchTerm: string;
  searchBy: "title" | "actor";
  currentPage: number;
  total: number | undefined;
  handleSearch: (query: string, type: "title" | "actor") => void;
  handleChangePage: (page: number) => void;
  moviesPerPage: number;
}

export const useMovieSearch = (): UseMoviesSearchResult => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchBy, setSearchBy] = React.useState<"title" | "actor">("title");
  const [currentPage, setCurrentPage] = React.useState(1);

  const moviesPerPage = 12;
  const offset = (currentPage - 1) * moviesPerPage;

  const {
    data: allMovies,
    isLoading: loadingAll,
    isError: errorAll,
  } = useGetMoviesQuery({ limit: moviesPerPage, offset });

  const {
    data: searchMovies,
    isLoading: loadingSearch,
    isError: errorSearch,
  } = useSearchMoviesQuery(
    searchBy === "title"
      ? { title: searchTerm, limit: moviesPerPage, offset }
      : { actor: searchTerm, limit: moviesPerPage, offset },
    { skip: !searchTerm }
  );

  const moviesToShow = searchTerm ? searchMovies?.data : allMovies?.data;
  const isLoading = searchTerm ? loadingSearch : loadingAll;
  const isError = searchTerm ? errorSearch : errorAll;

  const total = isLoading
    ? 0
    : searchTerm
    ? searchMovies?.meta?.total ?? 0
    : allMovies?.meta?.total ?? 0;

  const handleSearch = (query: string, type: "title" | "actor") => {
    setSearchTerm(query);
    setSearchBy(type);
    setCurrentPage(1);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    movies: moviesToShow,
    total,
    isLoading,
    isError,
    searchTerm,
    searchBy,
    currentPage,
    moviesPerPage,
    handleChangePage,
    handleSearch,
  };
};
