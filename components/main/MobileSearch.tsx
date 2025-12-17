"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { GenreResponseType } from "@/app/types";
import { GenreDropdown } from "./GenreDropDown";
import { SearchSection } from "./SearchSection";

export const MobileSearch = ({
  genresResponse,
}: {
  genresResponse: GenreResponseType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block sm:hidden">
      {isOpen ? (
        <div className="flex gap-2">
          <GenreDropdown genresResponse={genresResponse} />
          <SearchSection />
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant="outline"
          >
            <X />
          </Button>
        </div>
      ) : (
        <div className="flex">
          <div>
            <img src="/assets/moviez.png" className="h-5" />
          </div>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Search />
          </Button>
        </div>
      )}
    </div>
  );
};
