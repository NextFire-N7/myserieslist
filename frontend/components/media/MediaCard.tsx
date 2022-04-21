import Link from "next/link";
import type { Media } from "../../utils/types";

export default function MediaCard({ media }: { media: Media }) {
  return (
    <div className="grid grid-cols-2 rounded-sm shadow-md bg-indigo-100">
      <img
        src={media.coverUrl}
        alt={media.nom}
        className="aspect-[2/3] object-cover"
      />
      <div className="p-2">
        <Link href={`/media/${media.id}`}>
          <a className="font-bold hover:underline text-blue-800">{media.nom}</a>
        </Link>
        <p>{media.type}</p>
      </div>
    </div>
  );
}
