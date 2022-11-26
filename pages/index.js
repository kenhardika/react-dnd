import { useState } from "react"
import ModalLayer from "../components/ModalLayer";

export default function Home() {

  const [showModal, setShowModal] = useState(false);

  return (
  <>
    {showModal?
      <ModalLayer closeModal={()=>{setShowModal(false)}}/> : ""
    }
    <div className="w-screen h-screen flex flex-col 
      justify-center items-center bg-cyan-100">
      <div className="p-2 flex flex-col items-center gap-4"> 
        <p>hello, proceed to open modal </p>
        <button className="w-[100px] border-solid border-2 
          border-black rounded-lg p-2 active:translate-y-0.5" onClick={()=>setShowModal(true)}> click </button> 
      </div>
    </div>
  </>
  )
}