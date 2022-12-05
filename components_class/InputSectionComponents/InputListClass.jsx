import React, { PureComponent } from 'react';

class InputListClass extends PureComponent {
  render() {
    const { lists, deleteList } = this.props;
    return (
      <div className="bg-slate-300 flex flex-row w-full px-2 justify-between">
        {lists}
        {lists && (
          <button
            className=" w-[25px]  rounded-full bg-red-500 text-white text-xs"
            onClick={deleteList}
          >
            x
          </button>
        )}
      </div>
    );
  }
}

export default InputListClass;