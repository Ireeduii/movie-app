import { HomePage } from "@/components/main";
import { HomePageSkeleton } from "@/components/main/HomeSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
}
