import Link from "next/link";
import { useCallback } from "react";
import { useSessionStorage } from "../../utils/hooks";
import type { AuthData, Media } from "../../utils/types";

export default function MediaCard({ media }: { media: Media }) {
  const [auth, setAuth] = useSessionStorage<AuthData>("auth");

  const addToList = useCallback(
    async (e) => {
      e.preventDefault();
      const resp = await fetch(`/api/users/${auth!.pseudo}/medias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: media.id, token: auth!.token }),
      });
      const data = await resp.json();
      console.log(data);
    },
    [auth, media.id]
  );

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
        {auth && (
          <div>
            <button
              onClick={addToList}
              className="rounded-full bg-blue-400 px-2"
            >
              Add to list
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
