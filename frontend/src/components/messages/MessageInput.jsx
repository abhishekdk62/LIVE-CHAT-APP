import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState(""); // Fixed default state
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form refresh
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage(""); // Clear input after sending
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className="relative w-full"> {/* Added relative class */}
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center"
          disabled={loading} // Prevents multiple clicks
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend size={18} className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
