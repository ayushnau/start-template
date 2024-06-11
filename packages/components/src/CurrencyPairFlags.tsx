import React from "react";

interface FlagsProps {
	flagpair: String;
	disabled?: boolean;
	className?: String;
}

const CurrencyPairFlags: React.FC<FlagsProps> = ({
	flagpair,
	disabled = false,
	className,
}) => {
	const [flag1, flag2] = flagpair.split("/");
	const data: any = {
		AUD: "australia",
		BRL: "brazil",
		CAD: "canada",
		CLP: "chile",
		CNY: "china",
		CNH: "china",
		CZK: "czechrepublic",
		DKK: "denmark",
		HKD: "hongkong",
		HUF: "hungary",
		INR: "india",
		IDR: "indonesia",
		JPY: "japan",
		MYR: "malaysia",
		MXN: "mexico",
		NOK: "norway",
		PHP: "philippines",
		PLN: "poland",
		QAR: "qatar",
		RON: "romania",
		RUB: "russia",
		SAR: "saudiarabia",
		SGD: "singapore",
		ZAR: "southafrica",
		//KRW: "korea",
		CHF: "switzerland",
		TWD: "taiwan",
		THB: "thailand",
		TRY: "turkey",
		USD: "unitedstates",
		EUR: "europeanunion",
		GBP: "unitedkingdom",
		AED: "unitedarabemirates",
		KRW: "southkorea",
		VND: "vietnam",
		SEK: "sweden",
		NZD: "newzealand",
	};
	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/Flags/${data[flag1]}.svg`;
	const url2 = `${baseUrl}/Flags/${data[flag2]}.svg`;

	return (
		<div className={`flex justify-center items-center ${className} `}>
			<img
				className={"w-4 h-4 " + (disabled ? "grayscale" : "")}
				src={url1}
				alt=""
			/>
			<img
				className={"-ml-[2px] w-4 h-4 " + (disabled ? "grayscale" : "")}
				src={url2}
				alt=""
			/>
		</div>
	);
};

export default CurrencyPairFlags;
