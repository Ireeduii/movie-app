import { TrailerResponseType } from "@/app/types";
import { getMovieDetail, getMovieTrailers } from "@/app/utils/get-data";
import { TrailerDialog } from "@/components/trailer/Trailer";

type DetailDynamicPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  return {
    title: `MovieZ | ${movieDetailData.title}`,
  };
};

const DetailDynamicPage = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  const trailerData: TrailerResponseType = await getMovieTrailers(id);

  const trailer = trailerData.results.find((item) => item.type === "Trailer");

  return (
    <div className="text-2xl font-bold">
      {movieDetailData.title}
      <>
        <TrailerDialog youtubeKey={trailer?.key} />
      </>
    </div>
  );
};

export default DetailDynamicPage;
