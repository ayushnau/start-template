import React, { useEffect, useState } from "react";
import {
	Header,
	Loader,
	RemainingAmountIndicatorCard,
	TabWrapper,
} from "components";
import { useNavigate, useParams } from "react-router-dom";
import AllExportTrades from "./AllExportTrades";
import { useSelector } from "react-redux";
import EefcList from "./EefcList";
import { useLocation } from "react-router-dom";
import { setPortfolioModal } from "store";
import { useDispatch } from "react-redux";

const RepayLoan = () => {
	const [activeLoanBookTab, setActiveLoanBookTab] = useState("ExportTrades");
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [allExportTradesCount, setAllExportTradesCount] = useState(0);
	const navigate = useNavigate();
	const { pcfcId } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();

	const locationState = location?.state;
	const from = locationState?.from;

	const pcfc = useSelector((state: any) => {
		if (pcfcId) {
			return state?.pcfcListSlice?.pcfcList[pcfcId];
		}
	});
	console.log({ pcfc });
	const percentage =
		100 - Math.ceil((+pcfc?.remaining_amount / +pcfc?.pcfc_amount) * 100);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="h-full">
					<div className="relative bg-white flex flex-col overflow-y-scroll h-full">
						<Header
							className="flex items-center justify-between px-4 pb-2 mt-2"
							displayTitle="Select and enter amount to repay"
							displaySubTitle={`PCFC/PSFC Loan number: ${
								pcfc.loan_number ? pcfc.loan_number : "N/A"
							}`}
							showEditIcon={false}
							backAction={() => {
								if (from === "pcfcLoanTable") navigate(-1);
								else {
									navigate(`/fx-home/loan-book/pcfc/${pcfcId}`);
									dispatch(
										setPortfolioModal({
											displayModalScreen: true,
										}),
									);
								}
							}}
						/>
						<RemainingAmountIndicatorCard
							percentage={percentage}
							remaining_amount={pcfc.remaining_amount}
							subTitle={`Order number: ${
								pcfc.order_number ? pcfc.order_number : "N/A"
							}`}
							currency={pcfc.base_currency}
							wrapperClasses="absolute right-5 top-[9px]"
						/>

						<TabWrapper
							tabs={[
								{
									label: `All export trades ${
										allExportTradesCount ? `(${allExportTradesCount})` : ""
									}`,
									activeTabName: "ExportTrades",
									component: <AllExportTrades />,
								},
								{
									label: `All EEFC(s)`,
									activeTabName: "AllEefcs",
									component: <EefcList />,
								},
							]}
							setActiveTab={setActiveLoanBookTab}
							activeTab={activeLoanBookTab}
							secondTab={<></>}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default RepayLoan;
