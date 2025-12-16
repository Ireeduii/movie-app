import { MovieCard } from "@/components/home/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getMoviesList } from "@/app/utils/get-data";
import { movieResponseType } from "@/app/types";

type Props = {
  searchParams: { title?: string; page?: string };
};

const MorePage = async ({ searchParams }: Props) => {
  const title = searchParams.title || "";
  const page = searchParams.page || "1";

  if (!title) return <p>Please provide a movie title.</p>;

  const moviesRes: movieResponseType = await getMoviesList(title, page);

  const currentUrl = `/more?title=${title}&`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Movies: {title}</h1>

      <div className="flex gap-4 flex-wrap">
        {moviesRes.results?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            score={movie.vote_average}
            image={movie.poster_path}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {Number(page) > 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious
                  href={`${currentUrl}page=${Number(page) - 1}`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`${currentUrl}page=${Number(page) - 1}`}>
                  {Number(page) - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationLink isActive href="#">
              {page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href={`${currentUrl}page=${Number(page) + 1}`}>
              {Number(page) + 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href={`${currentUrl}page=${Number(page) + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MorePage;
