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

interface Props {
  className?: string;
  movies: Movie[];
  loading?: boolean;
  error?: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const MovieList: React.FC<Props> = ({
  className,
  movies,
  loading,
  error,
  onDelete,
  onView,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong while fetching movies</div>;
  if (!movies || movies.length === 0) return <div>No movies found</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Format</TableCell>
            <TableCell>Actors</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <MovieListItem movie={movie} key={movie.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
