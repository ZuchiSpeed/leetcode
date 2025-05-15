import { auth } from "@/firebase/firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

type Props = {};

const Logout: React.FC<Props> = () => {
  const [signOut, loading, error] = useSignOut(auth);

  // Function to handle logout
  const handleLogout = () => {
    // Add your logout logic here
    signOut();

    toast.success("User logged out");
  };

  return (
    <button className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange" onClick={handleLogout}>
      <FiLogOut />
    </button>
  );
};

export default Logout;
