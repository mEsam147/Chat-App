import { Mail } from "lucide-react";
import { FormData } from "../../types/FormData";
type Data = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
const Email = ({ formData, setFormData }: Data) => {
  return (
    <div className="my-4 relative flex flex-col gap-y-3">
      <label htmlFor="email" className="text-sm text-left text-yellow-500/60">
        Email
      </label>
      <div className="relative">
        <input
          type="text"
          name="fullname"
          id="fullname"
          className="input input-bordered w-full pl-10 "
          placeholder="Jhon@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Mail className="absolute left-2 top-1/2  -translate-y-1/2 text-yellow-500/40  size-4 md:size-5 " />
      </div>
    </div>
  );
};

export default Email;
