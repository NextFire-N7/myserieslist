import Link from "next/link";
import { Router } from "next/router";
import { useCallback } from "react";
import { useSessionStorage } from "../../utils/hooks";
import type { AuthData } from "../../utils/types";

export default function MainLayout({
  router,
  children,
}: {
  router: Router;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar router={router} />
      <main className="m-5">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

function Navbar({ router }: { router: Router }) {
  const [auth, setAuth] = useSessionStorage<AuthData>("auth");

  function aClassName(path: string) {
    return (
      (router.route === path ? "font-bold " : "") +
      "hover:underline underline-offset-2"
    );
  }

  const disconnect = useCallback(() => setAuth(null), [setAuth]);

  return (
    <nav className="sticky top-0 flex py-3 bg-indigo-300 bg-opacity-80">
      <Link href="/">
        <a className="mx-10 font-bold text-blue-700">MySeriesList</a>
      </Link>
      <ul className="space-x-10 mx-auto">
        <Link href="/">
          <a className={aClassName("/")}>Home</a>
        </Link>
        <Link href="/media/add">
          <a className={aClassName("/media/add")}>Add Media</a>
        </Link>
      </ul>
      {auth ? (
        <ul className="mx-10 space-x-5 text-blue-700">
          <Link href={`/user/${auth.pseudo}`}>
            <a className={aClassName(`/user/${auth.pseudo}`)}>{auth.pseudo}</a>
          </Link>
          <a href="/" onClick={disconnect} className="text-red-700">
            Disconnect
          </a>
        </ul>
      ) : (
        <ul className="mx-10 space-x-5 text-blue-700">
          <Link href="/login">
            <a className={aClassName("/login")}>Login</a>
          </Link>
          <Link href="/register">
            <a className={aClassName("/register")}>Register</a>
          </Link>
        </ul>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="flex bg-indigo-300 items-center justify-center">
      <a href="https://github.com/NextFire-n7/myserieslist">GitHub</a>
    </footer>
  );
}
