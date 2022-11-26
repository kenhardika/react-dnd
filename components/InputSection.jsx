import { useRef, useState } from "react";
import InputList from "./InputList";

export default function InputSection({data, handleSubmit}) {
    // const [fileInput, setFileInput] = useState();
    // console.log(fileInput);
    const fileUpload = useRef();
    return (
        <div className="w-full h-auto flex flex-col p-5 
            bg-white rounded-lg gap-5">
            <div className="flex justify-end">
                <button className="px-2 bg-red-500 
                    text-white text-sm rounded-xl">
                        delete
                </button>
            </div>
            <form className="h-[300px] flex flex-col items-center gap-2 " 
                onSubmit={(e)=> {
                    handleSubmit(e);
                }}>
                <input 
                    className="rounded-lg w-full bg-gray-100 px-2" 
                    placeholder="input title" 
                    type="text" 
                    name="title"
                    value={data.title}
                />
                <input 
                    type="file"
                    name="uploadImage" 
                    ref={fileUpload}
                    // onChange = {(e)=>{
                    //     console.log(fileUpload);
                    // }}    
                />
                <div className="w-[90%] flex flex-col bg-gray-100 rounded-sm p-2">
                    {data.list?.map((list, index) => {
                       return <InputList key={index} list = {list} />
                    })}
                </div>
                <button type="submit" className=" w-[100px] bg-orange-500 text-white rounded-lg">submit</button>
            </form>
        </div>
    );
}
