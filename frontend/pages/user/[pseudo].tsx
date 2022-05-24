import type { GetServerSideProps, NextPage } from "next";
import type { User } from "../../utils/types";

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
      <header className="text-center space-y-4">
        <img
          src={user.photoUrl}
          alt={user.pseudo}
          className="w-1/4 rounded-full mx-auto"
        />
        <h1 className="font-bold text-5xl">{user.pseudo}</h1>
      </header>
    </>
  );
};

export default Profile;
