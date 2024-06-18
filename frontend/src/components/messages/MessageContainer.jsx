import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useUserData from "../../hooks/userData";
const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);
	return (
		<div className='flex flex-col' style={{width:'100%'}}>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'></span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.name}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;
const NoChatSelected = () => {
	const { loading, userData } = useUserData();
	if (loading){
		return (<span className='loading loading-spinner mx-auto'></span>);
	}
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {userData.name} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};