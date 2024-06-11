import React from "react";

interface FlagProps {
	flagCode: any;
	disabled?: boolean;
	className?: String;
}

const SingleCurrencyFlag: React.FC<FlagProps> = ({
	flagCode,
	disabled = false,
	className,
}) => {
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
	const url = `${baseUrl}/Flags/${data[flagCode]}.svg`;
	return (
		<div className={`flex justify-center items-center ${className}`}>
			<img
				className={"w-6 h-6 " + (disabled ? "grayscale" : "")}
				src={url}
				alt="flag"
			/>
		</div>
	);
};

export default SingleCurrencyFlag;
