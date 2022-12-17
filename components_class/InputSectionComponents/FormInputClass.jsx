import React, { PureComponent } from 'react';

class FormInputClass extends PureComponent {
  render() {
    const { handleChange, value, name }  = this.props;
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
}

export default FormInputClass;