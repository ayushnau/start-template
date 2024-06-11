import React, { useEffect, useState } from "react";
import TradeHeader from "./TradeHeader";
import { useParams, useNavigate } from "react-router-dom";
import {
	PrimaryButton,
	TradeSlider,
	SecondaryButton,
	Loader,
	HedgeWarningBanner,
	MaturityBanner,
	ProfitAndLossAfterComplete,
} from "components";
import TradeHedgeDetails from "./TradeHedgeDetails";
import TradeDetailsSection from "./TradeDetailsSection";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { RightSideIcon } from "icons";
import moment from "moment";
import { getTradeDetails, getLedgersDetails, recalculateTrade } from "services";
import {
	formatDate,
	formatNumberWithCommas,
	checkDate,
	TRADEDETAILSINFO as InfoDetails,
} from "utils";
import { useSelector } from "react-redux";

const Trade = () => {
	const { ledgerId, tradeId } = useParams();
	const [details, setDetails] = useState<any>({});
	const [ledgerName, setLedgerName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");

	const navigate = useNavigate();
	const ledger = useSelector((state: any) => state?.ledgerInfo?.ledgerDetails);

	const init = async () => {
		try {
			setIsLoading(true);
			await fetchTradeData();
			await getDetails();
		} catch (error) {
			console.log(">Error fetching trade details: ", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const getDetails = async () => {
		try {
			setIsLoading(true);
			if (ledger && ledger.id == ledgerId) {
				setLedgerName(ledger.dump.name);
			} else {
				const response: any = await getLedgersDetails(ledgerId);
				if (response.sucess && response.workbook.dump.name) {
					setLedgerName(response.workbook.dump.name);
				}
			}
		} catch (error) {
			console.log("Error fetching Details");
		} finally {
			setIsLoading(false);
		}
	};

	const fetchTradeData = async () => {
		try {
			const response: any = await getTradeDetails(tradeId);
			response.trade["linkable_hedges_exist"] = response?.linkable_hedges_exist;
			setDetails(response.trade);
		} catch (error) {
			console.log(error);
		}
	};

	const handleBackBtnClick = () => {
		navigate(`/ledger/${details.ledger_id}`);
	};

	useEffect(() => {
		init();
	}, []);

	const handleUpdateCallback = async () => {
		setLoadingText("Updating..");
		setIsLoading(true);
		await recalculateTrade({ trade_id: details.uuid }).then((response: any) => {
			if (response.success && response.trade) {
				setDetails(response.trade);
			}
			setIsLoading(false);
		});
	};

	const MaturityComp = () => {
		return (
			<div>
				<div className="text-bean-red-dark text-base font-bold font-inter leading-6 -tracking-[.3px]">
					Trade matured! Update payment details to view profit/loss
				</div>
				<p className="text-sm font-normal font-inter leading-[22px] mt-1 text-bean-red-dark ">
					Please add the missing information to view the profit/loss on this
					trade.
				</p>
				<div className="flex items-center justify-between gap-x-4 mt-2">
					<PrimaryButton
						className="px-4 py-3 bg-bean-red-dark hover:bg-bean-red-dark text-white font-semibold text-[14px] leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							if (parseInt(details.hedged_amount) === 0) {
								navigate(`/ledger/${ledgerId}/trade/${tradeId}/cash-payment`);
							} else {
								navigate(
									`/ledger/${ledgerId}/trade/${tradeId}/record-payments`,
									{
										state: { showLink: true },
									},
								);
							}
						}}
						buttonText="Record payment"
					/>
					<SecondaryButton
						className="px-4 py-3 bg-bean-red-light border-[1px] hover:bg-bean-red-light border-bean-red-dark text-bean-red-dark text-[14px] font-semibold leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							navigate(`/ledger/${ledgerId}/update-trade/${tradeId}`, {
								state: { updateDate: true },
							});
						}}
						buttonText="Edit maturity"
					/>
				</div>
			</div>
		);
	};

	const DateIssueComp = () => {
		return (
			<div>
				<div className="text-bean-red-dark text-base font-bold font-inter leading-6 -tracking-[.3px]">
					Maturity date of the Trade has lapsed
				</div>
				<p className="text-sm font-normal font-inter leading-[22px] mt-1 text-bean-red-dark ">
					Please edit the maturity date for further action on the Trade
				</p>
				<div className="flex items-center justify-between gap-x-4 mt-2">
					<SecondaryButton
						className="px-4 py-3 bg-bean-red-light border-[1px] hover:bg-bean-red-light border-bean-red-dark text-bean-red-dark text-[14px] font-semibold leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							navigate(`/ledger/${ledgerId}/update-trade/${tradeId}`, {
								state: { updateDate: true },
							});
						}}
						buttonText="Edit maturity"
					/>
				</div>
			</div>
		);
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="bg-white h-full flex flex-col">
					{details && (
						<>
							<TradeHeader
								ledgerId={ledgerId}
								tradeId={tradeId}
								ledgerName={ledgerName}
								flagPair={
									details.currency_pair ? details.currency_pair : "USD/INR"
								}
								handleBackBtnClick={handleBackBtnClick}
							/>
							{(checkDate(
								moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD"),
							) ||
								moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD") <
									moment(details?.created_at?.split(" ")[0], "YYYY-MM-DD")) &&
							parseInt(details?.remaining_amount) !== 0 ? (
								<HedgeWarningBanner
									childComponent={
										moment(
											details?.maturity_date?.split(" ")[0],
											"YYYY-MM-DD",
										) <
										moment(details?.created_at?.split(" ")[0], "YYYY-MM-DD") ? (
											<DateIssueComp />
										) : (
											<MaturityComp />
										)
									}
								/>
							) : null}
							{parseInt(details?.remaining_amount) === 0 ? (
								<MaturityBanner
									className="z-20 relative"
									prefixColor="#fff"
									label={`Trade completed on ${
										formatDate(details?.last_transaction_date?.split(" ")[0]) ||
										formatDate(details?.maturity_date?.split(" ")[0])
									}`}
								/>
							) : null}
							<div className="border-t-[1px] border-mine-shaft-2 overflow-y-scroll">
								<div className=" mx-5">
									<div className="py-4">
										<div className="text-blackDark font-bold text-xl leading-[26px] -tracking-[.35px]">
											Trade details
										</div>
										<p className="font-normal font-inter text-sm leading-[22px] text-mine-shaft-3 mt-1 flex-wrap break-all ">
											{" "}
											Invoice value : {getCurrencySymbol(details.base_currency)}
											{formatNumberWithCommas(details.trade_amount)}
										</p>
									</div>
									{parseInt(details?.remaining_amount) === 0 ? (
										<ProfitAndLossAfterComplete
											quoteCurrency={details?.quote_currency}
											className="z-30"
											profit={details?.pnl >= 0}
											description={
												details?.pnl >= 0 ? (
													<div>
														<div>Congratulations,</div>{" "}
														<div> you’ve made a profit of</div>
													</div>
												) : (
													<div>
														<div>Uh Oh,</div> <div> there’s been a loss of</div>
													</div>
												)
											}
											value={details?.pnl}
										/>
									) : (
										<TradeSlider
											details={details}
											infoDetails={InfoDetails}
											tradeCompleted={
												checkDate(
													moment(
														details?.maturity_date?.split(" ")[0],
														"YYYY-MM-DD",
													),
												) && parseInt(details?.remaining_amount) !== 0
											}
											handleUpdateCallback={handleUpdateCallback}
										/>
									)}

									{parseInt(details?.remaining_amount) === 0 ? null : (
										<PrimaryButton
											className="mt-4 py-3 px-4 w-full"
											onClick={() => {
												if (parseInt(details.hedged_amount) === 0) {
													navigate(
														`/ledger/${ledgerId}/trade/${tradeId}/cash-payment`,
													);
												} else {
													navigate(
														`/ledger/${ledgerId}/trade/${tradeId}/record-payments`,
														{
															state: {
																showLink:
																	checkDate(
																		moment(
																			details?.maturity_date?.split(" ")[0],
																			"YYYY-MM-DD",
																		),
																	) && parseInt(details?.remaining_amount) !== 0
																		? true
																		: false,
															},
														},
													);
												}
											}}
											buttonText="Record payment"
										/>
									)}

									<SecondaryButton
										className={`border-none h-8  my-4 hover:bg-transparent hover:outline-0 ${
											checkDate(
												moment(
													details?.maturity_date?.split(" ")[0],
													"YYYY-MM-DD",
												),
											) && parseInt(details?.remaining_amount) === 0
												? "mb-5 mt-5"
												: "py-2"
										}`}
										onClick={() => {
											navigate("transactions");
										}}
										buttonText={
											<div className="flex items-center">
												<div className="border-b-[1px] font-inter font-semibold text-sm border-mine-shaft-4 ">
													Transaction history
												</div>
												<div>
													<RightSideIcon color="#717171" />
												</div>
											</div>
										}
									/>

									<TradeHedgeDetails
										infoDetails={InfoDetails}
										details={details}
										trade_uuid={tradeId}
										ledger_uuid={ledgerId}
									/>
									<TradeDetailsSection
										infoDetails={InfoDetails}
										details={details}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			}
			loadingText={loadingText ? loadingText : ""}
		/>
	);
};

export default Trade;
