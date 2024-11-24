import { MessageSquare } from "lucide-react";
import Chat from "./Chat";
import { useChatStore } from "../../Store/useChatStore";
// import { useChatStore } from "../../Store/useChatStore";

const Conversation = () => {
  const { userConversation } = useChatStore();

  return (
    <div className="">
      {!userConversation ? (
        <div className="h-full flex flex-col items-center justify-center">
          <MessageSquare className="size-14 rounded-md bg-base-200/50  p-2 animate-bounce" />
          <div className="mt-3 text-center space-y-3 ">
            <h1 className="text-lg font-bold text-primary">
              Welcome To EchoChat 😊
            </h1>
            <p className=" text-sm text-center">
              Welcome to EchoChat where connections come alive. Start your next
              great conversation today!
            </p>
          </div>
        </div>
      ) : (
        <Chat />
      )}
    </div>
  );
};

export default Conversation;
