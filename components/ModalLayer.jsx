import "cropperjs/dist/cropper.css";
import React, { useState } from 'react';
import { Cropper } from 'react-cropper';


function ModalLayer({ onHide, onCrop, aspectRatio = 1, image="",  }) {
  const [cropperInstance, setCropperInstance] = useState();
  const initCrop = () => {
      if (!cropperInstance.getCroppedCanvas()) return;
      if (typeof cropperInstance !== "undefined") {
       onCrop(cropperInstance.getCroppedCanvas().toDataURL());
       onHide();
      }
    // console.log(cropData);
    //  const cropData = cropperInstance.getCroppedCanvas().toDataURL();
    //  onCrop(file, cropData);
   };
  return (
    <div className="w-screen h-screen fixed backdrop-blur-md flex justify-center items-center">
      <div className="w-[800px] h-[500px] flex flex-col rounded-lg bg-white">
        <div className="w-full h-[50px] flex justify-end items-center p-2 ">
          <button
            onClick={() => onHide()}
            className="h-[25px] w-[25px] align-middle text-center bg-red-500 text-white rounded-full"
          >
            x
          </button>
        </div>
        <div className="h-full w-full bg-gray-300">
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            zoomTo={0}
            preview=".img-preview"
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            aspectRatio={aspectRatio}
            initialAspectRatio={aspectRatio}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropperInstance(instance);
            }}
            guides={true}
          />
          <div className="mt-16px">
            <button
              className=" bg-blue-200 w-[80px] rounded-lg text-white "
              onClick={initCrop}
            >
              Crop
            </button>
            <button
              className=" bg-red-400 w-[80px] rounded-lg text-white "
              onClick={onHide}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLayer;