"use client";

import React, { useState } from "react";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Gallery({ images, className }: { images: any[]; className?: string }) {
  const [gallery, setGallery] = useState<any[]>(images);
  const [index, setIndex] = useState(-1);
  const slides = gallery.map(({ imgUrl = `auto`, width = `auto`, height = `auto` }) => ({
    src: imgUrl,
    width,
    height,
  }));

  const handleClick = (i: any, item?: any) => {
    setIndex(i);
  };
  return (
    <>
      {
        <div className={className}>
          <Lightbox
            slides={slides}
            open={index >= 0}
            index={index}
            on={{
              view: ({ index: i }) => {
                setIndex(i);
              },
            }}
            close={() => {
              setIndex(-1);
            }}
          />
          <div className="flex flex-wrap gap-5 gap-y-5 justify-center">
            {gallery.map((image: any, i: number) => (
              <div
                onClick={() => handleClick(i)}
                className="h-28 lg:h-36 cursor-pointer relative w-28 md:w-36 rounded-md overflow-hidden transition-all hover:scale-110"
                id={image?.id}
                key={image?.id}
              >
                <Image
                  alt="account"
                  fill
                  className="h-full w-full object-cover "
                  src={image.imgUrl}
                />
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}
