import React from 'react';
import Divider from '../utils/Divider.jsx';

const ConversationDetails = ({onClose,user}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
        <div className='bg-purple-700 p-4 py-6 m-1 rounded w-full max-w-sm'>
            <h2 className='font-bold underline'>Profile Details</h2>
            <div className='grid gap-3 mt-3'>
                <div className='flex flex-col gap-1'>
                    <label className='font-bold text-white'>Name:</label>
                    <div className='w-full py-1 px-2 focus:outline-primary border-0.5 text-white'
                    >{user.fullName}</div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='font-bold text-white'>Username:</label>
                    <div className='w-full py-1 px-2 focus:outline-primary border-0.5 text-white'
                    >{user.username}</div>
                </div>
                <div>
                    <div className='font-bold text-white'>Profile Photo:</div>
                    <div className='my-1 flex items-center gap-4'>
                        <div className='chat-image avatar'>
				            <div className='w-60 rounded-full'>
					        <img alt='Tailwind CSS chat bubble component' src={user.profilePic} />
			        	    </div>
			            </div>
                    </div>
                </div>
                <Divider/>    
                <div className='flex gap-2 w-fit ml-auto '>
                    <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded text-white hover:bg-primary hover:text-white'>Cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConversationDetails;
