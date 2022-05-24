import type { GetServerSideProps, NextPage } from "next";
import MediaGrid from "../components/media/MediaGrid";
import type { Media } from "../utils/types";

export const getServerSideProps: GetServerSideProps<{
  medias: Media[];
}> = async (context) => {
  const resp = await fetch("http://localhost:3000/api/medias");
  const data = await resp.json();
  return { props: data };
};

const Home: NextPage<{ medias: Media[] }> = ({ medias }) => {
  return (
    <div>
      <h1 className="font-bold text-xl mb-2">Last Entries</h1>
      <MediaGrid medias={medias.sort((a, b) => b.id - a.id)} />
    </div>
  );
};

export default Home;
