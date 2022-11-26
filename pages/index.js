import { useState } from "react"
import InputSection from "../components/InputSection";
import ModalLayer from "../components/ModalLayer";

export default function Home() {
  const initData = [
        { title: "hehe", 
          image: "no.jpg", 
          list: ["list1"]  
        },
        { title: "haha", 
          image: "yes.jpg", 
          list: ["list1","list2"]  
        },
      ]
  const [data, setData] = useState(initData)
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(e);
  }

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
                data?.map((item, index) => {
                    return <InputSection 
                      data = {item} 
                      key = {index} 
                      handleSubmit = {(e)=>handleSubmit(e)}
                      />
                })
               } 
          </div>
      </div>
    </div>
  </div>
  )
}