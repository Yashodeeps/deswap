"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const Appbar = () => {
  const session = useSession();
  return (
    <div className="flex justify-between p-4 border-b-2 border-gray-200">
      <div className="text-lg font-bold px-2">DeSwap</div>
      {session.data?.user ? (
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => {
            signIn();
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Appbar;
