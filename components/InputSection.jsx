import { useRef, memo, useState } from "react";
import InputList from "./InputList";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function InputSection({data, handleUpload, handleChange, handleSubmitAddList, handleChangeListOrder, handleDeleteSection, handleDeleteList}) {
    const fileUpload = useRef();
    const tagRef = useRef();
    const [showModal, setShowModal] = useState(false);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        console.log(result);
        const items = Array.from(data.list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        handleChangeListOrder(items);
    }

    return (
        <>
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
              <DragDropContext onDragEnd={handleOnDragEnd}>
               <Droppable droppableId="list">
                {(provided)=>(
                    <div className="w-full h-full gap-2 bg-gray-300" {...provided.droppableProps} ref={provided.innerRef}>
                            {data?.list?.map((lists, index) => {
                            return  <Draggable key = {`key-list-${index}`} draggableId={`list-id-${index}`} index={index}> 
                                   {(provided)=>(
                                      <div className="py-1 border border-solid" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <InputList 
                                            key={index} 
                                            lists = {lists} 
                                            handleDeleteList = {()=>handleDeleteList(index)} 
                                        />
                                       </div>
                                    )}
                                    </Draggable>
                            })}
                            {provided.placeholder}
                    </div>)
                    }
               </Droppable>
              </DragDropContext>
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
