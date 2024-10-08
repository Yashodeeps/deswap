"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useTokens } from "@/hooks/useTokens";
import { json } from "stream/consumers";
import { TokenList } from "./TokenList";
import { Separator } from "./ui/separator";
import { Swap } from "./Swap";

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
  const { tokenBalances, loading } = useTokens(publicKey);
  const [activeTab, setActiveTab] = useState<Tab>("tokens");

  type Tab = "tokens" | "send" | "withdraw" | "swap" | "add";

  const tabs: Tab[] = ["tokens", "send", "withdraw", "swap", "add"];

  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  if (loading) {
    return (
      <div className="space-y-2 py-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }
  return (
    <div className="text-gray-400 mt-4">
      {" "}
      <div className="">Account assets</div>
      <div className="flex justify-between py-2 max-md:flex-wrap max-md:gap-3">
        <div className="flex gap-2 items-end">
          <div className="text-4xl text-black font-bold flex gap-5 justify-center items-center">
            ${tokenBalances?.totalBalance.toFixed(2)}
          </div>
          <div className="text-xl text-gray-600 font-semibold">USD</div>
        </div>
        <div className="text-black">
          <Button
            variant={"outline"}
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              setCopied(true);
            }}
          >
            {copied ? "Copied" : "Your wallet adress"}
          </Button>
        </div>
      </div>
      <div className="flex justify-between gap-3 py-2 text-black max-md:flex-wrap ">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : `outline`}
            className={`w-full  ${activeTab !== tab && "bg-gray-200"} `}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
      <Separator className="my-4" />
      <div className={activeTab === "tokens" ? "block" : "hidden"}>
        <TokenList tokens={tokenBalances?.tokens || []} />
      </div>
      <div className={activeTab === "swap" ? "block" : "hidden"}>
        <Swap publicKey={publicKey} />
      </div>
    </div>
  );
}

export default ProfileCard;
