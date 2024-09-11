"use client";

import { useState } from "react";

const LazyImage = ({
  src,
  alt,
  ...props
}: {
  src: any;
  alt: string;
  props?: any;
}) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <div className="skeleton" />}
      <img
        className="lazy-image"
        onLoad={handleLoad}
        style={loading ? { opacity: 0 } : { opacity: 1 }}
        src={src}
        alt={alt}
        {...props}
      />
    </>
  );
};

export default LazyImage;
