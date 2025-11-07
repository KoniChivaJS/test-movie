import React from "react";
import { Movie } from "../@types/movie";
import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Eye, Trash } from "lucide-react";

interface Props {
  className?: string;
  movie: Movie;
}

export const MovieListItem: React.FC<Props> = ({ className, movie }) => {
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
      <TableCell>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {movie.actors?.slice(0, 3).map((actor, index) => (
            <Chip key={index} label={actor} size="small" variant="outlined" />
          ))}
          {movie.actors?.length > 3 && (
            <Chip label={`+${movie.actors.length - 3} more`} size="small" />
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <IconButton
          color="info"
          //   onClick={() => onViewMovie(movie)}
          size="small"
        >
          <Eye />
        </IconButton>
        <IconButton
          color="error"
          //   onClick={() => handleDelete(movie.id)}
          //   disabled={deletingId === movie.id}
          size="small"
        >
          <Trash />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
