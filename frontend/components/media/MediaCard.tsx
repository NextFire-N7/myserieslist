import { Media } from "../../utils/types";

export default function MediaCard({ media }: { media: Media }) {
  return (
    <div className="h-[300px] grid grid-cols-[200px,1fr] rounded-sm shadow-md">
      <img src={media.coverUrl} alt="" className="h-full" />
      <div className="px-2">
        <h1>{media.nom}</h1>
        <p>{media.type}</p>
      </div>
    </div>
  );
}
