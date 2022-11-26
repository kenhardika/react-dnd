import { useRef, useState } from "react";
import InputList from "./InputList";

export default function InputSection({data, handleSubmit, handleChange}) {
    // const [fileInput, setFileInput] = useState();
    // console.log(fileInput);
    const fileUpload = useRef();
    return (
        <div className="w-[500px] h-auto flex flex-col p-5 
            bg-white rounded-lg gap-5">
            <div className="flex justify-end">
                <button className="px-2 bg-red-500 
                    text-white text-sm rounded-xl">
                        delete
                </button>
            </div>
            <div className="h-[300px] flex flex-col items-center gap-2 " >
                <input 
                    className="rounded-lg w-full bg-gray-100 px-2" 
                    placeholder="input title" 
                    type="text" 
                    name="title"
                    defaultValue={data.title}
                    onChange = {(e)=> handleChange(e)}
                />
                <input 
                    type="file"
                    name="uploadImage"
                    className="hidden" 
                    ref={fileUpload}
                    onChange = {(e)=>{
                        handleSubmit(e);
                        // console.log(fileUpload);
                    }}    
                />

                <button className="rounded-xl p-2 bg-blue-400 text-sm text-white" 
                    onClick={()=> fileUpload.current.click()}> Upload Image </button>

                <div className="w-[90%] flex flex-col bg-gray-100 rounded-sm p-2 gap-2 justify-center items-center">
                    {data.list?.map((list, index) => {
                       return <InputList key={index} list = {list} />
                    })}
                    <button className=" w-[50px] bg-gray-500 text-white rounded-lg text-sm">+ list</button>
                </div>
            </div>
        </div>
    );
}
