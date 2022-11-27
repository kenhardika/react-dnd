import { useReducer } from "react"
import InputSection from "../components/InputSection";
import ModalLayer from "../components/ModalLayer";
import { formReducer, formReducerStatus, INITIAL_STATE, INITIAL_STATUS } from "../utils/formReducer";

export default function FunctionIndex() {
  
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [status, dispatchStatus] = useReducer(formReducerStatus, INITIAL_STATUS); // to do: buat change status, cobain
  
  const handleUpload = (e, index)=> {
    const fileUploaded = e.target.files[0];
    if(!fileUploaded) return 
    // console.log(fileUploaded);
    const newState = { ...state[index], [e.target.name]: URL.createObjectURL(fileUploaded) }
    // console.log(newState);
    // dispatch({  
    //             type: "UPLOAD_IMAGE", 
    //             payload: {
    //                 index: index,
    //                 newState: newState
    //             }
    //           });

  }

  const handleChange = (e, indexSection, data) =>{
    dispatch({ type:"CHANGE_TITLE", indexSection: indexSection, name: e.target.name, value: e.target.value, data })
  }

  const randomizeID = () => {
    const randomId = Math.floor(Math.random() * 20);
    if (state.some((item) => (item.id === randomId))) {
      return randomizeID();
    } else {
      return randomId;
    }
  }

  const handleAddSection = () => {
    const emptySec = { 
      title: "", 
      image: "", 
      list: [],
      id: randomizeID()  
    }
    dispatch({ 
      type: "ADD_SECTION", 
      payload: { value: emptySec }})
  }

  const handleAddList = (e, index) =>{
    
    dispatchStatus({ type: "CHANGE_STATUS_MODAL" });
    dispatch({
      type:"ADD_LIST",
      payload: {

      }
    })
  }

  const handleDeleteSection = (id) => {
    console.log(state);
    console.log(id);
    // const newFilter = state.filter((item)=> item.id !== id );
    // console.log(newFilter);
    // console.log(state[indexDelete].id);
      // const newState = state.filter((item)=> item.id !== state[indexDelete].id );
      // console.log(newState); 
      // dispatch({
      //   type: "DELETE_SECTION",
      //   payload: newState
      // })
  }

  console.log(state);
  return (
  <div className="h-screen bg-cyan-100">
    {status.modalStatus?
      <ModalLayer closeModal={
        ()=>{ 
              dispatchStatus({ type: "CHANGE_STATUS_MODAL" })  
            }}/> : ""
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
                      handleAddList = {(e, id)=>handleAddList(e, id)}
                      handleDeleteSection = {(id)=>handleDeleteSection(id)}
                      />
                })
               } 
          </div>
      </div>
    </div>
  </div>
  )
}