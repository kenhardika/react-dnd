import { useReducer} from "react"
import InputSection from "../components/InputSection";
import { formReducer, INITIAL_STATE } from "../utils/formReducer";

export default function FunctionIndex() {
  
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  
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

  // const handleChangeList = (e) => {
  //   dispatch({ type: "CHANGE_INPUT", name: e.target.name, value: e.target.value })
  // }

  const handleAddSection = () => {
    dispatch({ type: "ADD_SECTION" })
  }

  const handleDeleteSection = (indexSection) => { 
    dispatch({
      type: "DELETE_SECTION",
      indexSection
    })
  }

  const handleSubmitAddList = (value, indexSection) => {
    dispatch({
        type:"ADD_LIST",
        value,
        indexSection
      })
  }

  const handleDeleteList = (indexSection, indexList) => {
    dispatch({
      type: "DELETE_LIST",
      indexSection,
      indexList
    })
  }

  return (
  <div className="h-screen bg-cyan-100">
    <div className=" w-full bg-scroll flex flex-col 
      justify-center items-center bg-cyan-100">
      <div className="p-2 flex flex-col items-center gap-4"> 
        <p>hello, proceed to add section </p>
        <button className="w-[100px] border-solid border-2 
          border-black rounded-lg p-2 active:translate-y-0.5" 
            onClick={()=> handleAddSection()
                    }> Add Section </button> 
          <div className='h-full w-full flex flex-col p-5 gap-5 items-center'> 
               {
                state?.map((item, index) => {
                    return <InputSection 
                      data = {item} 
                      key = {index}
                      handleUpload = {(e)=>handleUpload(e, index)}
                      handleChange = {(e)=>handleChange(e, index, item)}
                      handleDeleteSection = {()=>handleDeleteSection(index)}
                      handleDeleteList = {(indexList)=>handleDeleteList(index, indexList)}
                      handleSubmitAddList = {(value)=> handleSubmitAddList(value, index)}
                      handleChangeList = {(e)=> handleChangeList(e)}
                      />
                })
               } 
          </div>
      </div>
    </div>
  </div>
  )
}