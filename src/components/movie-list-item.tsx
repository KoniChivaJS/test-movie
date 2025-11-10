import React from "react";
import { Movie } from "../@types/movie";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    onDelete(movie.id);
    setOpen(false);
  };
  return (
    <>
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
          <IconButton color="error" size="small" onClick={() => setOpen(true)}>
            <Trash />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent
          sx={{
            minWidth: 300,
            minHeight: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <DialogTitle sx={{ mb: 2 }}>
            Do you want to delete
            <br />
            <strong>{movie.title}</strong>?
          </DialogTitle>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
