import { Media } from "../../utils/types";

export default function MediaCard({ media }: { media: Media }) {
  return (
    <div className="grid grid-cols-2 rounded-sm shadow-md bg-indigo-100">
      <img
        src={media.coverUrl}
        alt={media.nom}
        className="aspect-[2/3] object-cover"
      />
      <div className="px-2">
        <h1>{media.nom}</h1>
        <p>{media.type}</p>
      </div>
    </div>
  );
}
