import { GenreResponseType } from "@/app/types";
import { getMovieGenres } from "@/app/utils/get-data";
import { Search } from "lucide-react";
import { GenreDropdown } from "./GenreDropDown";
import { SearchSection } from "./SearchSection";
import { MobileSearch } from "./MobileSearch";
import { ThemeToggler } from "../home/ThemeToggler";

export const Header = async () => {
  const genresResponse: GenreResponseType = await getMovieGenres();
  return (
    <header className="w-full">
      <div className="max-w-[1280px] flex justify-between m-auto items-center py-3">
        <div>
          <img src="/assets/moviez.png" className="h-5 hidden sm:block" />
        </div>

        <div className="gap-5 hidden sm:flex">
          <GenreDropdown genresResponse={genresResponse} />
          <div className="flex items-center">
            <Search className="-mr-8" />
            <SearchSection />
          </div>
        </div>

        <MobileSearch genresResponse={genresResponse} />
        <div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};
