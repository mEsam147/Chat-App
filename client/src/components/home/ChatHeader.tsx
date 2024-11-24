import { X } from "lucide-react";
import { useChatStore } from "../../Store/useChatStore";
import { useUserStore } from "../../Store/UseUserStore";

const ChatHeader = () => {
  const { userConversation, setUserConversation } = useChatStore();
  const { usersOnline } = useUserStore();

  return (
    <div className="flex items-center justify-between border-b py-2 border-secondary">
      <div className="flex items-center gap-x-2 px-4">
        <img
          src={
            userConversation?.profileImage
              ? userConversation?.profileImage
              : "/avatar.png"
          }
          className="size-12 object-cover rounded-full"
          alt=""
        />
        <div className="flex flex-col">
          <h1 className="text-primary font-bold">
            {userConversation?.fullname}
          </h1>
          <p className="text-sm">
            {usersOnline.includes(userConversation?._id as string) ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span className="text-red-500">Offline</span>
            )}{" "}
          </p>
        </div>
      </div>
      <X
        className="text-primary hover:text-secondary transition-all duration-150 cursor-pointer"
        onClick={() => setUserConversation(null)}
      />
    </div>
  );
};

export default ChatHeader;
