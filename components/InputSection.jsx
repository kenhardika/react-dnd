import { useRef, memo } from "react";
import InputList from "./InputList";
import Image from "next/image";


function InputSection({data, handleUpload, handleChange, handleAddList, handleDeleteSection, handleDeleteList}) {
    const fileUpload = useRef();
    return (
        <div className="w-[500px] h-auto flex flex-col p-5 
            bg-white rounded-lg gap-5">
            <div className="flex justify-end">
                <button className="px-2 bg-red-500 
                    text-white text-sm rounded-xl"
                        onClick={()=>handleDeleteSection()}    
                >
                        delete
                </button>
            </div>
            <div className="h-[300px] flex flex-col items-center gap-2 " >
                <input 
                    className="rounded-lg w-full bg-gray-100 px-2" 
                    placeholder="input title" 
                    type="text" 
                    name="title"
                    defaultValue={data?.title}
                    onChange = {(e)=> handleChange(e)}
                />
                <input 
                    type="file"
                    name="image"
                    className="hidden" 
                    ref={fileUpload}
                    onChange = {(e)=>{
                        handleUpload(e);
                    }}    
                />
                { data?.image &&
                    <Image src={data?.image} width={200} height={70} className="max-h-[180px]" alt=""/>
                }
                <button className="rounded-xl p-2 bg-blue-400 text-sm text-white" 
                    onClick={()=> fileUpload.current.click()}>
                      { data?.image ? "Change Image": "Upload Image" } 
                </button>
                <div className="w-[90%] flex flex-col bg-gray-100 rounded-sm p-2 gap-2 justify-center items-center">
                    {data?.list?.map((lists, index) => {
                       return <InputList key={index} lists = {lists} handleDeleteList = {()=>handleDeleteList(index)} />
                    })
                    
                    }
                    <button className=" w-[50px] bg-gray-500 text-white rounded-lg text-sm"
                        onClick={()=>handleAddList()}
                    >+ list</button>
                </div>
            </div>
        </div>
    );
}

function areNonFuncPropsEquals(prevProps, nextProps) {
    return prevProps.data === nextProps.data;
  }

export default memo(InputSection, areNonFuncPropsEquals);
