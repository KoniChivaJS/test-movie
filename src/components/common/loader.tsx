import { CircularProgress, Stack } from "@mui/material";
import React from "react";

interface Props {}

export const Loader: React.FC<Props> = () => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <CircularProgress />
    </Stack>
  );
};
