import React from "react";

function ModalLayer({
  children,
  onHide,
}) {
  return (
    <div className="w-screen h-screen fixed backdrop-blur-md flex justify-center items-center">
      <div className="w-[800px] h-[600px] flex flex-col rounded-lg bg-white">
        <div className="w-full h-[50px] flex justify-end items-center p-2 ">
          <button
            onClick={() => onHide()}
            className="h-[25px] w-[25px] align-middle text-center bg-red-500 text-white rounded-full"
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalLayer;