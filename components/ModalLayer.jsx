import React from 'react';

function ModalLayer({closeModal, handleSubmitAddList, handleChangeInputList , data, addListStatus}) {
    return (
    <div className='w-screen flex fixed bg-scroll bg-transparent 
        backdrop-blur-sm justify-center items-center'>
        <div className='inset-0 h-[400px] w-[600px] bg-slate-300 
            rounded-lg flex flex-col items-center justify-start'>
            <div className='w-full flex justify-end p-2'>
                <button 
                    onClick={()=> closeModal()} 
                    className="w-[25px] rounded-full bg-red-500 
                        text-white"> 
                    x 
                </button>
            </div>
            
            {addListStatus && (
                <div>
                    <form 
                        className='flex flex-col' 
                        onSubmit={(e)=> {
                            e.preventDefault();
                            handleSubmitAddList(e);
                            console.log(e.target.name);
                        }}>
                        <input 
                            type="text" 
                            onChange={(e)=> handleChangeInputList(e)} 
                            name='list' />
                        <button className='w-[50px] bg-gray-500 text-white rounded-lg text-sm' 
                            type='submit' >submit</button>
                    </form>
                </div>
            )}

        </div>
    </div>
    );
}

export default ModalLayer;