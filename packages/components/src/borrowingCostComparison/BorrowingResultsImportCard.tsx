import React from "react";
import InterestInfo from "./InterestInfo";
import VSDivider from "./VSDivider";
import { useSelector } from "react-redux";
import InterestDetailsSection from "./InterestDetailsSection";
import { MonthKeyValues, findIndexOfLowestNumber } from "utils";
import RecomendationCard from "./RecommendationCard";
import InterestDetailsImportSection from "./InterestDetailsImportSection";
import { getBorrowingRates } from "services";
import { Loader } from "components";
import { twMerge } from "tailwind-merge";

export interface BorrowingResultsImportCardnterface {
	web?: boolean;
	closeModal?: () => void;
}

const BorrowingResultsImportCard: React.FC<
	BorrowingResultsImportCardnterface
> = ({ web = false, closeModal }) => {
	const {
		trade_type,
		base_currency,
		tenor,
		spread,
		interest_rate,
		fixing,
		moratorium,
	} = useSelector((state: any) => state.borrowingCostComparisonSlice);
	const [isLoading, setIsLoading] = React.useState(true);

	const [fwd_premium, setFwdPremium] = React.useState("");
	const [swap_rate, setSwapRates] = React.useState("");
	const [avg_maturity, setAvgMaturity] = React.useState("12M");
	const [SOFR, setSOFR] = React.useState("");
	const [EURIBOR, setEURIBOR] = React.useState("");

	const [calculatedBaseInterest, setCalculatedBaseInterest] = React.useState([
		"",
		"",
		"",
	]);

	const returnMoritorium = () => {
		if (!(tenor === "3Y" || tenor === "5Y")) return "";
		return moratorium === "NA" ? "NA-bullet" : moratorium;
	};

	const getAverageMaturity = (value: string) => {
		if (MonthKeyValues[value]) {
			return MonthKeyValues[value];
		} else {
			return `${value} years`;
		}
	};

	const handleFetchingBorrowingRates = async () => {
		try {
			const payload = {
				type: trade_type,
				fixing_frequency: fixing,
				tenor: tenor,
				moratorium: returnMoritorium(),
				base_currency: base_currency,
			};
			const rates: any = await getBorrowingRates(payload);

			if (rates) {
				const tempCalculatedBaseInterest = [];
				setFwdPremium(
					rates.fwd_premium?.replaceAll("%", "") ||
						rates.average_premium.replaceAll("%", ""),
				);
				setSwapRates(rates?.swap_rates?.replaceAll("%", ""));
				setAvgMaturity(getAverageMaturity(rates?.average_maturity));
				tempCalculatedBaseInterest.push(
					(
						+rates?.swap_rates?.replaceAll("%", "") +
						spread / 100 +
						(+rates.fwd_premium?.replaceAll("%", "") ||
							+rates.average_premium?.replaceAll("%", ""))
					).toFixed(2),
				);
				if (base_currency === "USD") {
					tempCalculatedBaseInterest.push(
						(+rates.SOFR.replaceAll("%", "") + spread / 100).toFixed(2),
					);
					setSOFR(rates.SOFR.replaceAll("%", ""));
				} else {
					tempCalculatedBaseInterest.push(
						(+rates.EURIBOR.replaceAll("%", "") + spread / 100).toFixed(2),
					);
					setEURIBOR(rates.EURIBOR.replaceAll("%", ""));
				}
				if (tenor === "3Y" || tenor === "5Y") {
					tempCalculatedBaseInterest.push(
						(+rates.swap_rates.replaceAll("%", "") + spread / 100).toFixed(2),
					);
				} else {
					tempCalculatedBaseInterest.push("9999");
				}
				setCalculatedBaseInterest([...tempCalculatedBaseInterest]);
			}
		} catch (error) {
			console.log("Error while Generating Rates!!!");
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		handleFetchingBorrowingRates();
	}, []);

	const [calculatedNativeInterest, setCalculatedNativeInterest] =
		React.useState(interest_rate);

	const LabelContent = [
		`Interest rate for ${base_currency} borrowing are calculated based on the current ${
			base_currency === "USD" ? "SOFR" : "EURIBOR"
		} rate prevalent in the market`,
	];

	const returnLowestRate = () => {
		const resultIndex = findIndexOfLowestNumber(calculatedBaseInterest);
		if (+calculatedBaseInterest[resultIndex] > +calculatedNativeInterest) {
			return "INR";
		} else if (
			+calculatedBaseInterest[resultIndex] < +calculatedNativeInterest
		) {
			return resultIndex;
		} else {
			//TODO: What to do if both interests are equal
			return null;
		}
	};

	const returnCurrency = () => {
		const resultIndex = findIndexOfLowestNumber(calculatedBaseInterest);
		if (+calculatedBaseInterest[resultIndex] > +calculatedNativeInterest) {
			return "INR";
		} else if (
			+calculatedBaseInterest[resultIndex] < +calculatedNativeInterest
		) {
			return base_currency;
		} else {
			//TODO: What to do if both interests are equal
			return null;
		}
	};

	const BaseDetails = [
		{ label: "Tenor", value: MonthKeyValues[tenor] },
		{
			label: base_currency === "USD" ? "SOFR" : "EURIBOR",
			value: base_currency === "USD" ? `${SOFR}%` : `${EURIBOR}%`,
		},
		{ label: "Spread", value: `${spread} Bps` },
		{ label: "Fwd. premium", value: `${fwd_premium}%` },
		{ label: "Swap Rate", value: `${swap_rate}%` },
		{ label: "Avg. maturity", value: `${avg_maturity}` },
	];

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<div
						className={twMerge(
							"p-4 rounded-xl border border-mine-shaft-2",
							web ? "w-3/5" : "",
						)}
					>
						<InterestDetailsImportSection
							currency={base_currency}
							interest_value={calculatedBaseInterest}
							detailsArray={BaseDetails}
							lowest={returnLowestRate() as unknown as 0 | 1 | 2}
							navigationLink={
								web
									? "/fx-home/fx-tools/borrowing-cost-comparison/details"
									: "/fx-home/borrowing-cost-comparison/details"
							}
							tenor={tenor}
							closeModalCallback={closeModal}
						/>
						<VSDivider wrapperClasses="py-1" />
						<InterestDetailsSection
							currency="INR"
							interest_value={calculatedNativeInterest}
							lowest={returnLowestRate() === "INR"}
							overrideText="Hedged Interest rate for INR borrowing"
							navigationLink={
								web
									? "/fx-home/fx-tools/borrowing-cost-comparison/details/inr"
									: "/fx-home/borrowing-cost-comparison/details/inr"
							}
							closeModalCallback={closeModal}
						/>
						<VSDivider showVS={false} wrapperClasses="py-2" />
						<InterestInfo labels={LabelContent} />
					</div>
					<RecomendationCard
						web={web}
						trade_type="import"
						tenor={tenor}
						base_currency={returnCurrency()}
						variation="withButton"
					/>
				</>
			}
		/>
	);
};

export default BorrowingResultsImportCard;
