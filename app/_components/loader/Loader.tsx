"use client";

import { useEffect, useState } from "react";
import "./loader.scss";
import Image from "next/image";

type LoaderProps = {
  customText?: string;
};

const Loader = ({ customText }: LoaderProps) => {
  const frames = Array.from(
    { length: 77 },
    (_, i) => `/logo-animation/Frame${i + 1}.png`
  );

  return (
    <div className="loader">
      <div className="logo__container">
        {frames.map((frame, i) => {
          return (
            <Image
              key={i}
              src={frame}
              width={200}
              height={200}
              alt="Couldn't Load Logo"
            />
          );
        })}
        {/* <Image src='/logo-animation/Frame1.png' width={200} height = {200} alt="Couldn't Load Logo" /> */}
      </div>
      {customText ? (
        <div className="loading__text custom" key={customText}>
          {customText}
        </div>
      ) : (
        <div className="loading__text">
          <span>M</span>
          <span>y</span>
          <span>t</span>
          <span>h</span>
          <span>e</span>
          <span>l</span>
          <span>i</span>
          <span>x</span>
        </div>
      )}
    </div>
  );
};

export default Loader;
