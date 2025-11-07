import React from "react";
import { Movie } from "../@types/movie";
import {
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Eye, Trash } from "lucide-react";
import { NavLink } from "react-router";

interface Props {
  className?: string;
  movie: Movie;
  onDelete: (id: string) => void;
}

export const MovieListItem: React.FC<Props> = ({
  className,
  movie,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle1" fontWeight="bold">
          {movie.title}
        </Typography>
      </TableCell>
      <TableCell>{movie.year}</TableCell>
      <TableCell>
        <Chip
          label={movie.format}
          color="primary"
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <NavLink to={`/movies/${movie.id}`}>
          <IconButton color="info" size="small">
            <Eye />
          </IconButton>
        </NavLink>
        <IconButton
          color="error"
          onClick={() => onDelete(movie.id)}
          size="small"
        >
          <Trash />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
