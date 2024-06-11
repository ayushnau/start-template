import { useEffect, useState } from "react";
import { getAllHedgesLinkedWithTrades } from "services";
import { Loader, Header, PrimaryButton } from "components";
import { HedgeLinkCard, InfoModal } from "components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RECORDPAYMENTSHOMEINFO } from "utils";

const showInfoModal = async () => {
	await InfoModal({
		fillContent: RECORDPAYMENTSHOMEINFO,
	});
};

const RecordPaymentsHome = () => {
	const { ledgerId, tradeId } = useParams();
	const [ledgerName, setLedgerName] = useState("N/A");
	const [details, setDetails] = useState<any>({});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [hedgeList, setHedgeList] = useState<any>([]);
	const location = useLocation();
	const [dontShowUnlink, setDontShowUnlink] = useState(true);
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
			console.log("Error while Fetching Data:", error);
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
		} catch (error) {
			console.log("Error while getting hedge list");
		}
	};

	const handleBackBtnClick = () => {
		navigate(`/ledger/${details.ledger_id}/trade/${tradeId}`);
	};

	useEffect(() => {
		init();
	}, []);

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
											navigate(
												`/ledger/${ledgerId}/trade/${tradeId}/cash-payment`,
											);
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
											showInfoModal={showInfoModal}
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
