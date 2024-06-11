import React from "react";
import { ArrowIcon } from "icons";
import { CurrencyPairFlags } from "components";

interface CurrencyPairIconWithTextProps {
	pair: string;
}
const CurrencyPairIconWithText: React.FC<CurrencyPairIconWithTextProps> = ({
	pair,
}) => {
	return (
		<div className="flex flex-row items-center justify-center">
			<div className="pr-3 flex items-center font-bold leading-6 -tracking-[0.3px] text-base">
				{`${pair.split("/")[0]}`}
				<ArrowIcon className="mx-1" />
				{`${pair.split("/")[1]} `}
				<CurrencyPairFlags className="ml-2" flagpair={pair} />
			</div>
		</div>
	);
};

export default CurrencyPairIconWithText;
