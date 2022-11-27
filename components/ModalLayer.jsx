import React from 'react';

function ModalLayer({closeModal, handleSubmitAddList , handleAddListStatus, addListStatus}) {
    return (
    <div className='w-full h-screen flex fixed bg-scroll bg-transparent 
        backdrop-blur-sm justify-center items-center'>
        <div className='fixed inset-50 h-[400px] w-[600px] bg-slate-300 
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
                    <form className='flex flex-col' onSubmit={(e)=> handleSubmitAddList(e)}>
                        <input type="text" name='list' />
                        <button className=' w-[50px] bg-gray-500 text-white rounded-lg text-sm' type='submit'>submit</button>
                    </form>
                </div>
            )}

        </div>
    </div>
    );
}

export default ModalLayer;