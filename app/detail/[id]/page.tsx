// import { TrailerResponseType } from "@/app/types";
// import { getMovieDetail, getMovieTrailers } from "@/app/utils/get-data";
// import { TrailerDialog } from "@/components/home/Trailer";
// import { Star } from "lucide-react";

// type DetailDynamicPageProps = {
//   params: { id: string };
// };

// export const generateMetadata = async ({ params }: DetailDynamicPageProps) => {
//   const movieDetailData = await getMovieDetail(params.id);

//   return {
//     title: `MovieZ | ${movieDetailData.title}`,
//   };
// };

// const DetailDynamicPage = async ({ params }: DetailDynamicPageProps) => {
//   const id = params.id;

//   const movieDetailData = await getMovieDetail(id);
//   const trailerData: TrailerResponseType = await getMovieTrailers(id);

//   const trailer = trailerData.results.find((item) => item.type === "Trailer");

//   const imageBaseUrl = "https://image.tmdb.org/t/p/original";

//   return (
//     <div className="max-w-[1200px] mx-auto mt-12 px-4">
//       {/* ===== TITLE + RATING ===== */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-4xl font-bold">{movieDetailData.title}</h1>
//           <p className="text-gray-500 mt-1">{movieDetailData.release_date}</p>
//         </div>

//         <div className="text-right">
//           <p className="text-sm text-gray-500">Rating</p>
//           <div className="flex items-center gap-1 justify-end">
//             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//             <span className="font-semibold">
//               {movieDetailData.vote_average}/10
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ===== POSTER + BACKDROP ===== */}
//       <div className="flex gap-6">
//         <img
//           src={`${imageBaseUrl}${movieDetailData.poster_path}`}
//           alt={movieDetailData.title}
//           className="w-[300px] rounded-xl"
//         />

//         <div className="relative flex-1">
//           <img
//             src={`${imageBaseUrl}${movieDetailData.backdrop_path}`}
//             alt=""
//             className="w-full h-[430px] object-cover rounded-xl"
//           />

//           {trailer && (
//             <div className="absolute bottom-6 left-6">
//               <TrailerDialog youtubeKey={trailer?.key}>
//                 <div className="flex items-center gap-4 mt-20 ml-5">
//                   <button className="w-10 h-10 bg-white flex items-center rounded-full justify-center">
//                     <img className="text-black w-5 h-5" src="/play.png" />
//                   </button>
//                   Play Trailer
//                 </div>
//               </TrailerDialog>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ===== GENRES ===== */}
//       <div className="flex gap-3 mt-6 flex-wrap">
//         {movieDetailData.genres?.map((genre: any) => (
//           <span
//             key={genre.id}
//             className="border px-4 py-1 rounded-full text-sm"
//           >
//             {genre.name}
//           </span>
//         ))}
//       </div>

//       {/* ===== OVERVIEW ===== */}
//       <p className="mt-6 text-gray-700 leading-relaxed">
//         {movieDetailData.overview}
//       </p>
//     </div>
//   );
// };

// export default DetailDynamicPage;
import { TrailerResponseType } from "@/app/types";
import { getMovieDetail, getMovieTrailers } from "@/app/utils/get-data";
import { TrailerDialog } from "@/components/home/Trailer";
import { Star } from "lucide-react";

type DetailDynamicPageProps = {
  params: { id: string };
};

// Metadata үүсгэх
export const generateMetadata = async ({ params }: DetailDynamicPageProps) => {
  const movieDetailData = await getMovieDetail(params.id);

  return {
    title: `MovieZ | ${movieDetailData.title}`,
    description:
      movieDetailData.overview || "Discover movies, trailers, and more.",
  };
};

const DetailDynamicPage = async ({ params }: DetailDynamicPageProps) => {
  const id = params.id;

  const movieDetailData = await getMovieDetail(id);
  const trailerData: TrailerResponseType = await getMovieTrailers(id);

  const trailer = trailerData.results.find((item) => item.type === "Trailer");
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="max-w-[1200px] mx-auto mt-12 px-4">
      {/* ===== TITLE + RATING ===== */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold">{movieDetailData.title}</h1>
          <p className="text-gray-500 mt-1">{movieDetailData.release_date}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Rating</p>
          <div className="flex items-center gap-1 justify-end">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">
              {movieDetailData.vote_average}/10
            </span>
          </div>
        </div>
      </div>

      {/* ===== POSTER + BACKDROP ===== */}
      <div className="flex gap-6">
        <img
          src={`${imageBaseUrl}${movieDetailData.poster_path}`}
          alt={movieDetailData.title}
          className="w-[300px] rounded-xl"
        />
        <div className="relative flex-1">
          <img
            src={`${imageBaseUrl}${movieDetailData.backdrop_path}`}
            alt=""
            className="w-full h-[430px] object-cover rounded-xl"
          />
          {trailer && (
            <div className="absolute bottom-6 left-6">
              <TrailerDialog youtubeKey={trailer.key} />
            </div>
          )}
        </div>
      </div>

      {/* ===== GENRES ===== */}
      <div className="flex gap-3 mt-6 flex-wrap">
        {movieDetailData.genres?.map((genre: any) => (
          <span
            key={genre.id}
            className="border px-4 py-1 rounded-full text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* ===== OVERVIEW ===== */}
      <p className="mt-6 text-gray-700 leading-relaxed">
        {movieDetailData.overview}
      </p>
    </div>
  );
};

export default DetailDynamicPage;
