import { Camera, Loader2, Mail, User } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useUserStore } from "../Store/UseUserStore";
import { FormData } from "../types/FormData";
import moment from "moment";

const Profile = () => {
  const { user, updateProfile, isUpdate } = useUserStore();
const [formData, setFormData] = useState<FormData>({
  fullname: user?.fullname,
  profileImage: user?.profileImage,
});

const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      setFormData((prevFormData) => ({ ...prevFormData, profileImage: imageDataUrl }));
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  if (formData.fullname && formData.profileImage) {
    updateProfile(formData);
  } else {
    alert("Please fill in all fields");
  }
};

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="bg-base-200  mx-auto py-4 rounded-md sm:w-1/2 w-full">
        <div className="flex flex-col justify-center items-center ">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold  text-primary uppercase">Profile</h1>
            <p className="text-sm capitalize text-primary/40">
              Your Profile Information
            </p>
          </div>
          <div className="relative my-2">
            <img
              src={
                formData.profileImage ? formData.profileImage : "/avatar.png"
              }
              className="size-32 rounded-full border border-gray-100 relative shadow-lg object-cover"
              alt=""
            />
            <label className="absolute bottom-1 right-0">
              <Camera className="size-8 p-1 bg-base-100 flex items-center justify-center text-primary rounded-full cursor-pointer hover:bg-base-300 hover:scale-105 transition-all duration-100" />
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>
          <p className="text-secondary text-xs my-1">
            Click The Camera ICon To Upload Your Photo
          </p>
        </div>
        <div className="my-3 px-10">
          <div className="mb-4 space-y-2">
            <label htmlFor="fullname" className="flex items-center gap-x-1">
              <User className="size-4" />
              <p className="text-xs text-secondary">Full Name</p>
            </label>
            <input
              type="text"
              className="input input-bordered input-sm w-full border border-gray-400 text-sm text-primary"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </div>
          <div className="mb-4 space-y-2">
            <label htmlFor="fullname" className="flex items-center gap-x-1">
              <Mail className="size-4" />
              <p className="text-xs text-secondary">Email</p>
            </label>
            <input
              type="text"
              className="input input-bordered input-sm w-full border border-gray-100 text-sm"
              disabled
              value={user?.email}
            />
          </div>

          <button
            className="block w-full btn  btn-primary"
            onClick={handleSubmit}
            disabled={isUpdate}
          >
            {isUpdate ? <Loader2 className="animate-spin size-6 mx-auto text-primary" /> : "Update"}
          </button>
        </div>
        <div className="px-10 py-3">
          <h1 className="text-lg text-primary font-semibold capitalize">
            Account Information
          </h1>
          <div className="flex items-center justify-between border-b border-gray-500/50 my-4 py-3">
            <p className="text-sm font-bold text-secondary ">Member Since</p>
            <p className="text-sm font-bold primary">
              <p className="text-sm font-bold text-primary">
                {user?.createdAt
                  ? moment(user.createdAt).format("MMMM Do YYYY")
                  : "N/A"}
              </p>
            </p>
          </div>
          <div className="flex items-center justify-between  border-gray-500/50 my-4 py-3">
            <p className="text-sm font-bold text-secondary ">
              Account Status
            </p>
            <p className="text-sm font-bold text-primary ">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
