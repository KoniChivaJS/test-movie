import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  className?: string;
  onSubmit: (data: IMovieForm) => void;
}

export interface IMovieForm {
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string;
}

export const CreateMovie: React.FC<Props> = ({ className, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IMovieForm>({
    defaultValues: {
      title: "",
      year: 2020,
      format: "VHS",
      actors: "",
    },
  });
  const onSubmitHandler = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Paper
      className={className}
      sx={{ p: 3, maxWidth: 500, mx: "auto" }}
      elevation={0}
    >
      <Typography variant="h6" gutterBottom>
        Add New Movie
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            {...register("title", {
              required: "Title is required",
              validate: (value) =>
                value.trim() !== "" || "Title cannot be empty or spaces only",
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />

          <TextField
            label="Year"
            type="number"
            {...register("year", {
              required: "Year is required",
              min: { value: 1900, message: "Year must be >= 1900" },
              max: {
                value: 2020,
                message: "Year must be <= 2020",
              },
            })}
            error={!!errors.year}
            helperText={errors.year?.message}
            fullWidth
          />

          <Controller
            name="format"
            control={control}
            rules={{ required: "Format is required" }}
            render={({ field }) => (
              <TextField
                select
                label="Format"
                {...field}
                fullWidth
                error={!!errors.format}
                helperText={errors.format?.message}
              >
                <MenuItem value="VHS">VHS</MenuItem>
                <MenuItem value="DVD">DVD</MenuItem>
                <MenuItem value="Blu-ray">Blu-ray</MenuItem>
              </TextField>
            )}
          />

          <TextField
            label="Actors (comma separated)"
            {...register("actors", {
              required: "Actors are required",
              validate: (value) => {
                const actors = value.split(",").map((a) => a.trim());
                if (actors.some((a) => a === "")) {
                  return "Actor names cannot be empty or only spaces";
                }
                const pattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-.]+$/;
                if (!actors.every((a) => pattern.test(a))) {
                  return "Actors can only contain letters, spaces, '-' and '.'";
                }
                return true;
              },
            })}
            placeholder="Actor 1, Actor 2"
            fullWidth
            error={!!errors.actors}
            helperText={errors.actors?.message}
          />

          <Button type="submit" variant="contained" color="primary">
            Add Movie
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
