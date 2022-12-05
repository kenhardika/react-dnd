import { memo } from 'react';
function InputList({ lists, deleteList }) {

    return (
        <div className="bg-slate-300 flex flex-row w-full px-2 justify-between">
            {lists}
            {lists &&
            <button className=" w-[25px]  rounded-full bg-red-500 text-white text-xs"
                onClick={deleteList}
            >
                x
            </button>}
        </div>
    );
}

function areNonFuncPropsEquals(prevProps, nextProps) {
    return prevProps.lists === nextProps.lists;
  }

export default memo(InputList, areNonFuncPropsEquals);