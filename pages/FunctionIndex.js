import { useReducer, useState } from "react"
import InputSection from "../components/InputSection";
import ModalLayer from "../components/ModalLayer";
import { formReducer, formReducerStatus, INITIAL_STATE, INITIAL_STATUS } from "../utils/formReducer";

export default function FunctionIndex() {
  
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [addList, setAddList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleUpload = (e, index)=> {
    const fileUploaded = e.target.files[0];
    if(!fileUploaded) return 
    dispatch({  
                type: "UPLOAD_IMAGE",
                name: e.target.name, 
                value: URL.createObjectURL(fileUploaded),
                indexSection: index,
              });
  }

  const handleChange = (e, indexSection, data) =>{
    dispatch({ type:"CHANGE_TITLE", indexSection, name: e.target.name, value: e.target.value, data })
  }

  const handleAddSection = () => {
    dispatch({ type: "ADD_SECTION" })
  }

  const handleDeleteSection = (indexSection) => { 
    dispatch({
      type: "DELETE_SECTION",
      indexSection
    })
  }

  const handleAddList = (e, index) =>{
    setAddList(true);
    setShowModal(true);
  }

  const handleSubmitAddList = (e) => {
      dispatch({
        type:"ADD_LIST",
        name : e.target.name,
        value : e.target.value
      })
  }

  const handleDeleteList = (indexSection, indexList) => {
    // console.log("delete " + indexSection + " " + indexList);
    dispatch({
      type: "DELETE_LIST",
      indexSection,
      indexList
    })
  }

  console.log(state);
  return (
  <div className="h-screen bg-cyan-100">
    {showModal?
      <ModalLayer 
        closeModal={()=> setShowModal(false)}
        addListStatus = {addList}
        handleAddListStatus = {()=>setAddList(false)}
        handleSubmitAddList = {(e)=>handleSubmitAddList(e)}
      /> : ""
    }
    <div className=" w-full bg-scroll flex flex-col 
      justify-center items-center bg-cyan-100">
      <div className="p-2 flex flex-col items-center gap-4"> 
        <p>hello, proceed to add section </p>
        <button className="w-[100px] border-solid border-2 
          border-black rounded-lg p-2 active:translate-y-0.5" 
            onClick={
                      ()=> handleAddSection()
                    }> Add Section </button> 

          <div className='h-full w-full flex flex-col p-5 gap-5 items-center'> 
               {
                state?.map((item, index) => {
                    return <InputSection 
                      data = {item} 
                      key = {index} 
                      handleUpload = {(e)=>handleUpload(e, index)}
                      handleChange = {(e)=>handleChange(e, index, item)}
                      handleAddList = {()=>handleAddList(index)}
                      handleDeleteSection = {()=>handleDeleteSection(index)}
                      handleDeleteList = {(indexList)=>handleDeleteList(index, indexList)}
                      />
                })
               } 
          </div>
      </div>
    </div>
  </div>
  )
}