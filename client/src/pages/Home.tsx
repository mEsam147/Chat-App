import { Users } from "lucide-react";
import Conversation from "../components/home/Conversation";
import Sidebar from "../components/home/Sidebar";
import { useChatStore } from "../Store/useChatStore";
import { useEffect } from "react";

const Home = () => {
  const { getChatUsers } = useChatStore();
  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  return (
    <div className="container mx-auto p-4 bg-base-100 grid grid-cols-12 h-[90vh] my-1 rounded-lg">
      {" "}
      <div className="grid col-span-1  md:col-span-3 border-r border-secondary ">
        <div className="flex items-center gap-x-2 text-primary text-center">
          <Users />
          <p className="text-lg font-bold hidden md:block">Contacts</p>
        </div>
        <div className="overflow-y-auto sidebar h-[82vh] ">
          <Sidebar />
        </div>
      </div>
      <div className="grid md:col-span-9 col-span-11">
        <Conversation />
      </div>
    </div>
  );
};

export default Home;
