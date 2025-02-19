import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message?.senderId === authUser._id;
  const chatClassname = fromMe ? "chat-end" : "chat-start";
  const formatedTime=extractTime(message.createdAt)
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500"; // Added default bg for received messages

 const ShakeClass=message.shouldShake?"shake":""
  

  return (
    <div className={`chat ${chatClassname}`}>
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>

      <div className={`chat-bubble ${ShakeClass} text-white ${bubbleBgColor}`}>
        {message?.message || "No message"} {/* Added a fallback */}
      </div>

      <div className="chat-footer opacity-50 text-xs">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
