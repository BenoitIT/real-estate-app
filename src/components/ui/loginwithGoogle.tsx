"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "./button";
import { FaGoogle } from "react-icons/fa";
function SignInWithGoogle() {
  const handleClick = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleClick}>
      <FaGoogle />
      <span>Signin with Google</span>
    </Button>
  );
}

export default SignInWithGoogle;
