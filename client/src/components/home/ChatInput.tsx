import { Images, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../../Store/useChatStore";

const ChatInput = () => {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChatStore();
const handleSendMessage = () => {
  if (text.trim() || image) {
    sendMessage({ text: text.trim(), image: image as string | undefined });
    setText("");
    setImage(null);
    if (imageRef.current) {
      imageRef.current.value = "";
      imageRef.current.files = null;
    }
  } else {
    alert("Please enter a message or select an image");
  }
};
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          setImage(imageDataUrl);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file");
      }
    } else {
      alert("No file selected");
    }
  };

  return (
    <div className="relative">
      <div className="absolute -top-[70px] left-0">
        {image && (
          <div className="relative inline-block">
            <img
              src={image}
              className="size-16 rounded-sm object-cover ml-4 relative"
              alt="Selected Image"
            />
            <X
              className="size-4 bg-secondary text-primary rounded-full absolute top-1 right-0  cursor-pointer hover:bg-primary hover:text-secondary"
              onClick={() => {
                setImage(null);
                if (imageRef.current) {
                  imageRef.current.value = "";
                  imageRef.current.files = null;
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center w-full gap-x-1 px-1">
        <input
          type="text"
          className="w-full input input-sm sm:input-md rounded-none rounded-r-md input-bordered"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center gap-x-2">
          <input
            type="file"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />
          <button
            className="btn  cursor-pointer hover:text-secondary
        
        transition-all duration-150
        "
            onClick={() => imageRef.current?.click()}
          >
            <Images />
          </button>
          <button
            className="btn text-primary btn-secondary rounded-none rounded-r-md"
            disabled={!text.trim() && !image}
            onClick={handleSendMessage}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
