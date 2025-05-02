import { authModalState } from "@/atoms/authModelAtoms";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";

type LoginProps = {};

const SignUp: React.FC<LoginProps> = () => {
  const router = useRouter();

  // Recoil state management for auth modal
  // Used to switch between login/signup views
  const setAuthModelState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModelState((prev) => ({ ...prev, type: "login" }));
  };

  // Local state for form inputs
  // Stores email, displayName, and password values
  // This state is used to manage the form data before submission
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  //react firebase hooks for authentication
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Function to handle input changes
  // Updates the corresponding input field in the state
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  // Prevents default form submission behavior and logs the inputs to the console
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert("Please fill all the fields");

    try {
      //create a new user with email and password
      // This function is provided by react-firebase-hooks
      const newUser = createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      //redirect to home page after successful registration
      router.push("/");

      // if user does not exist, return null
      if (!newUser) return;
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    //SIGN UP Form
    <form className="space-y-6 px-6 pb-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
      {/* Email Input Field */}
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          onChange={handleChangeInput}
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

      {/* Display Name Input Field */}
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          id="displayName"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder="John Doe"
        />
      </div>

      {/* Password Input Field */}
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          onChange={handleChangeInput}
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

      {/* Submit Button to Register a user */}
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        "
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* Switch to Login Link */}
      <div className="text-sm font-medium text-gray-300">
        Already have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => {
            handleClick;
          }}
        >
          Log In
        </a>
      </div>
    </form>
  );
};

export default SignUp;
