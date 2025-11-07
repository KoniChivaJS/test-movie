export interface MovieResponse {
  data: Movie[];
  meta: {
    total: number;
  };
  status: number;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string[];
}

export interface CreateMovieReq {
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string[];
}
