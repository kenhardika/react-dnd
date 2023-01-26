import React, { Component } from 'react';

class InputSectionClass extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { deleteSection, children } = this.props;

    return (
      <div
        className="w-[500px] h-auto flex flex-col p-5 
            bg-white rounded-lg items-center gap-5"
      >
        <div className="w-full flex justify-end">
          <button
            className="px-2 bg-red-500 
                    text-white text-sm rounded-xl"
            onClick={deleteSection}
          >
            delete
          </button>
        </div>
        {children}
      </div>
    );
  }
}

export default InputSectionClass;