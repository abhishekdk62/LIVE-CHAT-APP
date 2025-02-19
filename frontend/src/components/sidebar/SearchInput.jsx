import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations = [] } = useGetConversations(); // Default empty array to avoid errors

  function handleSubmit(e) {
    e.preventDefault();
    if (!search.trim()) return; // Prevent empty search
    if (search.length < 3) {
      return toast.error("Search term too short");
    }

    const conversation = conversations.find((c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) // Added optional chaining to avoid errors
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such results found");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
