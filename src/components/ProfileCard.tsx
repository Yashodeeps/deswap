"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const ProfileCard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return (
      <div className="flex flex-col items-center w-full justify-center pt-16 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className=" flex  justify-center mt-16 ">
      <div className="w-1/2 rounded-lg shadow-lg p-4">
        {" "}
        <h1 className=" text-3xl text-gray-600 font-semibold">
          Welcome {session.data?.user?.name}!
        </h1>
        <Assets publicKey={publicKey} />
      </div>
    </div>
  );
};

function Assets({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  return (
    <div className="text-gray-400 mt-4">
      {" "}
      <div className="">Account assets</div>
      <div className="flex justify-between">
        <div></div>

        <div>
          <Button
            variant={"secondary"}
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              setCopied(true);
            }}
          >
            {copied ? "Copied" : "Your wallet adress"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
