import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getTradeDetails,
	getLedgersDetails,
	getAllHedgesLinkedWithTrades,
	useModalNavigation,
} from "services";
import { Loader, Header, PrimaryButton } from "components";
import { HedgeLinkCard } from "components";
import { useLocation } from "react-router-dom";
import showInfoModal from "../Modals/InfoModal";
import { useSelector } from "react-redux";

const INFODETAILS = [
	{
		title: "Gaining",
		description: [
			`When an open position is marked-to-market, its value is adjusted to reflect the current market price. If the market price has increased since the position was opened, the unrealised gain is displayed. This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
			`Until the position is closed, the gain is only a paper profit.`,
		],
	},
	{
		title: "Losing",
		description: [
			`When an open position is marked-to-market,\n\n its value is adjusted to reflect the current market price. If the market price decreases, the open position will reflect an unrealised loss. This represents the potential loss that would be incurred if the position were to be closed at that moment.`,
			`Like gains, these losses remain unrealised until the position is closed.`,
		],
	},
];

const RecordPaymentsHome = () => {
	const { ledgerId, tradeId } = useParams();
	const [ledgerName, setLedgerName] = useState("N/A");
	const [details, setDetails] = useState<any>({});
	const [isLoading, setIsLoading] = useState(false);
	const [hedgeList, setHedgeList] = useState<any>([]);
	const location = useLocation();
	const [dontShowUnlink, setDontShowUnlink] = useState(true);
	const { switchModalScreen, stepBackNavigation } = useModalNavigation();

	const { ledgerDetails, tradeDetails } = useSelector((state: any) => {
		const returnValue: any = {};
		returnValue["ledgerDetails"] = state?.ledgerInfo?.ledgerDetails;
		if (tradeId) {
			returnValue["tradeDetails"] =
				state?.portfolioTradesList?.tradeList[tradeId];
		}
		return returnValue;
	});

	const fetchLedgerData = async () => {
		try {
			const ledgerDetail: any = { workbook: {} };
			if (ledgerDetails && ledgerDetails?.id == ledgerId) {
				ledgerDetail["workbook"] = ledgerDetails;
			} else {
				const response: any = await getLedgersDetails(ledgerId);
				ledgerDetail["workbook"] = response.workbook;
			}
			if (ledgerDetail && ledgerDetail.workbook.dump.name) {
				setLedgerName(ledgerDetail.workbook.dump.name);
			}
		} catch (error) {
			console.log("Error while fetching ledger data");
		}
	};

	const fetchTradeData = async () => {
		try {
			if (tradeDetails && tradeDetails?.uuid == tradeId) {
				setDetails(tradeDetails);
			} else {
				const response: any = await getTradeDetails(tradeId);
				response.trade && setDetails(response.trade);
			}
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
			// setLinkedHedgesCount(result.data.length);
		} catch (error) {
			console.log("Error while getting hedge list");
		}
	};

	const handleBackBtnClick = () => {
		// navigate(`/fx-home/portfolio/ledger/${details.ledger_id}/trade/${tradeId}`);
		stepBackNavigation("record-payments");
	};

	useEffect(() => {
		init();
	}, []);

	const handleUseHedgeCallback = (hedgeID: any, link_amount: any) => {
		switchModalScreen(`trade/${tradeId}/hedge/${hedgeID}/use-hedge`, {
			state: {
				type: "transaction_via_hedge_trade",
				link_amount: link_amount,
			},
		});
	};

	useEffect(() => {
		if (location.state && location.state.showLink) {
			setDontShowUnlink(false);
		}
	}, []);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="bg-white h-full flex flex-col">
					{details && (
						<>
							<Header
								className="sticky top-0 flex items-center justify-between px-4 pb-2 mt-2"
								displayTitle={`Record Payments`}
								displaySubTitle={`Trade · ${ledgerName}`}
								backAction={handleBackBtnClick}
								showEditIcon={false}
							/>
							<div className="relative border-t-[1px] border-mine-shaft-2 overflow-y-scroll"></div>

							<div
								className={
									"px-5 pt-5 gap-y-3 flex flex-col h-[calc(100%-64px)] overflow-scroll" +
									(hedgeList.length > 2 ? " pb-20" : "")
								}
							>
								<div className="flex flex-col gap-y-4">
									<PrimaryButton
										buttonText="+ Cash payment (At market rate)"
										className="w-full"
										onClick={() => {
											// navigate(
											//   `/fx-home/portfolio/ledger/${ledgerId}/trade/${tradeId}/cash-payment`
											// );
											// addToModalScreen(`cash-payment`);
											switchModalScreen(`trade/${tradeId}/cash-payment`);
										}}
									/>
									<div className="flex gap-x-4 justify-center items-center">
										<div className="h-[2px] w-full bg-mine-shaft-2" />
										<label className="font-semibold text-mine-shaft-4">
											Or
										</label>
										<div className="h-[2px] w-full bg-mine-shaft-2" />
									</div>
									<label className="text-xl font-bold text-mine-shaft-4">
										Use linked hedges
									</label>
								</div>
								{hedgeList.map((link_data: any, index: number) => {
									return (
										<HedgeLinkCard
											key={index}
											linked_amount_override={link_data.link_amount}
											detail={link_data.hedge}
											index={index + 1}
											showInfoModal={() =>
												showInfoModal({ content: INFODETAILS, web: true })
											}
											ledger_uuid={ledgerId}
											refreshCallback={refreshCallback}
											count={hedgeList.length}
											dontShowUnlink={dontShowUnlink}
											useHedgeCallback={() => {
												handleUseHedgeCallback(
													link_data.hedge.uuid,
													link_data.link_amount.replace(/,/g, ""),
												);
											}}
										/>
									);
								})}
							</div>
						</>
					)}
				</div>
			}
		/>
	);
};

export default RecordPaymentsHome;
