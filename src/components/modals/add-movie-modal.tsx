import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { CreateMovie, IMovieForm } from "../forms/create-movie";
import { useCreateMovieMutation } from "../../services/movie-api";
import toast from "react-hot-toast";
interface Props {
  className?: string;
}

export const AddMovieModal: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = React.useState(false);
  const [createMovie] = useCreateMovieMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: IMovieForm) => {
    try {
      await createMovie({
        ...data,
        actors:
          typeof data.actors === "string"
            ? data.actors.split(",").map((actor: string) => actor.trim())
            : data.actors,
      }).unwrap();

      handleClose();
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to add movie");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mt: 5 }}
      >
        Add Movie
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <CreateMovie onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
