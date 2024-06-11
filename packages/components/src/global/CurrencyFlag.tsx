import React from "react";
import { CountryCodes } from "utils";

interface FlagsProps {
	currency: string;
	disabled?: boolean;
	size?: string;
}

const CurrencyFlag: React.FC<FlagsProps> = ({
	currency,
	disabled = false,
	size = "w-6 h-6 ",
}) => {
	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/Flags/${CountryCodes[currency]}.svg`;

	return (
		<div className="flex justify-center items-center ">
			<img
				className={size + (disabled ? "grayscale" : "")}
				src={url1}
				alt={CountryCodes[currency]}
			/>
		</div>
	);
};

export default CurrencyFlag;
