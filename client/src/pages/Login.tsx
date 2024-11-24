import { Loader2, MessageSquare } from "lucide-react";
import RightAuthSection from "../components/RightAuthSection";
import Email from "../components/form/Email";
import Password from "../components/form/Password";
import { useState } from "react";
import { FormData } from "../types/FormData";
import { useUserStore } from "../Store/UseUserStore";
import { Link } from "react-router-dom";

const Login = () => {
  const data: FormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(data);

  const { login, loginLoading } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ ...formData });
  };
  return (
    <div className="flex justify-center items-center min-h-[88vh]">
      <div className="flex-1 text-center  ">
        <div>
          <p className="bg-red-600/30 w-12 h-12 flex items-center justify-center rounded-md mx-auto my-2  ">
            <MessageSquare className="size-7" />
          </p>
          <span className="text-xl font-bold block my-2">Welcome Back</span>
          <span className="text-sm text-secondary block">
            signin in to your account
          </span>
        </div>
        <form className="max-w-[70%] mx-auto" onSubmit={handleSubmit}>
          <Email formData={formData} setFormData={setFormData} />

          <Password formData={formData} setFormData={setFormData} />

          <button
            type="submit"
            className="btn block btn-primary w-full text-center  "
            disabled={loginLoading}
          >
            {loginLoading ? (
              <Loader2 className=" animate-spin  size-7 mx-auto " />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <Link
          to={"/register"}
          className="my-3 flex items-center  justify-center"
        >
          <span className="text-sm">Don't have an Account?</span>
          <button className="btn btn-link text-yellow-400/40 px-1">
            Create Account
          </button>
        </Link>
      </div>
      <div className="flex-1 text-center hidden lg:block ">
        <RightAuthSection
          title="Welcome Back!"
          content="Sign in To Continue Your Conversations and catch up with Your messages. "
        />
      </div>
    </div>
  );
};

export default Login;
