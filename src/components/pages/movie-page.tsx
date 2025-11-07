import React from "react";
import { useParams } from "react-router";
import { useGetMovieQuery } from "../../services/movie-api";
import { Loader } from "../common/loader";
import { Paper, Stack, Typography } from "@mui/material";

interface Props {
  className?: string;
}

export const MoviePage: React.FC<Props> = ({ className }) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetMovieQuery(id || "");

  const movie = data?.data;

  if (isLoading) return <Loader />;
  if (isError || !movie)
    return <Typography sx={{ mt: 4 }}>Movie not found</Typography>;

  return (
    <Paper
      className={className}
      sx={{ p: 4, maxWidth: 1000, mt: 4, borderRadius: 2 }}
      elevation={0}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {movie.title}
      </Typography>
      <Stack spacing={2}>
        <Typography>
          <strong>Year:</strong> {movie.year}
        </Typography>
        <Typography>
          <strong>Format:</strong> {movie.format}
        </Typography>
        <Typography>
          <strong>Actors:</strong>{" "}
          {movie.actors.map((actor) => actor.name).join(", ") || "-"}
        </Typography>
        <Typography>
          <strong>Created At:</strong>{" "}
          {new Date(movie.createdAt).toLocaleDateString()}
        </Typography>
        <Typography>
          <strong>Updated At:</strong>{" "}
          {new Date(movie.updatedAt).toLocaleDateString()}
        </Typography>
      </Stack>
    </Paper>
  );
};
