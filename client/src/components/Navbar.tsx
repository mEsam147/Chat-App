import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useUserStore } from "../Store/UseUserStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="shadow bg-base-100 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            className="flex items-center gap-x-3 p-3 group transition-all duration-150"
          >
            <MessageSquare className="size-9 p-2   flex items-center justify-center bg-yellow-500/20 text-primary rounded-md group-hover:scale-105" />
            <p className="text-primary group-hover:text-secondary ">Chat App</p>
          </Link>
          <div className="flex items-center gap-x-3">
            <Link to={"/setting"} className="flex items-center gap-x-2 group">
              <Settings className="text-primary group-hover:text-secondary" />
              <p className="text-primary group-hover:text-secondary  font-semibold text-sm hidden md:block">
                Settings
              </p>
            </Link>
            {user && (
              <>
                <Link
                  to={"/profile"}
                  className="flex items-center gap-x-2 group"
                >
                  <User className="text-primary group-hover:text-secondary" />
                  <p className="text-primary group-hover:text-secondary font-semibold text-sm hidden md:block">
                    Profile
                  </p>
                </Link>
                <div
                  className="flex items-center gap-x-2 cursor-pointer group"
                  onClick={handleLogout}
                >
                  <LogOut className="text-primary group-hover:text-secondary  transition-all duration-100" />
                  <p className="text-primary group-hover:text-secondary  font-semibold text-sm hidden md:block">
                    Logout
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
