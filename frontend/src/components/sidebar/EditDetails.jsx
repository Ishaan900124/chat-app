import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext.jsx';
import  EditUserDetails  from '../../hooks/EditUserDetails.jsx';

const EditDetails = () => {
    const { authUser } = useAuthContext();
    const [editUserOpen,setEditUserOpen] = useState(false);
  return (
    <div>
        <button className='mx-auto m-2' title={authUser.fullName} onClick={()=>setEditUserOpen(true)}>
            <div className='chat-image avatar'>
				      <div className='w-10 rounded-full '>
					      <img alt='Tailwind CSS chat bubble component' src={authUser.profilePic} />
			        </div>
			      </div>
        </button>
        {
            editUserOpen && (
                <EditUserDetails onClose={()=>setEditUserOpen(false)} user={authUser}/>
            )
        }
    </div>
  )
}

export default EditDetails;