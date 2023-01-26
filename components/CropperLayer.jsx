import "cropperjs/dist/cropper.css";
import { memo, useState } from "react";
import { Cropper } from "react-cropper";

function CropperLayer({
  onCrop,
  aspectRatio = 1,
  image = "",
  handleUpload,
  onHide,
}) {
  const [cropper, setCropper] = useState();
  const initCrop = () => {
    if (!cropper.getCroppedCanvas()) return;
    if (typeof cropper !== "undefined") {
      onCrop(cropper.getCroppedCanvas().toDataURL());
      onHide();
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-5 gap-3 bg-gray-300">
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
          setCropper(instance);
        }}
        guides={true}
      />
      <input
        type="file"
        name="image"
        className="h-[50px]"
        accept="image/*"
        onChange={(e)=>handleUpload(e)}
      />
      <div className="mt-16px w-full flex flex-row justify-center items-center gap-5">
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

export default memo(CropperLayer, areNonFuncPropsEquals);
