import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useDebounce } from "react-use";

interface Props {
  handleSearch: (query: string, type: "title" | "actor") => void;
}

export const MovieSearch: React.FC<Props> = ({ handleSearch }) => {
  const [query, setQuery] = React.useState("");
  const [searchBy, setSearchBy] = React.useState<"title" | "actor">("title");

  const toggleSearchBy = () => {
    setSearchBy((prev) => (prev === "title" ? "actor" : "title"));
    setQuery("");
  };

  useDebounce(
    async () => {
      handleSearch(query, searchBy);
    },
    250,
    [query, searchBy]
  );

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Stack direction="row" gap={2}>
        <TextField
          label={searchBy === "title" ? "Search by title" : "Search by actor"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          fullWidth
        />

        <Button
          variant="outlined"
          onClick={() => toggleSearchBy()}
          sx={{
            width: "100px",
            ":hover": { scale: 1.1 },
            transition: "all 0.4s",
          }}
        >
          {searchBy === "title" ? "Actor" : "Title"}
        </Button>
      </Stack>
    </Stack>
  );
};
