"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex gap-5 flex-col justify-center items-center">
      <div className="text-5xl text-center font-semibold">
        The Indian Exchange for your{" "}
        <span className="text-blue-700">Crypto</span>{" "}
      </div>
      <div className="text-gray-500">
        create a wallet with justa a google account
      </div>
      {session.data?.user ? (
        <Button
          variant={"secondary"}
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Go to the dashboard
        </Button>
      ) : (
        <Button
          variant={"default"}
          onClick={() => {
            signIn("google");
          }}
        >
          Login with Google
        </Button>
      )}
    </div>
  );
};

export default Hero;
