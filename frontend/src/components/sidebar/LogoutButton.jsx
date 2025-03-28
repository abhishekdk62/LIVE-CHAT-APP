import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout} // Corrected to onClick
        />
      ) : (
        <span className="loading loading-spinner"></span> // Corrected the class name
      )}
    </div>
  );
};

export default LogoutButton;
