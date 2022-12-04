import Image from 'next/image';
import React, { PureComponent } from 'react';

class ImageClass extends PureComponent {
  render() {
    const { image, showModal, deleteImage, } = this.props;
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
        {image ? (
          <div className="flex flex-row gap-5">
            <button
              className="rounded-xl p-2 bg-blue-400 text-sm text-white"
              onClick={showModal}
            >
              Change
            </button>

            <button
              className="rounded-xl p-2 bg-red-400 text-sm text-white"
              onClick={deleteImage}
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            className="rounded-xl p-2 bg-blue-400 text-sm text-white"
            onClick={showModal}
          >
            Upload
          </button>
        )}
      </div>
    );
  }
}

export default ImageClass;