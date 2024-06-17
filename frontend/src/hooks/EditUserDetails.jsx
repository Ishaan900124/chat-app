import React, { useEffect, useRef, useState } from 'react';
import uploadFile from '../pages/upload/uploadFile';
import Divider from '../utils/Divider.jsx';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

const EditUserDetails = ({onClose,user}) => {

    const [fullName, setFullname]=useState(user?.fullName);
    const [profilePic, setProfilepic]=useState(user?.profilePic);
    const { setAuthUser } = useAuthContext();
    const uploadPhotoRef = useRef();
    const username = user?.username;

    useEffect(()=>{
        setFullname(user?.fullName);
        setProfilepic(user?.profilePic);
    },[user])

    const handleOnChange = (e)=>{
        setFullname(e.target.value);
    }

    const handleOpenUploadPhoto = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        uploadPhotoRef.current.click()
    }

    const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0];
        const uploadPhoto = await uploadFile(file);
        setProfilepic(uploadPhoto?.url);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        try {
            const res = await fetch("/api/auth/update", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, fullName , profilePic }),
			});

            const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
            onClose();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
        <div className='bg-purple-700 p-4 py-6 m-1 rounded w-full max-w-sm'>
            <h2 className='font-bold underline'>Profile Details</h2>
            <p className='text-sm '>Edit user details</p>
            <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <label className='font-bold text-white'>Name:</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={fullName}
                        onChange={handleOnChange}
                        className='w-full py-1 px-2 bg-purple-500 focus:outline-primary border-0.5'
                    />
                </div>
                <div>
                    <div className='font-bold text-white'>Photo:</div>
                    <div className='my-1 flex items-center gap-4'>
                        <div className='chat-image avatar'>
				            <div className='w-40 rounded-full'>
					        <img alt='Tailwind CSS chat bubble component' src={profilePic} />
			        	    </div>
			            </div>
                        <label>
                        <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
                        <input
                            type='file'
                            id='profile_pic'
                            className='hidden'
                            onChange={handleUploadPhoto}
                            ref={uploadPhotoRef}
                        />
                        </label>
                    </div>
                </div>
                <Divider/>    
                <div className='flex gap-2 w-fit ml-auto '>
                    <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded text-white hover:bg-primary hover:text-white'>Cancel</button>
                    <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default React.memo(EditUserDetails)