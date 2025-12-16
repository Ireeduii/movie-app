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
import { TrailerDialog } from "../home/Trailer";
import { getMovieTrailers } from "@/app/utils/get-data";
import Image from "next/image";

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
    <CarouselItem className="basis-full">
      <div className="p-1">
        <Card>
          <CardContent className="relative aspect-video max-h-[600px] p-0 overflow-hidden">
            <Image
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                  : "/no-image.jpg"
              }
              alt={movie.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />

            {/* <div className="absolute inset-0 bg-black/50" /> */}

            <div className="absolute bottom-6 left-6 z-10 space-y-4">
              <h2 className="text-3xl font-bold text-white">{movie.title}</h2>

              <TrailerDialog youtubeKey={trailerKey} />
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
