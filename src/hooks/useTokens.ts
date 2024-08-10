import { TokenDetails } from "@/utils/tokens";
import axios from "axios";
import { useEffect, useState } from "react";

export interface TokenWithBalance extends TokenDetails {
  balance: string;
  usdBalance: string;
}

export function useTokens(address: string) {
  const [tokenBalances, setTokenBalances] = useState<{
    tokens: TokenWithBalance[];
    totalBalance: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchTokenBalance() {
    const response = await axios.get(`/api/tokens?address=${address}`);
    setTokenBalances(response.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchTokenBalance();
  }, []);

  return {
    tokenBalances,
    loading,
  };
}
