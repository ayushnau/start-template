import React from "react";
import { formatNumberWithCommas } from "utils";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { twMerge } from "tailwind-merge";

type StateTypes = "gaining" | "losing" | "profit" | "loss" | "zero";

export interface MTMLabelInterface {
	currency: string;
	amount: string;
	state: StateTypes;
}

const MTMLabel: React.FC<MTMLabelInterface> = ({ currency, amount, state }) => {
	const TagStyles = {
		gaining: "text-mountain-meadow-2",
		losing: "text-sunset-orange-2",
		profit: "",
		loss: "",
		zero: "text-mine-shaft-4",
	};

	const getSymbol = (state: StateTypes): string => {
		if (state === "gaining" || state === "profit") {
			return "+";
		} else if (state === "zero") {
			return "";
		} else {
			return "-";
		}
	};

	return (
		<label
			className={twMerge(
				"w-fit font-inter text-sm leading-[22px]",
				TagStyles[state],
			)}
		>
			{`${getSymbol(state)}${getCurrencySymbol(
				currency,
			)}${formatNumberWithCommas(amount)}`}
		</label>
	);
};

export default MTMLabel;
