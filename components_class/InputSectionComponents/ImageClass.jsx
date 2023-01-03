import Image from 'next/image';
import React, { Component } from 'react';

class ImageClass extends Component {
  shouldComponentUpdate(nextProps) {
  return nextProps.image !== this.props.image
  }
  render() {
    const { image, handleUpdateState, deleteImage } = this.props;
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
              onClick={handleUpdateState}
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
            onClick={handleUpdateState}
          >
            Upload
          </button>
        )}
      </div>
    );
  }
}

export default ImageClass;