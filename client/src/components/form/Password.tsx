import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { FormData } from "../../types/FormData";

type Data = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
const Password = ({ formData, setFormData }: Data) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="my-4 relative flex flex-col gap-y-3">
      <label
        htmlFor="password"
        className="text-sm text-left text-yellow-500/60"
      >
        Password
      </label>
      <div className="relative">
        <input
          type={!showPassword ? "password" : "text"}
          name="password"
          id="password"
          className="input input-bordered w-full pl-10 "
          placeholder="***********"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Lock className="absolute left-2 size-4 md:size-5 top-1/2  -translate-y-1/2 text-yellow-500/40" />
        <span
          className="absolute right-2 text-yellow-700 cursor-pointer top-1/2 -translate-y-1/2 "
          onClick={() => togglePasswordVisibility()}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </span>
      </div>
    </div>
  );
};

export default Password;
