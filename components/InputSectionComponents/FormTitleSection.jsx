import React from 'react';

function FormTitleSection({handleChange, title}) {
  return (
    <div>
      <input
        className="rounded-lg w-full bg-gray-100 px-2"
        placeholder="input title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default FormTitleSection;