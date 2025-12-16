import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

type TrailerDialogProps = {
  youtubeKey: string | undefined;
  children?: React.ReactNode; // children prop нэмсэн
};

export const TrailerDialog = ({ youtubeKey, children }: TrailerDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? children : <Button>Watch trailer</Button>}
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-4xl rounded-none">
        <DialogHeader>
          <DialogTitle className="hidden border-0"></DialogTitle>
          <iframe
            width="898"
            height="600"
            src={`https://www.youtube.com/embed/${youtubeKey}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
