"use client";

import { SUPPORTED_TOKENS, TokenDetails } from "@/utils/tokens";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Swap({ publicKey }: { publicKey: string }) {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);

  return (
    <div className="flex flex-col border-2 border-gray-300 p-4 rounded-lg gap-4">
      <SwapInputRow
        onSelect={(asset) => {
          setBaseAsset(asset);
        }}
        selectedToken={baseAsset}
        title="You pay:"
      />
      <SwapInputRow
        onSelect={(asset) => {
          setQuoteAsset(asset);
        }}
        selectedToken={quoteAsset}
        title="You receive:"
      />
    </div>
  );
}

function SwapInputRow({
  onSelect,
  selectedToken,
  title,
}: {
  onSelect: (asset: TokenDetails) => void;
  selectedToken: TokenDetails;
  title: string;
}) {
  return (
    <div className=" ">
      <div className=" text-xs text-slate-700 font-semibold pb-3">{title}</div>
      <div className="flex  justify-between">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a token" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tokens</SelectLabel>

              {SUPPORTED_TOKENS.map((token) => (
                <SelectItem key={token.name} value={token.name}>
                  <div className="flex gap-3 ">
                    {" "}
                    <img src={token.image} className="w-6" /> {token.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
      </div>
    </div>
  );
}
