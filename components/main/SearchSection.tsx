"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { getSearchedMovies } from "@/app/utils/get-data";
import { movieResponseType } from "@/app/types";
import { Star } from "lucide-react";

export const SearchSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [foundMovies, setFoundMovies] = useState<movieResponseType | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setIsOpen(false);
      setFoundMovies(null);
      return;
    }

    try {
      const data = await getSearchedMovies(value);
      setFoundMovies(data);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-[380px]">
      <Input
        value={searchValue}
        onChange={handleChange}
        placeholder="Search movies..."
        className="pl-10"
      />

      {isOpen && foundMovies?.results?.length ? (
        <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl bg-background shadow-lg border">
          {foundMovies.results.slice(0, 5).map((movie) => (
            <Link
              key={movie.id}
              href={`/detail/${movie.id}`}
              className="flex gap-3 p-3 hover:bg-muted transition"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : "/no-image.jpg"
                }
                alt={movie.title}
                width={60}
                height={90}
                className="rounded-md object-cover"
              />

              <div className="flex flex-col justify-between">
                <p className="font-medium">{movie.title}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{movie.vote_average}/10</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {movie.release_date}
                </span>
              </div>
            </Link>
          ))}

          <Link
            href={`/search?value=${searchValue}`}
            className="block text-center text-sm font-medium p-3 border-t hover:underline"
            onClick={() => setIsOpen(false)}
          >
            See all results for “{searchValue}”
          </Link>
        </div>
      ) : null}
    </div>
  );
};
