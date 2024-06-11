import React from "react";
import InterestInfo from "./InterestInfo";
import VSDivider from "./VSDivider";
import { useSelector } from "react-redux";
import InterestDetailsSection from "./InterestDetailsSection";
import { MonthKeyValues } from "utils";
import RecomendationCard from "./RecommendationCard";
import { getBorrowingRates } from "services";
import { Loader } from "components";
import { twMerge } from "tailwind-merge";

export interface BorrowingResultsCardInterface {
	web?: boolean;
	closeModal?: () => void;
}

const BorrowingResultsExportCard: React.FC<BorrowingResultsCardInterface> = ({
	web = false,
	closeModal,
}) => {
	const {
		trade_type,
		base_currency,
		tenor,
		spread,
		subvention,
		interest_rate,
		fixing,
	} = useSelector((state: any) => state.borrowingCostComparisonSlice);
	const [isLoading, setIsLoading] = React.useState(true);
	const [fwd_premium, setFwdPremium] = React.useState("");
	const [SOFR, setSOFR] = React.useState("");
	const [EURIBOR, setEURIBOR] = React.useState("");
	const [calculatedBaseInterest, setCalculatedBaseInterest] =
		React.useState("");
	const [calculatedNativeInterest, setCalculatedNativeInterest] =
		React.useState("");

	const handleFetchingBorrowingRates = async () => {
		try {
			const payload = {
				type: trade_type,
				fixing_frequency: fixing,
				tenor: tenor,
				base_currency: base_currency,
			};
			const rates: any = await getBorrowingRates(payload);
			if (rates) {
				if (base_currency === "USD") {
					setSOFR(rates.SOFR.replaceAll("%", ""));
					setCalculatedBaseInterest(
						(+rates.SOFR.replaceAll("%", "") + spread / 100).toFixed(2),
					);
				} else {
					setEURIBOR(rates.EURIBOR?.replaceAll("%", ""));
					setCalculatedBaseInterest(
						(+rates.EURIBOR?.replaceAll("%", "") + spread / 100).toFixed(2),
					);
				}
				setFwdPremium(rates.fwd_premium?.replaceAll("%", ""));
				setCalculatedNativeInterest(
					(
						+interest_rate -
						+subvention -
						+rates.fwd_premium?.replaceAll("%", "")
					).toFixed(2),
				);
			}
		} catch (error) {
			console.log("Error while Generating Rates!!!", error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		handleFetchingBorrowingRates();
	}, []);

	const LabelContent = [
		`Interest costs for ${base_currency} borrowing are calculated based on the current ${
			base_currency === "USD" ? "SOFR" : "EURIBOR"
		} rate in the market`,
		"Interest cost for INR borrowing is calculated based applicable subvention and current fwd. premium",
	];

	const returnLowestRate = () => {
		if (+calculatedBaseInterest > +calculatedNativeInterest) {
			return "INR";
		} else if (+calculatedBaseInterest < +calculatedNativeInterest) {
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
	];

	const NativeDetails = [
		{ label: "Interest rate", value: `${interest_rate}%` },
		{ label: "Subvention", value: `${subvention}%` },
		{ label: "Fwd. premium", value: `${fwd_premium}%` },
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
						<InterestDetailsSection
							navigationLink={
								web
									? "/fx-home/fx-tools/borrowing-cost-comparison/details"
									: "/fx-home/borrowing-cost-comparison/details"
							}
							currency={base_currency}
							interest_value={calculatedBaseInterest}
							detailsArray={BaseDetails}
							lowest={returnLowestRate() === base_currency}
							closeModalCallback={closeModal}
						/>
						<VSDivider wrapperClasses="py-1" />
						<InterestDetailsSection
							navigationLink={
								web
									? "/fx-home/fx-tools/borrowing-cost-comparison/details/inr"
									: "/fx-home/borrowing-cost-comparison/details/inr"
							}
							currency="INR"
							interest_value={calculatedNativeInterest}
							lowest={returnLowestRate() === "INR"}
							detailsArray={NativeDetails}
							closeModalCallback={closeModal}
						/>
						<VSDivider showVS={false} wrapperClasses="py-2" />
						<InterestInfo labels={LabelContent} />
					</div>
					<RecomendationCard
						web={web}
						trade_type={"export"}
						tenor={tenor}
						base_currency={returnLowestRate()}
						variation="withButton"
					/>
				</>
			}
		/>
	);
};

export default BorrowingResultsExportCard;
