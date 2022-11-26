import React from 'react';

function ModalLayer({closeModal}) {
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
            
            <div className='h-full w-full flex flex-col p-5 items-center'> 
                This is Modal 
            </div>
        </div>
    </div>
    );
}

export default ModalLayer;