import { memo, useState } from "react";
import { Cropper } from "react-cropper";

function ModalCropper({
  onCrop,
  aspectRatio = 1,
  image = "",
  handleUpload,
  onHide,
}) {
  const [cropperInstance, setCropperInstance] = useState();
  const initCrop = () => {
    if (!cropperInstance.getCroppedCanvas()) return;
    if (typeof cropperInstance !== "undefined") {
      onCrop(cropperInstance.getCroppedCanvas().toDataURL());
      onHide();
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-gray-300">
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
      <input
        type="file"
        name="image"
        className=""
        accept="image/*"
        onChange={(e)=>handleUpload(e)}
      />
      <div className="mt-16px w-full flex flex-row justify-center items-center">
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
  );
}

function areNonFuncPropsEquals(prevProps, nextProps) {
  return prevProps.image === nextProps.image;
}

export default memo(ModalCropper, areNonFuncPropsEquals);
