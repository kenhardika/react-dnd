import { useRef, memo, useState } from "react";
import InputList from "./InputList";
import Image from "next/image";
// import ModalLayer from "./ModalLayer";


function InputSection({data, handleUpload, handleChange, handleSubmitAddList, handleChangeList, handleDeleteSection, handleDeleteList}) {
    const fileUpload = useRef();
    const tagRef = useRef();
    // const [addList, setAddList] = useState(false);
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        {/* {showModal?
                    <ModalLayer 
                        data = {data}
                        closeModal={()=> setShowModal(false)}
                        addListStatus = {addList}
                        handleAddListStatus = {()=>setAddList(false)}
                        handleChangeInputList = {(e)=>handleChangeInputList(e)}
                    /> : ""
                    } */}
        <div className="w-[500px] h-auto flex flex-col p-5 
            bg-white rounded-lg gap-5">
                
            <div className="flex justify-end">
                <button className="px-2 bg-red-500 
                    text-white text-sm rounded-xl"
                        onClick={()=>handleDeleteSection()}>
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
                    <Image 
                        src={data?.image} 
                        width={200} 
                        height={70} 
                        className="max-h-[180px]" alt=""/>
                }
                <button 
                    className = "rounded-xl p-2 bg-blue-400 text-sm text-white" 
                    onClick = {()=> fileUpload.current.click()}>
                      { data?.image ? "Change Image": "Upload Image" } 
                </button>
                <div className="w-[90%] flex flex-col bg-gray-100 rounded-sm p-2 gap-2 justify-center items-center">
                    {data?.list?.map((lists, index) => {
                       return <InputList 
                        key={index} 
                        lists = {lists} 
                        handleDeleteList = {()=>handleDeleteList(index)} />
                    })
                    }
                    {
                     showModal? 
                        <form 
                            ref={tagRef} 
                            className="flex flex-col justify-center items-center gap-2" >
                            <input type="text" name="list" defaultValue={"input list"}/>
                            <button className="bg-blue-500 w-[80px] rounded-lg text-white " 
                                  onClick={(e)=> {
                                    e.preventDefault();
                                    handleSubmitAddList(tagRef.current[0].value);
                                    setShowModal(false);
                                    }}  > ok </button>
                        </form> : ""
                    }
                    <button className=" w-[50px] bg-gray-500 text-white rounded-lg text-sm"
                        onClick={()=>{
                            setShowModal(!showModal);
                            // setAddList(true);
                        }}
                    >+ list</button>
                </div>
            </div>
        </div>
        </>
    );
}

function areNonFuncPropsEquals(prevProps, nextProps) {
    return prevProps.data === nextProps.data;
  }

export default memo(InputSection, areNonFuncPropsEquals);
