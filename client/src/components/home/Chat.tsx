import { useEffect, useRef } from "react";
import { useChatStore } from "../../Store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useUserStore } from "../../Store/UseUserStore";
import ChatSkeleton from "../skeletons/ChatSkeleton";

const Chat = () => {
  const {
    getMessages,
    chatLoading,
    messages,
    userConversation,
    socketToSendMessage,
    socketOffInConversation,
  } = useChatStore();
  const { user } = useUserStore();
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socketToSendMessage();
    getMessages();
    return () => socketOffInConversation();
  }, [
    getMessages,
    userConversation?._id,
    socketToSendMessage,
    socketOffInConversation,
  ]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (chatLoading) {
    return (
      <div className="h-[85vh] overflow-y-auto">
        <ChatHeader />
        <ChatSkeleton />
      </div>
    );
  }
  return (
    <div>
      <ChatHeader />
      <div className="h-[65vh] overflow-y-auto sidebar ">
        <div>
          {messages?.map((msg) => {
            return (
              <>
                <div
                  key={msg._id}
                  className={`chat ${
                    user?._id === msg.senderId ? "chat-end" : "chat-start"
                  } `}
                  ref={messageRef}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                          msg?.senderId === user?._id
                            ? user?.profileImage || "/avatar.png"
                            : userConversation?.profileImage || "/avatar.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-bubble space-y-2">
                    <p className="text-xs text-primary opacity-50">
                      {msg?.createdAt
                        ? new Date(msg.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : ""}
                    </p>{" "}
                    {msg?.image && (
                      <img
                        src={msg.image}
                        className="rounded-md object-cover h-[150px]"
                        alt=""
                      />
                    )}
                    {msg?.text && <p>{msg.text}</p>}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <ChatInput />
    </div>
  );
};

export default Chat;
