import {
	BorrowingCostHeader,
	QuoteResults,
	QuoteDetails,
	UnderlineButton,
} from "components";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import WebConnectAndConsultBanner from "./WebConnectAndConsultBanner";
import { useIsExportPath } from "services";
import { clearImportExportForm, clearImportForm } from "store";

export interface QuoteReviewInterface {
	web?: boolean;
	closeModal?: (navLink?: string) => void;
}

const QuoteReview: React.FC<QuoteReviewInterface> = ({ closeModal }) => {
	const { isExportPath } = useIsExportPath();
	const dispatch = useDispatch();
	const {
		currency_pair,
		forecast_rate,
		selectedMonthsWithAmount,
		total_amount,
		calculatedValues,
	} = useSelector((state: any) =>
		isExportPath ? state?.importExportToolSlice : state?.importToolSlice,
	);
	const [base_currency, quote_currency] = currency_pair.split("/");

	const onBackPress = () => {
		closeModal && closeModal();
	};

	return (
		<div className="w-full h-fit relative">
			<BorrowingCostHeader
				label={isExportPath ? "Quote review" : "Cost review"}
				navigateBackCallback={onBackPress}
				className="sticky top-0 z-[999] bg-white"
			/>
			<div className="flex flex-col mt-[18px] px-5 gap-y-4">
				<QuoteDetails
					base_currency={base_currency}
					quote_currency={quote_currency}
					total_amount={total_amount}
					rate={forecast_rate}
					no_of_months={selectedMonthsWithAmount.length}
					web={closeModal}
				/>
				<div className="grid grid-cols-2 gap-x-5">
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
						web
					/>
					<WebConnectAndConsultBanner />
				</div>
				<UnderlineButton
					className="w-fit mx-auto"
					buttonText="Done"
					onClick={async () => {
						try {
							isExportPath
								? dispatch(clearImportExportForm())
								: dispatch(clearImportForm());
							closeModal && closeModal("/fx-home/fx-tools/");
						} catch (error) {
							console.log("Error while Fetching :", error);
							throw error;
						}
					}}
				/>
			</div>
		</div>
	);
};

export default QuoteReview;
