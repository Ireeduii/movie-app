"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieType, TrailerResponseType } from "@/app/types";
import { TrailerDialog } from "../trailer/Trailer";
import { getMovieTrailers } from "@/app/utils/get-data";

type MovieCarouselProps = {
  movies: MovieType[];
};

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-screen">
        <CarouselContent>
          {movies?.map((movie, index) => (
            <MovieCarouselItem key={index} movie={movie} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-13" />
        <CarouselNext className="right-13" />
      </Carousel>
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            onClick={() => {
              api?.scrollTo(index);
            }}
            key={index}
            className={`rounded-full size-4 ${
              index + 1 === current ? "bg-white" : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </>
  );
}

const MovieCarouselItem = ({ movie }: { movie: MovieType }) => {
  const [trailerKey, setTrailerKey] = React.useState("");

  const getTrailerData = async () => {
    const trailerData: TrailerResponseType = await getMovieTrailers(
      movie.id.toString()
    );
    const trailer = trailerData.results.find((item) => item.type === "Trailer");
    setTrailerKey(trailer?.key || "");
  };

  React.useEffect(() => {
    getTrailerData();
  }, []);

  return (
    <CarouselItem>
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-video max-h-[600px] items-center justify-center p-6">
            <span className="text-4xl font-semibold">{movie.title}</span>
            <TrailerDialog youtubeKey={trailerKey} />
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
