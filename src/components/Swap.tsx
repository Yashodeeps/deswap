"use client";

import { SUPPORTED_TOKENS, TokenDetails } from "@/utils/tokens";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowDownUp } from "lucide-react";

export function Swap({ publicKey }: { publicKey: string }) {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);

  const handleSwap = useCallback(() => {
    console.log("Before swap - baseAsset:", baseAsset);
    console.log("Before swap - quoteAsset:", quoteAsset);

    setBaseAsset((prevBaseAsset) => {
      console.log("New baseAsset:", quoteAsset);
      return quoteAsset;
    });

    setQuoteAsset((prevQuoteAsset) => {
      console.log("New quoteAsset:", baseAsset);
      return baseAsset;
    });
  }, [baseAsset, quoteAsset]);

  return (
    <div className="flex flex-col border-2 border-gray-300 p-4 rounded-lg gap-8">
      <SwapInputRow
        onSelect={(asset) => {
          setBaseAsset(asset);
        }}
        selectedToken={baseAsset}
        title="You pay:"
      />
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center z-20">
          <div
            onClick={() => {
              handleSwap();
              console.log("swap");
            }}
            className="cursor-pointer rounded-full w-10 h-10 border bg-white z-10 flex justify-center items-center "
          >
            {" "}
            <ArrowDownUp />
          </div>
        </div>
        <Separator className=" z-10" />
      </div>
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
        <Select
          onValueChange={(value) => {
            const selectedToken = SUPPORTED_TOKENS.find(
              (token) => token.name === value
            );
            if (selectedToken) {
              onSelect(selectedToken);
            }
          }}
        >
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
