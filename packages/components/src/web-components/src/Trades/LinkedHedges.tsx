import React, { useEffect, useState } from "react";
import {
	getTradeDetails,
	getLedgersDetails,
	getAllHedgesLinkedWithTrades,
	useModalNavigation,
} from "services";
import {
	HedgeLinkCard,
	UpdatedPrompt,
	showLinkModal,
	PrimaryButton,
	Loader,
	Header,
} from "components";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import showInfoModal from "../Modals/InfoModal";

const INFODETAILS = [
	{
		title: "Gaining",
		description: [
			`When a Hedge is marked-to-market, its value is refreshed to reflect its worth at the current market price. `,
			`If the market price has increased for an import hedge or if the market price has decreased for an export hedge since the hedge was initiated, the unrealised gain is displayed. This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
		],
	},
	{
		title: "Losing",
		description: [
			`When a Hedge is marked-to-market, its value is refreshed to reflect its worth at the current market price. `,
			`If the market price has decreased for an import hedge or if the market price has increased for an export hedge since the hedge was initiated, the unrealised loss is displayed. This loss represents the potential loss that could be incurred if the position were to be closed at that moment. `,
		],
	},
];

const LinkedHedges: React.FC = () => {
	const { ledgerId, tradeId } = useParams();
	const [ledgerName, setLedgerName] = useState("N/A");
	const [details, setDetails] = useState<any>({});
	const [linkedHedgesCount, setLinkedHedgesCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hedgeList, setHedgeList] = useState<any>([]);
	const [refresh, setRefresh] = useState(new Date());
	const [loadingText, setLoading] = useState("");

	const { stepBackNavigation, switchModalScreen, addToModalScreen } =
		useModalNavigation();

	const fetchLedgerData = async () => {
		try {
			const response: any = await getLedgersDetails(ledgerId);
			if (response.sucess && response.workbook.dump.name) {
				setLedgerName(response.workbook.dump.name);
			}
		} catch (error) {
			console.log("Error while fetching ledger data");
		}
	};

	const fetchTradeData = async () => {
		try {
			const response: any = await getTradeDetails(tradeId);
			response.trade && setDetails(response.trade);
		} catch (error) {
			console.log(error);
		}
	};

	const init = async () => {
		setIsLoading(true);
		await getLinkedHedgesList();
		await fetchLedgerData();
		await fetchTradeData();
		setIsLoading(false);
	};

	const refreshCallback = () => {
		setTimeout(() => {
			init();
		}, 900);
	};

	const getLinkedHedgesList = async () => {
		try {
			const result: any = await getAllHedgesLinkedWithTrades(tradeId);
			result.data && setHedgeList(result.data);
			setLinkedHedgesCount(result.data.length);
		} catch (error) {
			console.log("Error while getting hedge list");
		}
	};

	const handleBackBtnClick = () => {
		stepBackNavigation("linked");
	};

	useEffect(() => {
		init();
	}, [refresh]);

	const navigateToHedgesPage = () => {
		// navigate(`add-hedge`, {
		//   state: {
		//     action: "linkHedge",
		//     tradeId: tradeId,
		//     trade_unhedged_amount: details.unhedged_amount,
		//     type: details.trade_type,
		//     pair: details.currency_pair,
		//     ledgerId: ledgerId,
		//   },
		// });
		addToModalScreen(`add-hedge`, {
			state: {
				action: "linkHedge",
				tradeId: tradeId,
				trade_unhedged_amount: details.unhedged_amount,
				type: details.trade_type,
				pair: details.currency_pair,
				ledgerId: ledgerId,
			},
		});
	};

	const selectExistingHedgesNaigation = () => {
		switchModalScreen(`trade/${tradeId}/link-hedge`);
	};

	const handleUseHedgeCallback = (hedgeID: any, link_amount: any) => {
		switchModalScreen(`trade/${tradeId}/hedge/${hedgeID}/use-hedge`, {
			state: {
				type: "transaction_via_hedge_trade",
				link_amount: link_amount,
			},
		});
	};

	return (
		<Loader
			isLoading={isLoading}
			loadingText={loadingText}
			successComponent={
				<div className="bg-white h-full flex flex-col">
					{details && (
						<>
							<Header
								className="flex items-center justify-between px-4 pb-2 mt-2"
								displayTitle={`${linkedHedgesCount} Hedges linked`}
								displaySubTitle={`Trade · ${ledgerName}`}
								backAction={handleBackBtnClick}
								showEditIcon={false}
							/>

							<div className="relative border-t-[1px] border-mine-shaft-2 overflow-y-scroll"></div>
							<UpdatedPrompt
								showClock
								text={`Last updated : ${moment
									.utc(details.updated_at)
									.tz("Asia/Kolkata")
									.format("DD MMM 'YY")} at ${moment
									.utc(details.updated_at)
									.tz("Asia/Kolkata")
									.format("h:mma")
									.toUpperCase()}`}
								className="my-0"
								updateAction={() => {
									setLoading("Updating..");
									setRefresh(new Date());
								}}
							/>
							<div className="px-5 pt-3 gap-y-3 flex flex-col h-[calc(100%-64px)] overflow-scroll pb-20">
								{hedgeList.map((link_data: any, index: number) => {
									return (
										<HedgeLinkCard
											key={index}
											detail={link_data.hedge}
											index={index + 1}
											showInfoModal={() =>
												showInfoModal({ content: INFODETAILS, web: true })
											}
											ledger_uuid={ledgerId}
											refreshCallback={refreshCallback}
											count={hedgeList.length}
											useHedgeCallback={() => {
												handleUseHedgeCallback(
													link_data.hedge.uuid,
													link_data.link_amount.replace(/,/g, ""),
												);
											}}
											web
										/>
									);
								})}
							</div>
						</>
					)}
					<div className="px-4 py-3 bg-white shadow-boxShadow">
						<PrimaryButton
							buttonText="Link more hedges"
							className="w-full"
							onClick={() => {
								showLinkModal({
									callbackCreate: navigateToHedgesPage,
									callbackLink: selectExistingHedgesNaigation,
									web: true,
								});
							}}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default LinkedHedges;
