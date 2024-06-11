/*
 * This is Web Page: TRADE_DETAILS_IDENTIFIER
 * This is the trade details page and display all the information about a Single Trade and have CTA to navigate to other
 * possible actions that can be taken on a trade.
 */

import React from "react";
import { useEffect, useState } from "react";
import TradeHeader from "../../../../../../apps/wiredup/src/pages/fx/portfolio/Trade/TradeHeader";
import { useParams, useNavigate } from "react-router-dom";
import {
	getTradeDetails,
	getLedgersDetails,
	useModalNavigation,
	getAllPcfc,
} from "services";
import { PrimaryButton, TradeSlider, SecondaryButton } from "components";
import TradeHedgeDetails from "../../../../../../apps/wiredup/src/pages/fx/portfolio/Trade/TradeHedgeDetails";
import TradeDetailsSection from "../../../../../../apps/wiredup/src/pages/fx/portfolio/Trade/TradeDetailsSection";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { DropdownDownArrowIcon } from "icons";
import { Loader } from "components";
import { checkDate } from "utils";
import { HedgeWarningBanner } from "components";
import moment from "moment";
import { MaturityBanner } from "components";
import { formatDate } from "utils";
import { ProfitAndLossAfterComplete } from "components";
import { recalculateTrade } from "services";
import {
	formatNumberWithCommas,
	TRADEDETAILSINFO_WEB,
	TRADEDETAILSINFO_MOBILE,
} from "utils";
import showInfoModal from "../Modals/InfoModal";
import { useSelector, useDispatch } from "react-redux";
import { setToastMessage, updatePortfolioTradeSpecificRecord } from "store";
import RecordPaymentsDropdown from "./RecordPaymentsDropdown";

