import React, { useEffect, useState } from "react";
import { getAllHedgesLinkedWithTrades } from "services";
import {
	HedgeLinkCard,
	InfoModal,
	UpdatedPrompt,
	showLinkModal,
	PrimaryButton,
	Loader,
	Header,
} from "components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment-timezone";

const showInfoModal = async () => {
	await InfoModal({
		fillContent: [
			{
				title: "Gaining",
				description: `When a Hedge is marked-to-market, its value is refreshed to reflect its worth at the current market price. `,
				subDescription: `If the market price has increased for an import hedge or if the market price has decreased for an export hedge since the hedge was initiated, the unrealised gain is displayed. This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
			},
			{
				title: "Losing",
				description: `When a Hedge is marked-to-market, its value is refreshed to reflect its worth at the current market price. `,
				subDescription: `If the market price has decreased for an import hedge or if the market price has increased for an export hedge since the hedge was initiated, the unrealised loss is displayed. This loss represents the potential loss that could be incurred if the position were to be closed at that moment. `,
			},
		],
	});
};

const LinkedHedges: React.FC = () => {
	const { ledgerId, tradeId } = useParams();
	const [ledgerName, setLedgerName] = useState("N/A");
	const [details, setDetails] = useState<any>({});
	const [linkedHedgesCount, setLinkedHedgesCount] = useState(0);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [hedgeList, setHedgeList] = useState<any>([]);
	const [refresh, setRefresh] = useState(new Date());
	const [loadingText, setLoading] = useState("");

	const { ledgerDetails, tradeDetails } = useSelector((state: any) => {
		const returnValue: any = {};
		returnValue["ledgerDetails"] = state?.ledgerInfo?.ledgerDetails;
		if (tradeId) {
			returnValue["tradeDetails"] =
				state?.portfolioTradesList?.tradeList[tradeId];
		}
		return returnValue;
	});

	const init = async () => {
		try {
			setIsLoading(true);
			await getLinkedHedgesList();
			setDetails(tradeDetails);
			setLedgerName(ledgerDetails?.dump?.name);
		} catch (error) {
			console.log("Error while Fetching Data :", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
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
		navigate(`/ledger/${details.ledger_id}/trade/${tradeId}`);
	};

	useEffect(() => {
		init();
	}, [refresh]);

	const navigateToHedgesPage = () => {
		navigate(`/add-hedge`, {
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
		navigate(`/ledger/${ledgerId}/trade/${tradeId}/link-hedge`);
	};

	const handleUseHedgeCallback = (hedgeID: any, link_amount: any) => {
		navigate(
			`/ledger/${ledgerId}/trade/${tradeId}/hedge/${hedgeID}/use-hedge`,
			{
				state: {
					type: "transaction_via_hedge_trade",
					link_amount: link_amount,
				},
			},
		);
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
									.utc(details?.rates_updated_at || details?.updated_at)
									.tz("Asia/Kolkata")
									.format("DD MMM 'YY")} at ${moment
									.utc(details?.rates_updated_at || details?.updated_at)
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
											showInfoModal={showInfoModal}
											ledger_uuid={ledgerId}
											refreshCallback={refreshCallback}
											count={hedgeList.length}
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
					<div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white shadow-boxShadow">
						<PrimaryButton
							buttonText="Link more hedges"
							className="w-full"
							onClick={() => {
								showLinkModal({
									callbackCreate: navigateToHedgesPage,
									callbackLink: selectExistingHedgesNaigation,
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
