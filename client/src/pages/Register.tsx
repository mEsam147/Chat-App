import { Loader2, MessageSquare } from "lucide-react";
import RightAuthSection from "../components/RightAuthSection";
import Fullname from "../components/form/Fullname";
import Email from "../components/form/Email";
import Password from "../components/form/Password";
import { useState } from "react";
import { FormData } from "../types/FormData";
import { useUserStore } from "../Store/UseUserStore";
import { Link } from "react-router-dom";

const Register = () => {
  const data: FormData = {
    fullname: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(data);

  const { register, registerLoading } = useUserStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({ ...formData });
  };
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="flex-1 text-center  ">
        <div>
          <p className="bg-red-600/30 w-12 h-12 flex items-center justify-center rounded-md mx-auto my-2  ">
            <MessageSquare className="size-7" />
          </p>
          <span className="text-xl font-bold block my-2">Create Account</span>
          <span className="text-sm text-secondary block">
            Get Started With Your Free Account
          </span>
        </div>
        <form className="max-w-[70%] mx-auto" onSubmit={handleSubmit}>
          <Fullname formData={formData} setFormData={setFormData} />
          <Email formData={formData} setFormData={setFormData} />

          <Password formData={formData} setFormData={setFormData} />

          <button
            type="submit"
            className="btn block w-full text-center btn-primary  "
            disabled={registerLoading}
          >
            {registerLoading ? (
              <Loader2 className=" animate-spin  size-7 mx-auto " />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="flex items-center justify-center">
          <p>Already Have an Account?</p>
          <Link to={"/login"} className="btn btn-link px-1 text-yellow-500/80">
            Login
          </Link>
        </div>
      </div>
      <div className="flex-1 text-center hidden lg:block ">
        <RightAuthSection
          title="join our community"
          content="connect with friends,share Moments,and Stay In Touch with you "
        />
      </div>
    </div>
  );
};

export default Register;
