import Image from "next/image";
import React from "react";

function ImageSection({ image, showModal }) {
  return (
    <div className="h-auto flex flex-col items-center gap-2 ">
      {image && (
        <Image
          src={image}
          width={200}
          height={70}
          className="max-h-[180px]"
          alt=""
        />
      )}
      <button
        className="rounded-xl p-2 bg-blue-400 text-sm text-white"
        onClick={showModal}
      >
        Upload
      </button>
    </div>
  );
}

export default ImageSection;
