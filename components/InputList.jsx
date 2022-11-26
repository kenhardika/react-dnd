export default function InputList({list}) {
    return (
        <div className="bg-slate-300 flex flex-row w-full px-2 justify-between">
            {list}
            <button className=" w-[25px]  rounded-full bg-red-500 
                    text-white text-xs ">
                        x
            </button>
        </div>
    );
}
