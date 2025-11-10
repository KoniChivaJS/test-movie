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
  const {
    movies,
    total,
    isLoading,
    isError,
    currentPage,
    moviesPerPage,
    handleChangePage,
    handleSearch,
  } = useMovieSearch();

  return (
    <div className={className}>
      <div className="w-full flex gap-5 items-center mb-5">
        <AddMovieModal />
        <ImportMovies />
      </div>
      <MovieSearch handleSearch={handleSearch} />
      <MovieList
        movies={movies ?? []}
        loading={isLoading}
        error={isError}
        currentPage={currentPage}
        total={total ?? 0}
        moviesPerPage={moviesPerPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};
