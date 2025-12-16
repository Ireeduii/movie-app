"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { getSearchedMovies } from "@/app/utils/get-data";
import { movieResponseType } from "@/app/types";

export const SearchSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [foundMovies, setFoundMovies] = useState<movieResponseType | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    if (!value) {
      setIsOpen(false);
      setFoundMovies(null);
      return;
    }

    try {
      const foundData = await getSearchedMovies(value);
      setFoundMovies(foundData);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      setFoundMovies(null);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Input
        value={searchValue}
        onChange={handleChange}
        className="pl-10 w-full"
        placeholder="Search..."
        onFocus={() => searchValue && setIsOpen(true)}
      />

      {isOpen && foundMovies?.results?.length && (
        <div className="absolute z-50 w-96 mt-2 bg-background shadow-lg rounded">
          {foundMovies.results.slice(0, 5).map((movie) => (
            <Link
              key={movie.id}
              href={`/detail/${movie.id}`}
              onMouseDown={() => setIsOpen(false)} // popover хаагдахаас өмнө шилжилт
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-[40px] h-[60px] object-cover rounded"
              />
              <span className="text-sm font-medium">{movie.title}</span>
            </Link>
          ))}
          {searchValue && (
            <Link
              href={`/search?value=${searchValue}`}
              onMouseDown={() => setIsOpen(false)}
              className="block p-2 mt-2 font-medium hover:underline"
            >
              See all results for "{searchValue}"
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
