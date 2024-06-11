import React from "react";
import { CurrencyFlag } from "../..";

export interface NativeCurrencyFieldDisabledInterface {
	nativeCurrency?: string;
}

const NativeCurrencyFieldDisabled: React.FC<
	NativeCurrencyFieldDisabledInterface
> = ({ nativeCurrency = "INR" }) => {
	return (
		<div className="flex p-4 rounded-xl w-full gap-x-3 bg-gray-100">
			<CurrencyFlag currency={nativeCurrency} disabled />
			<label className="font-inter text-base leading-6 text-color-black-4">
				{nativeCurrency}
			</label>
		</div>
	);
};

export default NativeCurrencyFieldDisabled;
