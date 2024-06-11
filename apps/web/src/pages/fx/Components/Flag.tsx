import React from "react";

interface FlagsProps {
	flagpair: String;
}

const Flag: React.FC<FlagsProps> = ({ flagpair }) => {
	const [flag1, flag2] = flagpair.split("/");
	const data: any = {
		AUD: "australia",
		BRL: "brazil",
		CAD: "canada",
		CLP: "chile",
		CNY: "china",
		CZK: "czechrepublic",
		DKK: "denmark",
		HKD: "hongkong",
		HUF: "hungary",
		INR: "india",
		IDR: "indonesia",
		JPY: "japan",
		MYR: "malaysia",
		MXN: "mexico",
		NZD: "new zealand",
		NOK: "norway",
		PHP: "philippines",
		PLN: "poland",
		QAR: "qatar",
		RON: "romania",
		RUB: "russia",
		SAR: "saudi arabia",
		SGD: "singapore",
		ZAR: "southafrica",
		KRW: "korea",
		CHF: "switzerland",
		TWD: "taiwan",
		THB: "thailand",
		TRY: "turkey",
		USD: "unitedstates",
		EUR: "europeanunion",
		GBP: "unitedkingdom",
	};
	const url1 = `./Flags/${data[flag1]}.svg`;
	const url2 = `./Flags/${data[flag2]}.svg`;

	return (
		<div className="flex justify-center items-center ml-2">
			<img className="w-4 h-4" src={url1} alt="" />
			<img className="-ml-[2px] w-4 h-4" src={url2} alt="" />
		</div>
	);
};

export default Flag;
