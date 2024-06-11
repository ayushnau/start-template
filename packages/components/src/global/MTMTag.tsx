import React from "react";
import { formatNumberWithCommas } from "utils";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { twMerge } from "tailwind-merge";
import { IIcon } from "icons";

export interface MTMTagInterface {
	className?: string;
	currency: string;
	amount: string;
	state: "gaining" | "losing" | "profit" | "loss" | "zero";
	endLabel?: string;
	margin?: string;
	showInfoIcon?: boolean;
	infoIconCallback?: () => void;
	dontFormatNumber?: boolean;
	noFloat?: boolean;
}

const MTMTag: React.FC<MTMTagInterface> = ({
	className,
	currency,
	amount,
	state,
	endLabel,
	margin = "",
	showInfoIcon = false,
	infoIconCallback,
	dontFormatNumber = false,
	noFloat = false,
}) => {
	const TagStyles = {
		gaining: "text-mountain-meadow-dark bg-mountain-meadow-1",
		losing: "text-bean-red-dark bg-bean-red-light",
		profit: "bg-mountain-meadow-dark text-mountain-meadow-1",
		loss: "bg-bean-red-dark text-bean-red-light",
		zero: "text-mine-shaft-4 bg-color-black-1",
	};

	const IconColors = {
		gaining: "#006C51",
		losing: "#BA1A1A",
		profit: "",
		loss: "",
		zero: "#212121",
	};

	const returnNumber = (number: string) => {
		if (dontFormatNumber) {
			return noFloat ? number?.split(".")[0] : number;
		} else {
			return noFloat
				? formatNumberWithCommas(number)?.split(".")[0]
				: formatNumberWithCommas(number);
		}
	};

	return (
		<div
			className={twMerge(
				`w-fit flex px-2 py-1 font-inter text-xs font-bold leading-4 rounded-md`,
				className,
				margin,
				TagStyles[state],
			)}
		>
			{`${getCurrencySymbol(currency)}${returnNumber(amount)} ${
				endLabel ? endLabel : ""
			}`}{" "}
			{showInfoIcon && (
				<div
					className="ml-[2px] scale-[70%]"
					onClick={() => {
						infoIconCallback && infoIconCallback();
					}}
				>
					<IIcon color={IconColors[state]} />
				</div>
			)}
		</div>
	);
};

export default MTMTag;
