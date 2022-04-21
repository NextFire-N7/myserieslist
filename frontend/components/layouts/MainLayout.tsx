import Link from "next/link";
import { Router } from "next/router";

export default function MainLayout({
  router,
  children,
}: {
  router: Router;
  children: React.ReactNode;
}) {
  console.log(router);

  return (
    <div>
      <Navbar router={router} />
      <main className="m-5">{children}</main>
      <Footer />
    </div>
  );
}

function Navbar({ router }: { router: Router }) {
  function aClassName(path: string) {
    return router.route === path ? "underline underline-offset-2" : "";
  }

  return (
    <nav className="sticky top-0 flex space-x-10 p-3 bg-orange-300 bg-opacity-80">
      <h1 className="font-bold text-white">MSL</h1>
      <ul className="space-x-10">
        <Link href="/">
          <a className={aClassName("/")}>Home</a>
        </Link>
        <Link href="/media/add">
          <a className={aClassName("/media/add")}>Add Media</a>
        </Link>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="flex bg-orange-300 items-center justify-center">
      <a href="https://github.com/NextFire-n7/myserieslist">GitHub</a>
    </footer>
  );
}
