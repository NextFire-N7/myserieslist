import type { GetServerSideProps, NextPage } from "next";
import MediaCard from "../../components/media/MediaCard";
import type { Commentaire, Media } from "../../utils/types";

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
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4">
      <MediaCard media={media} />
      <Commentaires comms={media.commentaire} />
    </div>
  );
};

export default MediaPage;

function Commentaires({ comms }: { comms: Commentaire[] }) {
  return (
    <div className="bg-indigo-200 overflow-y-scroll rounded-lg">
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
