import React from "react";
import { Button } from "@mui/material";
import { useCreateMovieMutation } from "../services/movie-api";
import { CreateMovieReq } from "../@types/movie";
import toast from "react-hot-toast";
import { CloudUploadIcon } from "lucide-react";

export const ImportMovies: React.FC = () => {
  const [createMovie] = useCreateMovieMutation();

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) =>
        resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const parseMoviesFromText = (text: string): CreateMovieReq[] => {
    const movies: CreateMovieReq[] = [];
    const blocks = text.split(/\n\s*\n/);

    for (const block of blocks) {
      const titleMatch = block.match(/Title:\s*(.+)/);
      const yearMatch = block.match(/Release Year:\s*(\d{4})/);
      const formatMatch = block.match(/Format:\s*(.+)/);
      const starsMatch = block.match(/Stars:\s*(.+)/);

      if (titleMatch && yearMatch && formatMatch && starsMatch) {
        movies.push({
          title: titleMatch[1].trim(),
          year: Number(yearMatch[1]),
          format: formatMatch[1].trim() as "VHS" | "DVD" | "Blu-ray",
          actors: starsMatch[1].split(",").map((a) => a.trim()),
        });
      }
    }

    return movies;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (file.size === 0) {
      toast.error("The file is empty");
      return;
    }

    if (!file.name.endsWith(".txt")) {
      toast.error("Invalid file format. Please upload a .txt file");
      return;
    }

    try {
      toast.loading("Importing movies...");
      const text = await readFileAsText(file);
      const movies = parseMoviesFromText(text);

      if (movies.length === 0) {
        toast.error("Invalid data. No movies found in the file");
        return;
      }

      for (const movie of movies) {
        try {
          await createMovie(movie).unwrap();
        } catch (err: unknown) {
          toast.error("Failed to add movie");
        }
      }

      toast.success("Movies imported successfully");
    } catch (err: unknown) {
      toast.error("Failed to import movies");
    } finally {
      setTimeout(() => toast.dismiss(), 1000);
    }
  };

  return (
    <Button
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon />}
    >
      Import Movies
      <input type="file" hidden accept=".txt" onChange={handleFileChange} />
    </Button>
  );
};
