import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    useListenMessages();
    const { messages, loading } = useGetMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        if (messages && messages.length > 0) {
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages]);
	console.log(messages);
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                Array.isArray(messages) && messages && messages.length > 0 ?
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                )) :
                loading ?
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />) :
                <p className='text-center'>Send a message to start the conversation</p>
            }
        </div>
    );
};

export default Messages;
