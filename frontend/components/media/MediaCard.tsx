import Link from "next/link";
import { useCallback, useState } from "react";
import { useSessionStorage } from "../../utils/hooks";
import type { AuthData, Commentaire, Media } from "../../utils/types";

export default function MediaCard({ media }: { media: Media }) {
  const [auth, setAuth] = useSessionStorage<AuthData>("auth");

  const [showAddComment, setShowAddComment] = useState(false);
  const [showAddActor, setShowAddActor] = useState(false);

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

  const needActor = useCallback(
    async (e) => {
      e.preventDefault();
      if (showAddActor) {
        setShowAddActor(false);
      } else {
        setShowAddActor(true);
        const resp = await fetch("/api/persons", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await resp.json();
        console.log(data);
      }
    },
    [showAddActor]
  );

  return (
    <div className="grid rounded-sm shadow-md bg-indigo-100">
      <div className="grid grid-cols-2 rounded-sm shadow-md bg-indigo-100">
        <img
          src={media.coverUrl}
          alt={media.nom}
          className="aspect-[2/3] object-cover"
        />
        <div className="p-2">
          <Link href={`/media/${media.id}`}>
            <a className="font-bold hover:underline text-blue-800">
              {media.nom}
            </a>
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
                onClick={() => setShowAddComment(!showAddComment)}
                className="rounded-full bg-blue-400 px-2 m-1"
              >
                Add Comment
              </button>
              <button
                onClick={needActor}
                className="rounded-full bg-blue-400 px-2 m-1"
              >
                Add People
              </button>
            </div>
          )}

          <Commentaires comms={media.commentaire} />
        </div>
      </div>

      <div>
        {auth && showAddComment && (
          <NewCommentaire media={media} setShowAddComment={setShowAddComment} />
        )}
        {auth && showAddActor && (
          <AddActor media={media} setShowAddActor={setShowAddActor} />
        )}
      </div>
    </div>
  );
}

function Commentaires({ comms }: { comms: Commentaire[] }) {
  return (
    <div className="container mx-auto rounded-lg bg-indigo-200 overflow-y-scroll max-h-56">
      <p className="text-blue-400 rounded-lg m-2 p-2 font-bold bg-indigo-100">
        Commentaires :
      </p>
      {comms.map((comm) => (
        <div
          className="mt-1000 flex flex-col rounded-lg m-2 shadow-xl bg-blue-400"
          key={comm.id}
        >
          <p className="justify">
            <label className="text-indigo-100 underline m-2 font-semibold">
              {comm.titre} :
            </label>
            <label className="text-indigo-100 text-center bg-right">
              {comm.note}/5
            </label>
          </p>

          <label className="rounded-lg p-2 bg-indigo-100">
            <p className="text-stone-600">{comm.message}</p>
            <p className="text-cyan-400">- {comm.auteur}</p>
          </label>
        </div>
      ))}
    </div>
  );
}

function NewCommentaire({
  media,
  setShowAddComment,
}: {
  media: Media;
  setShowAddComment: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [auth, setAuth] = useSessionStorage<AuthData>("auth");

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
      location.reload();
    },
    [auth, media.id, setShowAddComment]
  );

  return (
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
            className="justify-center mt-1 block w-full text-black"
          />
        </label>
        <label className="block">
          <span className="text-blue-400">Détail du commentaire</span>
          <input
            name="detailCom"
            type="text"
            className="justify-center mt-1 block w-full text-black"
          />
        </label>
        <label className="block">
          <span className="text-blue-400">Note /5</span>
          <input
            type="number"
            name="noteCom"
            min="1"
            max="5"
            className="justify-center mt-1 block w-full text-black"
          />
        </label>
        <label className="block">
          <input type="submit" className="rounded-full bg-blue-400 px-3 m-2" />
        </label>
      </form>
    </div>
  );
}

function AddActor({
  media,
  setShowAddActor,
}: {
  media: Media;
  setShowAddActor: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleLinkActor = useCallback(async (e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="mt-1000 flex justify-center items-center flex-col rounded-lg shadow-xl p-2">
      <form onSubmit={handleLinkActor} className="mx-2">
        <select name="actorlink">
          <option></option>
        </select>
        <input type="submit" className="rounded-full bg-blue-400 px-3 m-2" />
      </form>
    </div>
  );
}
