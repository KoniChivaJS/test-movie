import React from "react";
import { useGetMoviesQuery } from "../services/movie-api";
import { MovieList } from "./movie-list";
import { AddMovieModal } from "./modals/add-movie-modal";

function App() {
  const { data: MovieResponse, isLoading, isError } = useGetMoviesQuery();

  return (
    <div className="mx-auto max-w-[1280px] p-4 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4">Super Movie App</h1>
      <MovieList
        movies={MovieResponse?.data ?? []}
        loading={isLoading}
        error={isError}
        onDelete={() => console.log("")}
        onView={() => console.log("")}
      />
      <AddMovieModal />
    </div>
  );
}

export default App;
