import { Media } from "../utils/types";
import MediaCard from "./MediaCard";

export default function MediaGrid({ medias }: { medias: Media[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {medias.map((media) => (
        <MediaCard media={media} key={media.id} />
      ))}
    </div>
  );
}
