// import { movieResponseType } from "@/app/types";

// export const getSimilarMovies = async (
//   id: string
// ): Promise<movieResponseType> => {
//   try {
//     const API_KEY = process.env.TMDB_API_KEY;
//     const res = await fetch(
//       `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch similar movies");
//     }

//     const data: movieResponseType = await res.json();
//     return {
//       page: data.page,
//       results: data.results,
//       totalPages: data.total_pages,
//       totalResults: data.total_results,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       page: 1,
//       results: [],
//       totalPages: 0,
//       totalResults: 0,
//     };
//   }
// };
