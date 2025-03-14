import React, { useState } from "react";
import { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {};
  const removeImage = (e) => {};
  const handleSendMessage = async (e) => {};
  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="flex items-center mb-3 gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 rounded-lg object-cover border border-zinc-700"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3"></X>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input type="file" accept="image/*" ref={fileInputRef} className="hidden"/>
          <button type="button" className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500": "text-zinc-400"}`} onClick={()=>fileInputRef.current?.click()}>
            <Image size={20}/>
          </button>
        </div>

        <button className="btn-sm btn  btn-circle" disabled={!text.trim() && !imagePreview}>
          <Send size={22}/>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
