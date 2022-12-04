import React, { PureComponent } from 'react';

class FormTitleClass extends PureComponent {
  render() {
    const { title, handleChange } = this.props;
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
}

export default FormTitleClass;