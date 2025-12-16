export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export type movieResponseType = {
  page: number;
  totalPages: number;
  results: MovieType[];
};

export type GenreType = {
  id: number;
  name: string;
};

export type GenreResponseType = {
  genres: GenreType[];
};

export type TrailerType = {
  id: string;
  key: string;
  type: string;
};

export type TrailerResponseType = {
  id: number;
  results: TrailerType[];
};
