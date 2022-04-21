import type { GetServerSideProps, NextPage } from "next";
import MediaCard from "../../components/media/MediaCard";
import { Media } from "../../utils/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resp = await fetch(
    `http://localhost:3000/api/medias/${context.params!.id}`
  );
  const data = await resp.json();
  console.log(data);
  return { props: { media: data } };
};

const MediaPage: NextPage<{ media: Media }> = ({ media }) => {
  return (
    <div>
      <MediaCard media={media} />
    </div>
  );
};

export default MediaPage;
