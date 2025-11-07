import React from "react";
import { Movie } from "../@types/movie";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MovieListItem } from "./movie-list-item";
import { useDeleteMovieMutation } from "../services/movie-api";
import toast from "react-hot-toast";
import { Loader } from "./common/loader";

interface Props {
  className?: string;
  movies: Movie[];
  loading?: boolean;
  error?: boolean;
}

export const MovieList: React.FC<Props> = ({
  className,
  movies,
  loading,
  error,
}) => {
  const [deleteMovie] = useDeleteMovieMutation();

  const handleDeleteMovie = async (id: string) => {
    try {
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted successfully");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to delete movie");
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Something went wrong while fetching movies</div>;
  if (!movies || movies.length === 0) return <div>No movies found</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "720px" }}>Title</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Format</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <MovieListItem
              movie={movie}
              key={movie.id}
              onDelete={handleDeleteMovie}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
