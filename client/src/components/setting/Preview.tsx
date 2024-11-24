import { Send } from "lucide-react";

type Preview = {
  id: number;
  title: string;
  timestamp: string;
};
const Preview = () => {
  const previewList: Preview[] = [
    {
      id: 1,
      title: "Hi John Doe! How are you doing today?",
      timestamp: "2024",
    },
    {
      id: 2,
      title: "Hey! I'm doing well, thanks for asking. How about you?",
      timestamp: "2024",
    },
  ];
  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold text-primary">Preview</h1>
      <div className="bg-primary/5 w-full rounded-md py-3 mt-10">
        <div className="w-1/2 mx-auto bg-primary rounded-md ">
          <div className="flex items-center px-4 gap-x-2 border-b py-2 border-secondary/50">
            <div className="size-12 rounded-full font-bold text-lg uppercase bg-base-100 flex items-center justify-center text-primary">
              J
            </div>
            <div className="flex flex-col gap-y-1">
              <span className=" text-base-100 font-bold">John Doe</span>
              <span className="text-sm text-base-100/50 capitalize">online</span>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {previewList.map((preview, index) => (
              <div
                key={preview.id}
                className={`w-auto p-3 rounded-lg flex flex-col ${
                  index === 0
                    ? "justify-start items-start"
                    : "justify-end items-end"
                }`}
              >
                <div className="bg-base-200 py-3 px-6 rounded-lg">
                  <p className="text-primary font-semibold text-sm">
                    {preview.title}
                  </p>
                  <span className="text-xs text-primary-20 mt-2">
                    {preview.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div className="w-full flex items-center ">
              <input
                type="text"
                value={"this is a Preview"}
                disabled
                className="input input-bordered   rounded-none w-full "
              />
              <button className="btn btn-secondary rounded-none rounded-r-md">
                <Send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
