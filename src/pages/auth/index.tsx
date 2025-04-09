import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import AuthModel from "@/components/Models/AuthModel";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl max-auto">
        <Navbar />

        <div className="flex items-center justify-center pointer-events-none h-[calc(100vh-5rem)] select-none">
          <img src="/hero.png" alt="Hero Img" />
        </div>
        <AuthModel />
      </div>
    </div>
  );
};

export default AuthPage;
