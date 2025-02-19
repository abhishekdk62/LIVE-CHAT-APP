import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("convos:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((convo,idx) => (
        <Conversation
          key={convo._id}
          conversation={convo}
		  lastIdx={idx===conversations.length-1}
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};
export default Conversations;
