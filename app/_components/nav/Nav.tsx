"use client";

import Link from "next/link";
import "./Nav.scss";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let links = document.querySelectorAll(".navbar__links a");
    if (menu) {
      links.forEach((link, index) => {
        link.classList.add("visible");
      });
    } else {
      links.forEach((link, index) => {
        link.classList.remove("visible");
        setTimeout(() => {
          link.classList.add("visible");
        }, 1000);
      });
    }
  }, [menu]);

  return (
    <nav className={"navbar"}>
      <Link href="/" className="home__link fade-in fade-left fade-time-10">
        <Image src="/logo-white.png" alt="Mythelix" width={100} height={100} />
        Mythelix
      </Link>

      {session ? (
        <div
          className={`menu__icon ${menu ? "active" : ""}`}
          onClick={() => setMenu((menu) => !menu)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <Link
          className={"fade-in fade-time-10 fade-delay-6 login-mobile"}
          style={{ marginRight: "30px" }}
          href="/auth/signin"
        >
          Login
        </Link>
      )}

      <div className={`navbar__links ${menu ? "show" : ""}`}>
        {session ? (
          <>
            {/* <Link
              className={"fade-in fade-time-10 fade-delay-6 "}
              onClick={() => setMenu(false)}
              href="/Marketplace"
            >
              Marketplace{" "}
            </Link> */}
            <Link
              className={"fade-in fade-time-10  fade-delay-6"}
              onClick={() => setMenu(false)}
              href="/Collection"
            >
              Collection{" "}
            </Link>
            <Link
              className={"fade-in fade-time-10 fade-delay-6 "}
              onClick={() => setMenu(false)}
              href="/api/auth/signout?callbackUrl=/"
            >
              Logout{" "}
            </Link>
          </>
        ) : (
          <>
            <Link
              className={"fade-in fade-time-10 fade-delay-6 "}
              href="/Guest"
            >
              Guest
            </Link>
            <Link
              className={"fade-in fade-time-10 fade-delay-6 "}
              href="/auth/signin"
            >
              Login / Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
