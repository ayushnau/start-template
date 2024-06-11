import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { Loader } from "components";
import { getAllHedges, getAllPcfc, getAllPCFCs } from "services";
import RecordPCFCRepaymentHeader from "../RecordPCFCRepaymentComponents/RecordPCFCRepaymentHeader";
import PCFCLoanRepaymentScreen from "./PCFCLoanRepaymentScreen";

export interface RecordPCFCRepaymentInterface {}

const RecordPCFCRepayment: React.FC<RecordPCFCRepaymentInterface> = ({}) => {
	const navigate = useNavigate();

	const params = useParams();
	const { ledgerId, tradeId } = params;
	const [isLoading, setIsLoading] = React.useState(true);
	const [PCFCLoanData, setPCFCLoanData] = React.useState<any[]>([]);
	const [unlinkedHedges, setUnlinkedHedges] = React.useState<any[]>([]);

	const [activeTab, setActiveTab] = React.useState("linked");

	const trade = useSelector((state: StoreState) => {
		const tradeList: any = state?.portfolioTradesList?.tradeList;
		if (tradeId) {
			return tradeList[tradeId];
		}
	});

	const percentage =
		100 - Math.ceil((+trade?.remaining_amount / +trade?.trade_amount) * 100);

	const getAllPCFCList = async () => {
		try {
			const payload = {
				currency_pair: trade?.currency_pair,
			};
			const result: any = await getAllPcfc(payload);

			if (result && result.success) {
				setPCFCLoanData(result.pcfc);
			}
		} catch (error) {
			console.log("Error while getting pcfc list");
		}
	};

	// ! when pcfc api ready added for static
	// const getUnlinkedHedgesList = async () => {
	// 	try {
	// 		const result: any = await getAllHedges({
	// 			currency_pairs: trade.currency_pair,
	// 			hedge_type: trade.trade_type,
	// 			status: "active",
	// 		});
	// 		if (result && result.success) {
	// 			setUnlinkedHedges(result.hedges);
	// 		}
	// 	} catch (error) {
	// 		console.log("Error while getting hedge list");
	// 	}
	// };

	const init = async () => {
		try {
			setIsLoading(true);
			await getAllPCFCList();
		} catch (error) {
			console.log("Error fetching PCFC initialisation", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, [trade]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="w-full h-full flex flex-col pt-2">
					<RecordPCFCRepaymentHeader
						remaining_amount={trade?.remaining_amount}
						hedged_amount={trade?.hedged_amount}
						unhedged_amount={trade?.unhedged_amount}
						percentage={percentage}
						base_currency={trade?.base_currency}
						backArrowCallback={() => {
							navigate(-1);
						}}
					/>
					<PCFCLoanRepaymentScreen pcfcLoanRepayData={PCFCLoanData} />
				</div>
			}
		/>
	);
};

export default RecordPCFCRepayment;
