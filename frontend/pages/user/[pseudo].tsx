import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import MediaGrid from "../../components/media/MediaGrid";
import type { Media, User } from "../../utils/types";

export const getServerSideProps: GetServerSideProps<{ user: User }> = async (
  context
) => {
  const resp = await fetch(
    `http://localhost:3000/api/users/${context.params!.pseudo}`
  );
  const data = await resp.json();
  console.log(data);
  return { props: { user: data } };
};

const Profile: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <header className="text-center space-y-4 mb-10">
        <img
          src={user.photoUrl}
          alt={user.pseudo}
          className="h-[40vh] rounded-full mx-auto"
        />
        <h1 className="font-bold text-5xl">{user.pseudo}</h1>
      </header>
      <div>
        <h2 className="text-2xl font-bold mb-2">Recently watched</h2>
        <MediaGrid medias={user.viewedMedias} />
      </div>
    </>
  );
};

export default Profile;
