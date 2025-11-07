import React from "react";
import { MovieList } from "../movie-list";
import { AddMovieModal } from "../modals/add-movie-modal";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import { MovieSearch } from "../movie-search";
import { ImportMovies } from "../import-movies";

interface Props {
  className?: string;
}

export const Home: React.FC<Props> = ({ className }) => {
  const { movies, isLoading, isError, handleSearch } = useMovieSearch();

  return (
    <div className={className}>
      <MovieSearch handleSearch={handleSearch} />
      <MovieList movies={movies ?? []} loading={isLoading} error={isError} />
      <div className="w-full flex gap-5 items-center mt-5">
        <AddMovieModal />
        <ImportMovies />
      </div>
    </div>
  );
};
