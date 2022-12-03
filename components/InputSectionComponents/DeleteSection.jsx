import React from 'react';

function DeleteSection({handleDeleteSection}) {
  return (
    <div className="flex justify-end">
      <button
        className="px-2 bg-red-500 
                    text-white text-sm rounded-xl"
        onClick={()=>handleDeleteSection()}
      >
        delete
      </button>
    </div>
  );
}

export default DeleteSection;