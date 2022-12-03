import React, { memo } from 'react';

function FormTitleSection({ handleChange, title }) {
  return (
      <input
        className="rounded-lg w-[80%] bg-gray-100 px-2"
        placeholder="input title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => handleChange(e)}
      />
  );
}

function areNonFuncPropsEquals(prevProps, nextProps) {
  return prevProps.title === nextProps.title;
}

export default memo(FormTitleSection, areNonFuncPropsEquals);