import Link from "next/link";
import { Key, ReactChild, ReactFragment, ReactPortal, useCallback, useState } from "react";
import { useSessionStorage } from "../../utils/hooks";
import type { AuthData, Media } from "../../utils/types";

export default function MediaCard({ media }: { media: Media }) {
  const [auth, setAuth] = useSessionStorage<AuthData>("auth");

  const [showAddComment, setShowAddComment] = useState(false);

  const handleSubmitCom = useCallback(
    async (e) => {
      setShowAddComment(false);
      e.preventDefault();
      const resp = await fetch(`/api/commentaires/${auth!.pseudo}/posted`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: media.id,
          token: auth!.token,
          titre: e.target.elements.titleCom.value,
          detail: e.target.elements.detailCom.value,
          note: parseInt(e.target.elements.noteCom.value),
        }),
      });
      const data = await resp.json();
      console.log(data);
    },
    [auth, media.id]
  );

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
        <p className="text-blue-400">{media.type}</p>
        {auth && (
          <div>
            <button
              onClick={addToList}
              className="rounded-full bg-blue-400 px-2"
            >
              Add to list
            </button>
            <button
              onClick={() => showAddComment ? setShowAddComment(false) : setShowAddComment(true)}
              className="rounded-full bg-blue-400 px-2 m-1"
            >
              Add Comment
            </button>
          </div>
        )}
        {auth && showAddComment && (
          <div className="mt-1000 flex justify-center items-center flex-col rounded-lg shadow-xl p-2">
            <form onSubmit={handleSubmitCom} className="mx-2">
              <h2 className="text-base mt-2 text-gray-600 font-semibold text-center mx-4">
                Post a comment on {media.nom}
              </h2>
              <label className="block">
                <span className="text-blue-400">Titre</span>
                <input
                  name="titleCom"
                  type="text"
                  className="justify-center mt-1 block w-full"
                />
              </label>
              <label className="block">
                <span className="text-blue-400">Détail du commentaire</span>
                <input
                  name="detailCom"
                  type="text"
                  className="justify-center mt-1 block w-full"
                />
              </label>
              <label className="block">
                <span className="text-blue-400">Note /5</span>
                <input
                  type="number"
                  name="noteCom"
                  min="1"
                  max="5"
                  className="justify-center mt-1 block w-full"
                />
              </label>
              <label className="block">
                <input
                  type="submit"
                  className="rounded-full bg-blue-400 px-3 m-2"
                />
              </label>
            </form>
          </div>
        )}
        <div className="container max-h-96 mx-auto py-8 overflow-y-auto">
          <p className="text-blue-400">Commentaires :</p>
          {media.commentaire.map((comm: { id: Key | null | undefined; titre: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; message: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; note: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; auteur: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => (
            <div className="container mx-auto py-3" key={comm.id}>
              <p className="text-stone-900 underline">{comm.titre} :</p>
              <p className="text-stone-600">{comm.message}</p>
              <p className="text-stone-600 text-sm">{comm.note}/5</p>
              <p className="text-cyan-400">- {comm.auteur}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
