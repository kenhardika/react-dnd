import Image from "next/image";
import { memo, useState } from "react";
import { Cropper } from "react-cropper";

function ModalCropper({ defaultImage }) {
  const [image, setImage] = useState(defaultImage);
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <div className="w-full">
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          className="w-full h-[400px]"
          zoomTo={0.5}
          initialAspectRatio={1}
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      </div>
      <div>
        <div className="w-1/2 float-right">
          <h1>Preview</h1>
          <div className="w-full float-left h-[300px]" />
        </div>
        <div className="w-1/2 float-right h-[300px]">
          <h1>
            <span>Crop</span>
            <button className="float-right" onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <Image className="w-full" src={cropData} alt="cropped" />
        </div>
      </div>
      <br className="clear-both" />
    </div>
  );
}

export default memo(ModalCropper);
