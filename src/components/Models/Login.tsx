import { authModalState } from "@/atoms/authModelAtoms";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  // Sets the authentication modal state using Recoil state management
  const setAuthModelState = useSetRecoilState(authModalState);
  // Handles changing the auth modal type (login, register, forgotPassword)
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    // Updates the auth modal state while preserving other existing state properties
    setAuthModelState((prev) => ({ ...prev, type }));
  };

  // Manages form input state for email and password
  const [inputs, setInputs] = useState({ email: "", password: "" });
  // Firebase authentication hook for email/password sign-in
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // Next.js router for page navigation
  const router = useRouter();

  // Handles changes to form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates the specific input field while preserving others
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return toast.error("Please complete all fields", {position: "top-center", autoClose: 5000});
    }

    try {
      // Attempts to sign in with provided credentials
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser) return;
      // On successful login, redirect to home page
      router.push("/");
    } catch (error: any) {
      // Displays any authentication errors to the user
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    //Login Form
    <form
      action="submit"
      className="space-y-6 px-6 pb-4"
      onSubmit={handleLogin}
    >
      <h3 className="text-xl font-medium text-white">Sign In To LeetCode</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Password
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="*******"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            "
        onClick={() => handleClick("login")}
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick("forgotPassword")}
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-300">
        Not Registered?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default Login;
