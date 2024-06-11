import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader, TabWrapper } from "components";
import UseEefcHeader from "../UseHedgesComponents/UseEefcHeader";
import { getAllHedges } from "services";
import EefcAccountScreen from "./EefcEncash";
import { getAllImportTrades } from "services/portfolio/EEFC/getAllImportTrades";
import { setPortfolioAllTradesList } from "store";
import { useDispatch } from "react-redux";
import { any } from "zod";

const ImportNetOffEefc = () => {
	const navigate = useNavigate();
	const { eefcId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("linked");
	const [tradeData, setTradeData] = useState<any[]>([]);
	const [filterEefcData, setFilterEefcData] = useState<any>([]);

	const dispatch = useDispatch();
	const init = async () => {
		try {
			setIsLoading(true);
			await getTradeList();
		} catch (err) {
			console.log("Error occured: ", err);
		} finally {
			setIsLoading(false);
		}
	};

	const eefc = useSelector((state: any) => {
		if (eefcId) {
			return state?.portfolioEEFCsList?.eefcList[eefcId];
		}
	});
	const getTradeList = async () => {
		try {
			const response: any = await getAllImportTrades({
				trade_type: "import",
				currency_pair: eefc.currency_pair,
			});

			const tradeData = response?.trades;
			const currentFilterObject = response?.filteredData;

			setFilterEefcData(response?.filteredData);
			let tradeList: any[] = [];
			Object.entries(tradeData).forEach(([property, tradesArray]) => {
				if (!Array.isArray(tradesArray)) {
					console.error(`Invalid trades data for property ${property}`);
					return;
				}
				tradesArray.forEach((trade) => {
					if (
						trade.status === "active" &&
						trade.currency_pair === eefc.currency_pair
					)
						tradeList.push(trade);
				});
				setTradeData(tradeList);
			});

			const mappedList: any = {};
			(tradeList as any[]).forEach((ele: any) => {
				mappedList[ele.uuid] = ele;
			});
			dispatch(setPortfolioAllTradesList(mappedList));
		} catch (err) {}
	};

	useEffect(() => {
		init();
	}, [eefc]);

	const percentage =
		100 - Math.ceil((+eefc?.remaining_amount / +eefc?.eefc_amount) * 100);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<UseEefcHeader
						header="importnetoff"
						remaining_amount={eefc.remaining_amount}
						percentage={percentage}
						base_currency={eefc.base_currency}
						backArrowCallback={() => {
							navigate(-1);
						}}
					/>
					<TabWrapper
						tabs={[
							{
								label: `All Trades (${tradeData.length})`,
								activeTabName: "linked",
								component: (
									<EefcAccountScreen
										dataSet={tradeData}
										filterDataSet={filterEefcData}
										type="importnetoff"
									/>
								),
							},
						]}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
				</>
			}
		/>
	);
};

export default ImportNetOffEefc;
