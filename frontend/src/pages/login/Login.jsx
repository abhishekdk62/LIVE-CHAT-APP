import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState(""); // Set initial state to empty string
  const [password, setPassword] = useState(""); // Set initial state to empty string
  const [error, setError] = useState(""); // Add error state to hold error messages
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await login(username, password);
      // Assuming login handles token storage or other success actions
      setError(""); // Reset error message on success
    } catch (err) {
      setError(err.message); // Set error message if login fails
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {" "}
          {/* Use onSubmit instead of button onClick */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm text-gray-300 hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <span className="loading loading-spinner"></span> // Show spinner when loading
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 mt-2 text-center">
            {/* Show error message */}
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
