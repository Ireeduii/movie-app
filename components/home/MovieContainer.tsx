import { MovieCard } from "./MovieCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MovieType } from "@/app/types";

type MoviesContainerProps = {
  movies: MovieType[];
  title: string;
  link: string;
};

export const MoviesContainer = ({
  movies,
  title,
  link,
}: MoviesContainerProps) => {
  return (
    <div>
      <div className="flex w-full justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        {/* <Link className="flex items-center gap-2" href={`/more?title=${link}`}>
          <span>See more</span> <ChevronRight />
        </Link> */}
        <Link
          href={`/more?title=${link}&page=1`}
          className="flex items-center gap-2"
        >
          <span>See more</span> <ChevronRight />
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap">
        {movies?.slice(0, 10)?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            score={movie.vote_average}
            image={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
