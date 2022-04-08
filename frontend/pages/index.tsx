import type { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";

// server-side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const resp = await fetch("http://localhost:3000/api/helloworld");
  const data = await resp.json();
  return { props: data };
};

const Home: NextPage<{ message: string }> = ({ message }) => {
  const [hello, setHello] = useState<string>();

  // client-side
  useEffect(() => {
    fetch("/api/helloworld")
      .then((resp) => resp.json())
      .then((data) => setHello(data.message));
  }, []);

  return (
    <div>
      <h1 className="underline">GET /api/helloworld (server-side):</h1>
      <p>{message}</p>
      <h1 className="underline">GET /api/helloworld (client-side):</h1>
      <p>{hello}</p>
    </div>
  );
};

export default Home;
