import type { GetServerSideProps, NextPage } from "next";
import { useCallback } from "react";
import MediaCard from "../../components/media/MediaCard";
import { useSessionStorage } from "../../utils/hooks";
import type { AuthData, Media } from "../../utils/types";

export const getServerSideProps: GetServerSideProps<{ media: Media }> = async (
  context
) => {
  const resp = await fetch(
    `http://localhost:3000/api/medias/${context.params!.id}`
  );
  const data = await resp.json();
  console.log(data);
  return { props: { media: data } };
};

const MediaPage: NextPage<{ media: Media }> = ({ media }) => {
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
    <div className="space-y-4">
      <MediaCard media={media} />
      {auth && (
        <button onClick={addToList} className="rounded-full bg-blue-400 px-2">
          Add to list
        </button>
      )}
    </div>
  );
};

export default MediaPage;
