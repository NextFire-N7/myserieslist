import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [hello, setHello] = useState<string>();

  useEffect(() => {
    fetch("/api/helloworld")
      .then((resp) => resp.json())
      .then((data) => setHello(data.message));
  }, []);

  return (
    <div>
      <h1 className="underline">GET /api/helloworld:</h1>
      <p>{hello}</p>
    </div>
  );
};

export default Home;
