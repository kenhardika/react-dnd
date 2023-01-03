import React from 'react';

function FormInputSection({ handleChange, value, name }) {
  
  return (
      <input
        className="rounded-lg w-[80%] bg-gray-100 px-2"
        placeholder={`input ${name}`} 
        type="text"
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
      />
  );
}

export default FormInputSection