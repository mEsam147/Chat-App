import { useChatStore } from "../../Store/useChatStore";
import { useUserStore } from "../../Store/UseUserStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { usersOnline } = useUserStore();
  const { user, loading, setUserConversation, userConversation } =
    useChatStore();
  
  console.log(typeof usersOnline);
  

  return (
    <div className="h-full ">
      <div className="py-6">
        {loading && <SidebarSkeleton />}
        <div className="space-y-5">
          {!loading &&
            user?.map((item) => {
              return (
                <div
                  key={item?._id}
                  className={`flex items-center gap-x-3  ${
                    userConversation?._id === item?._id
                      ? "bg-base-300 ring-1 ring-primary/30"
                      : ""
                  }  py-1 px-2 hover:bg-base-200 transition-all duration-150 cursor-pointer rounded-l-full`}
                  onClick={() => setUserConversation(item)}
                >
                  <div className="relative">
                    <img
                      src={item.profileImage || "/avatar.png"}
                      className={`md:size-12 block   object-cover rounded-full shadow relative ${
                        userConversation?._id === item?._id
                          ? "scale-105 shadow-xs shadow-primary/30 transition-all duration-200  block "
                          : ""
                      }`}
                      alt=""
                    />
                    {usersOnline.includes(item?._id as string) && (
                      <span className="absolute top-0 right-0 bg-orange-300 size-4 rounded-full" />
                    )}
                  </div>
                  <div className="flex flex-col gap-y-0.5">
                    <p className="text-primary font-bold hidden md:block">
                      {item.fullname}
                    </p>
                    <span
                      className={`text-sm hidden md:block ${
                        usersOnline.includes(item._id as string)
                          ? "text-green-500 font-bold"
                          : "text-red-500"
                      }`}
                    >
                      {usersOnline.includes(item._id as string)
                        ? "online"
                        : "offline"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
