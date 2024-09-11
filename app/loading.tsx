"use client";

import { useState } from "react";
import Loader from "./_components/loader/Loader";
import useAddObservers from "./_hooks/useAddObservers";

export default function Loading() {
  const [displayLoader, setDisplayLoader] = useState(true);

  const addObservers = useAddObservers();

  let interval = setInterval(() => {
    if ((global as any).background_rendered) {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );

      addObservers();

      setDisplayLoader(false);
      clearInterval(interval);
    }
  }, 100);

  return (
    <div className={`${displayLoader ? "display" : "hide"}`}>
      <Loader />
    </div>
  );
}
