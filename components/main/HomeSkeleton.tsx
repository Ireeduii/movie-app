import { Loader2 } from "lucide-react";

export const HomePageSkeleton = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader2 size={48} className="animate-spin" />
    </div>
  );
};
