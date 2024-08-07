import { NextRequest } from "next/server";
import { getAssociatedTokenAddress } from "@solana/spl-token";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("address");
}
