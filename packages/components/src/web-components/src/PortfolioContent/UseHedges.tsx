import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { Loader, TabWrapper } from "components";
import { getAllHedges, getAllHedgesLinkedWithTrades } from "services";
import UseHedgesHeader from "../UseHedgesComponents/UseHedgesHeader";
import LinkedHedgesScreen from "./LinkedHedgesScreen";
import UnLinkedHedgesScreen from "./UnLinkedHedgesScreen";

export interface UseHedgesInterface {}

const UseHedges: React.FC<UseHedgesInterface> = ({}) => {
	const navigate = useNavigate();

	const params = useParams();
	const { ledgerId, tradeId } = params;
	const [isLoading, setIsLoading] = React.useState(true);
	const [linkedHedges, setLinkedHedges] = React.useState<any[]>([]);
	const [unlinkedHedges, setUnlinkedHedges] = React.useState<any[]>([]);

	const [activeTab, setActiveTab] = React.useState("linked");

	const trade = useSelector((state: StoreState) => {
		const tradeList: any = state?.portfolioTradesList?.tradeList;
		if (tradeId) {
			return tradeList[tradeId];
		}
	});

	const percentage =
		100 - Math.ceil((+trade.remaining_amount / +trade.trade_amount) * 100);

	const getLinkedHedgesList = async () => {
		try {
			const result: any = await getAllHedgesLinkedWithTrades(tradeId);
			if (result && result.success) {
				setLinkedHedges(result.data);
			}
		} catch (error) {
			console.log("Error while getting hedge list");
		}
	};

	const getUnlinkedHedgesList = async () => {
		try {
			const result: any = await getAllHedges({
				currency_pairs: trade.currency_pair,
				hedge_type: trade.trade_type,
				status: "active",
			});
			if (result && result.success) {
				setUnlinkedHedges(result.hedges);
			}
		} catch (error) {
			console.log("Error while getting hedge list");
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			await getLinkedHedgesList();
			await getUnlinkedHedgesList();
		} catch (error) {
			console.log("Error fetching Headge utilisation data", error);
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
					<UseHedgesHeader
						remaining_amount={trade.remaining_amount}
						hedged_amount={trade.hedged_amount}
						unhedged_amount={trade.unhedged_amount}
						percentage={percentage}
						base_currency={trade.base_currency}
						backArrowCallback={() => {
							navigate(-1);
						}}
					/>
					<TabWrapper
						tabs={[
							{
								label: `Linked Hedges (${linkedHedges.length})`,
								activeTabName: "linked",
								component: (
									<LinkedHedgesScreen
										setActiveTab={setActiveTab}
										unlinkedHedgesCount={unlinkedHedges.length}
										linkedHedges={linkedHedges}
										trade={trade}
									/>
								),
							},
							{
								label: `Unlinked hedges (${unlinkedHedges.length})`,
								activeTabName: "unlinked",
								component: (
									<UnLinkedHedgesScreen
										unLinkedHedges={unlinkedHedges}
										trade={trade}
									/>
								),
							},
						]}
						changeTab={activeTab}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
				</div>
			}
		/>
	);
};

export default UseHedges;