const Trade = () => {
	const { ledgerId, tradeId } = useParams();
	const [details, setDetails] = useState<any>({});
	const [isLoading, setIsLoading] = useState(true);
	const [ledgerName, setLedgerName] = useState("");
	const [loadingText, setLoadingText] = useState("");
	const [showRecordPaymentOptionsModal, setShowRecordPaymentOptionsModal] =
		React.useState(false);

	const { closeModalScreen, switchModalScreen, addToModalScreen } =
		useModalNavigation();
	const { id, name } = useSelector((state: any) => {
		const value = state?.ledgerInfo?.ledgerDetails;
		const modalOpened = state?.portfolioModal.displayModalScreen;
		return { id: value.id, name: value.dump.name, modalOpened };
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const init = async () => {
		try {
			setIsLoading(true);
			await fetchTradeData();
			await getDetails();
		} catch (error) {
			console.log("Error in Trade Details screen:", error);
			throw error;
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	const getDetails = async () => {
		try {
			if (ledgerId == id) {
				setLedgerName(name);
			} else {
				const response: any = await getLedgersDetails(ledgerId);
				if (response.sucess && response.workbook.dump.name) {
					setLedgerName(response.workbook.dump.name);
				}
			}
		} catch (error) {
			console.log("Error fetching Details");
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
		// navigate(`/fx-home/portfolio/ledger/${details.ledger_id}`);
		closeModalScreen();
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
				dispatch(updatePortfolioTradeSpecificRecord(response.trade));
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
								addToModalScreen("cash-payment");
							} else {
								addToModalScreen("record-payments", {
									state: { showLink: true },
								});
							}
						}}
						buttonText="Record payment"
					/>
					<SecondaryButton
						className="px-4 py-3 bg-bean-red-light border-[1px] hover:bg-bean-red-light border-bean-red-dark text-bean-red-dark text-[14px] font-semibold leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							switchModalScreen(`update-trade/${tradeId}`, {
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
							switchModalScreen(`update-trade/${tradeId}`, {
								state: { updateDate: true },
							});
						}}
						buttonText="Edit maturity"
					/>
				</div>
			</div>
		);
	};

	const handleCashPaymentOptionClick = () => {
		closeModalScreen();
		addToModalScreen("record-cash-bulk-payment");
	};

	const handleUseHedgeOptionClick = () => {
		closeModalScreen();
		navigate("use-hedges");
	};

	const handleAddBankChargesCallback = () => {
		closeModalScreen();
		addToModalScreen("add-bank-charges");
	};
	const handleTransferPaymentCallback = () => {
		closeModalScreen();
		addToModalScreen("transfer-to-eefc");
	};

	const handleRepayPCFCLoanCallback = async () => {
		const response: any = await getAllPcfc({
			currency_pair: details?.currency_pair,
			status: "active",
		});

		if (response.pcfc.length === 0) {
			dispatch(
				setToastMessage({
					message: `No PCFC Loan found`,
					type: "error",
					className: "bg-[#BA1A1A]",
				}),
			);
		} else {
			closeModalScreen();
			navigate("record-pcfc-repayment");
		}
	};

	return (
		<Loader
			loadingClasses="mx-0 opacity-50"
			isLoading={isLoading}
			successComponent={
				<div className="bg-white h-screen flex flex-col">
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
								web
							/>
							{(checkDate(
								moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD"),
							) ||
								moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD") <
									moment(details?.created_at?.split(" ")[0], "YYYY-MM-DD")) &&
							parseInt(details?.remaining_amount) !== 0 ? (
								<HedgeWarningBanner
									childWrapperClassNames="w-full"
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
									label={`Trade completed on ${formatDate(
										details?.maturity_date?.split(" ")[0],
									)}`}
								/>
							) : null}
							<div className="border-t-[1px] border-mine-shaft-2 overflow-y-scroll pb-2 px-6">
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
										infoDetails={TRADEDETAILSINFO_MOBILE}
										tradeCompleted={
											checkDate(
												moment(
													details?.maturity_date?.split(" ")[0],
													"YYYY-MM-DD",
												),
											) && parseInt(details?.remaining_amount) !== 0
										}
										handleUpdateCallback={handleUpdateCallback}
										infoModalOverride={() => {
											showInfoModal({
												content: TRADEDETAILSINFO_WEB,
												web: true,
											});
										}}
									/>
								)}

								{/* Buttton group just below the cards */}
								<div className="w-full flex gap-x-4 justify-center items-center my-4">
									{parseInt(details?.remaining_amount) === 0 ? null : (
										<PrimaryButton
											className="py-3 px-4 h-12 w-full relative flex justify-center items-center hover:bg-cornflower-blue-3"
											onClick={() => {
												setShowRecordPaymentOptionsModal((prev) => !prev);
											}}
											onMouseLeave={() => {
												setShowRecordPaymentOptionsModal(false);
											}}
											buttonText={
												<>
													<label className="text-white text-center font-inter text-base font-semibold leading-6">
														{"Record payment"}
														{showRecordPaymentOptionsModal && (
															<RecordPaymentsDropdown
																useHedgeCallback={handleUseHedgeOptionClick}
																cashPaymentCallback={
																	handleCashPaymentOptionClick
																}
																transferPaymentCallback={
																	handleTransferPaymentCallback
																}
																addBankChargesCallback={
																	handleAddBankChargesCallback
																}
																repayPCFCCallback={handleRepayPCFCLoanCallback}
																tradeType={details.trade_type}
															/>
														)}
													</label>
												</>
											}
											buttonSuffix={
												<div className="absolute right-[25.5px] top-[13px]">
													<DropdownDownArrowIcon />
												</div>
											}
										/>
									)}

									<div className="w-full flex items-center justify-center">
										<SecondaryButton
											className={`w-fit border-none h-8 hover:bg-transparent hover:outline-0 p-0 ${
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
												addToModalScreen("transactions");
											}}
											buttonText={
												<div className="flex items-center">
													<div className="border-b-[1px] font-inter font-semibold text-sm border-mine-shaft-4 ">
														Transaction history
													</div>
												</div>
											}
										/>
									</div>
								</div>

								<TradeHedgeDetails
									infoDetails={TRADEDETAILSINFO_MOBILE}
									details={details}
									trade_uuid={tradeId}
									ledger_uuid={ledgerId}
									infoModalOverride={() => {
										showInfoModal({ content: TRADEDETAILSINFO_WEB, web: true });
									}}
									web={true}
								/>
								<TradeDetailsSection
									infoDetails={TRADEDETAILSINFO_MOBILE}
									details={details}
									infoModalOverride={() => {
										showInfoModal({ content: TRADEDETAILSINFO_WEB, web: true });
									}}
								/>
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
