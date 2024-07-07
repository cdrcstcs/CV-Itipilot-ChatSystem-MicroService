import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { Avartar } from "../image/avatarPage";
// import useUser from "../../hooks/User";
import useUser from "../../hooks/useGetUser";
const Message = ({ message }) => {
	const { loading, User } = useUser();
	const { selectedConversation } = useConversation();
	if (loading){
		return (<span className='loading loading-spinner mx-auto'></span>);
	}
	const fromMe = message.senderId === User._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? User.imageId : selectedConversation?.imageId;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='rounded-full'>
					<Avartar imageId={profilePic}></Avartar>
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
