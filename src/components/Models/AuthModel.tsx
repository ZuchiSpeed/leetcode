import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import SignUp from "./SignUp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ResetPassword from "./ResetPassword";
import { authModalState } from "@/atoms/authModelAtoms";

type AuthModalProps = {};

const AuthModel: React.FC<AuthModalProps> = () => {
  // Gets current auth modal state (isOpen, type) from Recoil
  const authModel = useRecoilValue(authModalState);
  // Uses custom hook to get the closeModel function
  const closeModel = useCloseModel();

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={closeModel} // Clicking the backdrop triggers modal close
      ></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={closeModel} // Clicking the close button triggers modal close
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>

            {/* Conditional Rendering Based on Modal Type */}
            {authModel.type === "login" ? (
              <Login />
            ) : authModel.type === "register" ? (
              <SignUp />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModel;

//Custom Hook to handle the click event and close the modal
function useCloseModel() {
  const setAuthModel = useSetRecoilState(authModalState);

  // Clean function to close modal and reset type to "login"
  const closeModel = () => {
    setAuthModel((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  // Listens for Escape key press to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []); // Empty dependency array ensures effect runs only once

  return closeModel;
}
