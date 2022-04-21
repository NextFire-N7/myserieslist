import type { GetServerSideProps, NextPage } from "next";
import MediaGrid from "../components/media/MediaGrid";
import { Media } from "../utils/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resp = await fetch("http://localhost:3000/api/medias");
  const data = await resp.json();
  return { props: data };
};

const Home: NextPage<{ medias: Media[] }> = ({ medias }) => {
  return (
    <div>
      <MediaGrid medias={medias} />
    </div>
  );
};

export default Home;
