import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import ConversationDetails from "../../hooks/conversationDetails";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(selectedConversation?._id);
	const status = isOnline? "Online":"Offline";
	const [editUserOpen,setEditUserOpen] = useState(false);

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[1100px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2 h-16 flex'>
					    <button className='chat-image avatar' title={selectedConversation.fullName} onClick={()=>setEditUserOpen(true)}>
				          <div className='w-12 rounded-full '>
					        <img alt='Tailwind CSS chat bubble component' src={selectedConversation.profilePic} />
			              </div>
			            </button>{" "}
						  <div>
						    <div className='text-gray-900 px-4 font-bold'>{selectedConversation.fullName}    </div>
						    <div className="px-4">
								{status}
						    </div>
						  </div>
					</div>
					<Messages />
					<MessageInput />
					{
                        editUserOpen && (
                            <ConversationDetails onClose={()=>setEditUserOpen(false)} user={selectedConversation}/>
                        )
                    }
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

