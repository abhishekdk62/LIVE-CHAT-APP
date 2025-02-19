import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInput({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      //!set user to localstorage
      //!contextF

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success("Signed up successfully!");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignUp;

function handleInput({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !userName || !confirmPassword || !password || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords doesnt match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be atleast 6 charecters");
    return false;
  }
  return true;
}
