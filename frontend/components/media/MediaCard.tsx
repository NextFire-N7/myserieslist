import Link from "next/link";
import { useCallback, useState } from "react";
import { useSessionStorage } from "../../utils/hooks";
import { AuthData, Chara, Media, Person, PersonType } from "../../utils/types";

export default function MediaCard({ media }: { media: Media }) {
  const [auth, setAuth] = useSessionStorage<AuthData>("auth");

  const [showAddComment, setShowAddComment] = useState(false);
  const [showAddActor, setShowAddActor] = useState(false);
  const [persons, setpersons] = useState<Person[] | null>(null);

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
        setpersons(data);
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
            <div className="flex flex-col space-y-2 my-2">
              <button
                onClick={addToList}
                className="rounded-full bg-blue-400 px-2"
              >
                Add to list
              </button>
              <button
                onClick={() => setShowAddComment(!showAddComment)}
                className="rounded-full bg-blue-400 px-2"
              >
                Add Comment
              </button>
              <button
                onClick={needActor}
                className="rounded-full bg-blue-400 px-2"
              >
                Add People
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        {auth && showAddComment && (
          <NewCommentaire media={media} setShowAddComment={setShowAddComment} />
        )}
        {auth && showAddActor && (
          <AddActor
            media={media}
            setShowAddActor={setShowAddActor}
            persons={persons}
          />
        )}
      </div>
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
    <div className="mt-1000 flex justify-center items-center flex-col rounded-lg shadow-xl p-2 ">
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
  persons,
}: {
  media: Media;
  setShowAddActor: React.Dispatch<React.SetStateAction<boolean>>;
  persons: Person[] | null;
}) {
  const [acteur, setacteur] = useState(false);
  const [characts, setchar] = useState<Chara[] | null>(null);

  const getLinkPerso = useCallback(
    async (e) => {
      e.preventDefault();
      const resp = await fetch(`api/characters/${media.id}/link`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();
      console.log(data);
      setchar(data);
    },
    [media.id]
  );

  const handleLinkActor = useCallback(
    async (e) => {
      e.preventDefault();
      const resp = await fetch(`/api/persons/link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaId: media.id,
          personsId: parseInt(e.target.elements.actorlink.value),
        }),
      });
      const data = await resp.json();
      console.log(data);
      location.reload();
      {
        persons?.map((personnage) => {
          if (
            personnage.id == parseInt(e.target.elements.actorlink.value) &&
            personnage.type == PersonType.ACTEUR
          ) {
            setacteur(true);
          } else {
            setShowAddActor(false);
            getLinkPerso;
          }
        });
      }
    },
    [media.id, setShowAddActor, persons, getLinkPerso]
  );

  const handleLinkPerso = useCallback(
    async (e) => {
      e.preventDefault();
      const resp = await fetch(`api/persons/linkrole`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personsId: parseInt(e.target.elements.actorlink.value),
          charaId: parseInt(e.target.elements.persolink.value),
        }),
      });

      const data = await resp.json();
      console.log(data);
      setShowAddActor(false);
      setacteur(false);
    },
    [setShowAddActor, setacteur]
  );

  console.log(persons);

  return (
    <div className="mt-1000 flex justify-center items-center flex-col rounded-lg shadow-xl p-2">
      {!acteur && (
        <form onSubmit={handleLinkActor} className="mx-2">
          <label className="text-blue-400">People to add</label>
          <br />
          <select name="actorlink" className="text-black">
            {persons?.map((personnage) => (
              <option value={personnage.id} key={personnage.id}>
                {personnage.firstName} {personnage.lastName}
              </option>
            ))}
          </select>
          <br />
          <input type="submit" className="rounded-full bg-blue-400 px-3 m-2" />
        </form>
      )}
      {acteur && (
        <form onSubmit={handleLinkPerso} className="mx-2">
          <label className="text-blue-400">
            Link the Actor to his Character
          </label>
          <br />
          <select name="persolink">
            {characts?.map((charact) => (
              <option value={charact.id} key={charact.id}>
                {charact.nom}
              </option>
            ))}
          </select>
          <br />
          <input type="submit" className="rounded-full bg-blue-400 px-3 m-2" />
        </form>
      )}
    </div>
  );
}
