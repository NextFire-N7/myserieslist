import type { NextPage } from "next";
import { useCallback } from "react";
import { useSessionStorage } from "../utils/hooks";
import type { AuthData } from "../utils/types";

const Login: NextPage = () => {
  const [auth, setAuth] = useSessionStorage<AuthData>("auth");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const resp = await fetch(`/api/users/${e.target.elements.pseudo.value}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: e.target.elements.password.value,
        }),
      });
      const data = await resp.json();
      console.log(data);
      setAuth(data);
      location.href = "/";
    },
    [setAuth]
  );

  return (
    <form onSubmit={handleSubmit} className="mx-2">
      <h2 className="text-2xl font-bold">Login</h2>
      <div className="mt-4 max-w-md">
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-gray-700">Pseudo</span>
            <input name="pseudo" type="text" className="mt-1 block w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              name="password"
              type="password"
              className="mt-1 block w-full"
            />
          </label>
          <input
            type="submit"
            className="bg-indigo-400 border-2 border-indigo-400 cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
