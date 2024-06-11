import {
	BorrowingCostHeader,
	QuoteResults,
	QuoteDetails,
	UnderlineButton,
} from "components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearImportExportForm } from "store";
import ConnectNConsultCard from "components/src/Home/src/ConnectNConsultCard";

export interface QuoteReviewInterface {}

const QuoteReview: React.FC<QuoteReviewInterface> = ({}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		currency_pair,
		forecast_rate,
		selectedMonthsWithAmount,
		total_amount,
		calculatedValues,
	} = useSelector((state: any) => state?.importExportToolSlice);
	const [base_currency, quote_currency] = currency_pair.split("/");

	const isExportPath = () => {
		if (location.pathname?.includes("export-quote-evaluation")) {
			return true;
		}
		return false;
	};

	const onBackPress = () => {
		navigate(-1);
	};

	return (
		<div className="md:mx-auto w-full md:w-1/3 mt-2">
			<BorrowingCostHeader
				label={isExportPath() ? "Quote review" : "Cost review"}
				navigateBackCallback={onBackPress}
				className="fixed top-0 bg-white z-[999] w-full"
			/>
			<div className="flex flex-col mt-[18px] px-5 gap-y-4 pt-[50px]">
				<QuoteDetails
					base_currency={base_currency}
					quote_currency={quote_currency}
					total_amount={total_amount}
					rate={forecast_rate}
					no_of_months={selectedMonthsWithAmount.length}
				/>
				<QuoteResults
					success={
						calculatedValues && calculatedValues?.total_pnl?.includes("-")
							? false
							: true
					}
					selectedMonths={calculatedValues.calculated_values}
					base_currency={base_currency}
					quote_currency={quote_currency}
					weighted_avg_rate={calculatedValues.weighted_average}
					total_pnl={calculatedValues.total_pnl}
					rate={forecast_rate}
				/>
				<ConnectNConsultCard
					label1="WiredUp recommends you to Hedge the receivable amount for the respective months."
					label2="Need help with booking this gain? "
					variation="withButton"
				/>
				<UnderlineButton
					className="w-fit mx-auto"
					buttonText="Done"
					onClick={() => {
						dispatch(clearImportExportForm());
						navigate("/fx-home");
					}}
				/>
			</div>
		</div>
	);
};

export default QuoteReview;
