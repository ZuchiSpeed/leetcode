import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import AuthModel from "@/components/Models/AuthModel";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { authModalState } from "@/atoms/authModelAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  // Get the authModel state from Recoil
  // This state is used to control the visibility and type of the authentication modal (login, signup, etc.)
  const authModel = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth); // Get the current user state from Firebase authentication
  const router = useRouter(); // Initialize the Next.js router
  const [pageLoading, setPageLoading] = useState(true);

  //if user is logged in, redirect to home page
  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect to home page if user is logged in
    }
    if (!loading && !user) return setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

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
