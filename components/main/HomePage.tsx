import { movieResponseType } from "@/app/types";
import { getMoviesList } from "@/app/utils/get-data";
import { MovieCarousel } from "./MovieCarousel";
import { MoviesContainer } from "../home/MovieContainer";

export async function HomePage() {
  const upcomingMovies: movieResponseType = await getMoviesList("upcoming");
  const popularMovies: movieResponseType = await getMoviesList("popular");
  const topRatedMovies: movieResponseType = await getMoviesList("top_rated");
  const nowPlayingMovies: movieResponseType = await getMoviesList(
    "now_playing"
  );

  return (
    <div>
      <MovieCarousel movies={nowPlayingMovies.results} />
      <MoviesContainer
        movies={upcomingMovies.results}
        title="Upcoming"
        link="upcoming"
      />
      <MoviesContainer
        movies={popularMovies.results}
        title="Popular"
        link="popular"
      />
      <MoviesContainer
        movies={topRatedMovies.results}
        title="Top Rated"
        link="top_rated"
      />
    </div>
  );
}
