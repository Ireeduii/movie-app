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

export type CrewMember = {
  department: string;
  id: number;
  name: string;
  job: string;
};

export type CastMember = {
  id: number;
  name: string;
};

export type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  credits?: {
    crew?: CrewMember[];
    cast?: CastMember[];
  };
};
