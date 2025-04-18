import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import AuthModel from "@/components/Models/AuthModel";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { authModalState } from "@/atoms/authModelAtoms";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  // Get the authModel state from Recoil
  // This state is used to control the visibility and type of the authentication modal (login, signup, etc.)
  const authModel = useRecoilValue(authModalState);

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl max-auto">
        <Navbar />

        <div className="flex items-center justify-center pointer-events-none h-[calc(100vh-5rem)] select-none">
          <Image src="/hero.png" alt="Hero Img" width={700} height={700} />
        </div>
        {/* if authModel.isOpen is true open Authentication form */}
        {authModel.isOpen && <AuthModel />}
      </div>
    </div>
  );
};

export default AuthPage;
