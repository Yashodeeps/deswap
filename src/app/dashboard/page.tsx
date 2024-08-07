import ProfileCard from "@/components/ProfileCard";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/authConfig";
import db from "@/db/index";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { error } from "console";

async function getUserWallet() {
  const session = await getServerSession(authConfig);

  console.log("session");
  const userWallet = await db.solWallet.findFirst({
    where: {
      userId: session?.user?.id,
    },
    select: {
      publicKey: true,
    },
  });

  if (!userWallet) {
    return {
      error: "No solana wallet associated to the user",
    };
  }

  return { error: null, userWallet };
}

const page = async () => {
  const userWallet = await getUserWallet();

  if (userWallet.error || !userWallet.userWallet?.publicKey) {
    return <>No solana wallet found</>;
  }

  return (
    <div>
      <ProfileCard publicKey={userWallet.userWallet?.publicKey} />
    </div>
  );
};

export default page;
