import { useReducer, useState } from "react"
import InputSection from "../components/InputSection";
import ModalLayer from "../components/ModalLayer";
import { formReducer, INITIAL_STATE } from "../utils/formReducer";

export default function FunctionIndex() {
  // const [data, setData] = useState() // pake use reducer
  
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(e);
  }

  const handleChange = (e, index) =>{
    dispatch({ type: "CHANGE_TITLE", payload: { name: e.target.name, value: e.target.value, index: index } })
  }

  console.log(state)
  return (
  <div className="h-screen">
    {showModal?
      <ModalLayer closeModal={()=>{setShowModal(false)}}/> : ""
    }
    <div className=" w-full bg-scroll flex flex-col 
      justify-center items-center bg-cyan-100">
      <div className="p-2 flex flex-col items-center gap-4"> 
        <p>hello, proceed to open modal </p>
        <button className="w-[100px] border-solid border-2 
          border-black rounded-lg p-2 active:translate-y-0.5" onClick={()=>setShowModal(true)}> click </button> 
          <div className='h-full w-full flex flex-col p-5 gap-5 items-center'> 
               {
                state?.map((item, index) => {
                    return <InputSection 
                      data = {item} 
                      key = {index} 
                      handleSubmit = {(e)=>handleSubmit(e)}
                      handleChange = {(e)=>handleChange(e, index)}
                      />
                })
               } 
          </div>
      </div>
    </div>
  </div>
  )
}