import { TokenWithBalance } from "@/hooks/useTokens";
import { Separator } from "./ui/separator";

export function TokenList({ tokens }: { tokens: TokenWithBalance[] }) {
  return (
    <div className="py-2">
      <Separator className="my-4" />

      {tokens.map((t) => (
        <TokenRow key={t.name} token={t} />
      ))}
    </div>
  );
}

function TokenRow({ token }: { token: TokenWithBalance }) {
  return (
    <div className="flex justify-between ">
      <div className="flex">
        <div>
          <img src={token.image} className="h-10 w-10 p-1 rounded-full mr-2" />
        </div>
        <div className="text-sm">
          <div className="font-bold">{token.name}</div>
          <div className="font-slim">
            1 {token.name} = ~${token.price}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="font-bold flex justify-end">{token.usdBalance}</div>
          <div className="font-slim flex justify-end">{token.balance}</div>
        </div>
      </div>
    </div>
  );
}
