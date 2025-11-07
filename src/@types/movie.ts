export interface MovieResponse {
  data: Movie[];
  meta: {
    total: number;
  };
  status: number;
}

export interface SearchMovieResponse {
  data: Movie;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: IActor[];
  createdAt: string;
  updatedAt: string;
}

export interface IActor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieReq {
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string[];
}
