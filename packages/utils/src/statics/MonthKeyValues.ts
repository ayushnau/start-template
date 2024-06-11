import moment from "moment";
export interface MonthKeyValuesInterface {
	[key: string]: string;
}

const MonthKeyValues: MonthKeyValuesInterface = {
	"1M": "1 Month",
	"2M": "2 Months",
	"3M": "3 Months",
	"4M": "4 Months",
	"5M": "5 Months",
	"6M": "6 Months",
	"9M": "9 Months",
	"12M": "12 Months",
	"15M": "15 Months",
	"18M": "18 Months",
	"3Y": "3 Years",
	"5Y": "5 Years",
	NA: "Not applicable",
	ON: "Overnight (O/N)",
	monthly: "Monthly",
	quaterly: "Quaterly",
	semiannual: "Semi-annual",
	bullet: "Bullet (At maturity)",
};

const MonthNarrow = [
	"J",
	"F",
	"M",
	"A",
	"M",
	"J",
	"J",
	"A",
	"S",
	"O",
	"N",
	"D",
];
const Month2Digit = [
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
];
const MonthLong = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const MonthShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const MonthNumeric = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
];

export {
	MonthKeyValues,
	MonthNumeric,
	Month2Digit,
	MonthLong,
	MonthShort,
	MonthNarrow,
};
