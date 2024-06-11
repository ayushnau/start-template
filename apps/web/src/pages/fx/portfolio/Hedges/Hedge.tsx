import React, { useEffect, useState } from "react";
import HedgeDetails from "./HedgeDetails";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useNavigate, useParams } from "react-router-dom";
import { RightSideIcon, ForwardArrow } from "icons";
import {
	Loader,
	HedgeSlider,
	CancelUnlinkedHedgeModal,
	CurrencyPairFlags,
	Header,
	ProfitAndLossAfterComplete,
	PrimaryButton,
	SecondaryButton,
	InfoModal,
	MaturityBanner,
	HedgeWarningBanner,
} from "components";
import { getHedgeDetails, recalculateHedge } from "services";
import moment from "moment";
import Image1 from "../../../../icons/backgroundSuccess.png";
import {
	formatDate,
	formatNumberWithCommas,
	checkDate,
	HEDGEDETAILSINFO,
} from "utils";
import { useDispatch } from "react-redux";
import { updatePortfolioHedgeSpecificRecord } from "store";

const showInfoModal = async () => {
	await InfoModal({
		fillContent: HEDGEDETAILSINFO,
	});
};

const Hedge = () => {
	const { hedgeId } = useParams();
	const [details, setDetails] = useState<any>({});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const dispatch = useDispatch();

	const fetchHedgeData = async () => {
		try {
			setIsLoading(true);
			const response: any = await getHedgeDetails(hedgeId);
			setDetails(response.trade);
			dispatch(updatePortfolioHedgeSpecificRecord(response.trade));
		} catch (error) {
			console.log("Error Fetching Hedge Details: ", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackBtnClick = () => {
		navigate("/fx-home", {
			state: { select: "portfolio", secondTab: "hedges" },
		});
	};

	const cancelHedge = async () => {
		const unlinkedAmount = details.unlinked_amount;

		const currencyFlag = details.base_currency;
		if (unlinkedAmount == "0") {
			await CancelUnlinkedHedgeModal({
				fillContent: {
					heading:
						"Cancellation unavailable - entire hedge amount linked to trade(s)",
					description:
						"The entire Hedge amount is linked to one or more trades. To cancel them, please unlink the Hedges.",
					warningHeading: "Unlinked hedge amount ",
					warningvalue: { unlinkedAmount },
					warningCurrencyFlag: { currencyFlag },
				},
				callbackYes: () => {
					return;
				},
			});
		} else {
			await CancelUnlinkedHedgeModal({
				fillContent: {
					heading: "Cancel unlinked hedge amount",
					description:
						"Cancel the Hedge amount not linked with any trades. Alternatively, if you prefer to cancel the amount linked to the trade(s), you can do so by first unlinking the Hedge amount from the respective trade.",
					warningHeading: "Unlinked hedge amount ",
					warningvalue: { unlinkedAmount },
					warningCurrencyFlag: { currencyFlag },
				},
				callbackYes: () => {
					navigate(`/cancel-hedge/${hedgeId}`);
				},
			});
		}
	};

	const useHedge = async () => {
		const unlinkedAmount = details.unlinked_amount;

		const currencyFlag = details.base_currency;

		if (unlinkedAmount == "0") {
			await CancelUnlinkedHedgeModal({
				fillContent: {
					heading:
						"Unable to use hedge amount - entire hedge amount linked to trade(s)",
					description:
						"The entire Hedge amount is linked to one or more trades. To use them, please unlink the Hedges.",
					warningHeading: "Unlinked amount ",
					warningvalue: { unlinkedAmount },
					warningCurrencyFlag: { currencyFlag },
				},
				callbackYes: () => {
					return;
				},
			});
		} else {
			await CancelUnlinkedHedgeModal({
				fillContent: {
					heading: "Use unlinked hedge amount",
					description:
						"Use the Hedge amount not linked with any trades. Alternatively, if you prefer to utilize the amount linked to the trade(s), you can do so by accessing the respective trade.",
					warningHeading: "Unlinked hedge amount ",
					warningvalue: { unlinkedAmount },
					warningCurrencyFlag: { currencyFlag },
				},
				callbackYes: () => {
					navigate(`/use-hedge/${hedgeId}`);
				},
			});
		}
	};

	const handleUpdateCallback = async () => {
		setLoadingText("Updating..");
		setIsLoading(true);
		await recalculateHedge({ hedge_id: details.uuid }).then((response: any) => {
			if (response.success && response.hedge) {
				setDetails(response.hedge);
			}
			setIsLoading(false);
		});
	};

	useEffect(() => {
		fetchHedgeData();
	}, []);

	const MaturityComp = () => {
		return (
			<div className="text-bean-red-dark text-base font-bold leading-6 -tracking-[.3px]">
				<div>Update Hedge to view profit/ loss</div>
				<p className="text-sm font-normal leading-[22px] text-bean-red-dark ">
					Please add the missing information to view the profit/ loss on this
					Hedge.
				</p>
				<div className="flex items-center justify-between gap-x-4 mt-2">
					<PrimaryButton
						className="px-4 py-3 bg-bean-red-dark hover:bg-bean-red-dark text-white font-semibold text-[14px] leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							navigate(`/update-unlinked-hedge/${hedgeId}`);
						}}
						buttonText="Update hedge"
					/>
					<SecondaryButton
						className="px-4 py-3 bg-bean-red-light border-[1px] hover:bg-bean-red-light border-bean-red-dark text-bean-red-dark text-[14px] font-semibold leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							navigate(`/update-hedge/${hedgeId}`, {
								state: { updateDate: true },
							});
						}}
						buttonText="Edit maturity"
					/>
				</div>
			</div>
		);
	};

	const DateIssueBanner = () => {
		return (
			<div className="text-bean-red-dark text-base font-bold leading-6 -tracking-[.3px] w-full">
				<div>Maturity date of the Hedge has lapsed</div>
				<p className="text-sm font-normal leading-[22px] text-bean-red-dark ">
					Please edit the maturity date for further action on the hedge
				</p>
				<div className="flex items-center justify-between gap-x-4 mt-2">
					<SecondaryButton
						className="px-4 py-3 bg-bean-red-light border-[1px] hover:bg-bean-red-light border-bean-red-dark text-bean-red-dark text-[14px] font-semibold leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							navigate(`/update-hedge/${hedgeId}`, {
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
							<Header
								className="flex items-center justify-between px-4 py-[7px] bg-white z-30"
								displayTitle={
									<div className="flex items-center justify-start text-blackDark">
										<div>{details?.currency_pair?.split("/")[0]}</div>
										<ForwardArrow className="mx-1" />
										<div className="mr-2">
											{details?.currency_pair?.split("/")[1]}
										</div>
										{details?.currency_pair && (
											<CurrencyPairFlags flagpair={details?.currency_pair} />
										)}
									</div>
								}
								displaySubTitle="Hedge"
								showEditIcon={false}
								showEditText={true}
								editAction={() => {
									navigate(`/update-hedge/${details?.uuid}`);
								}}
								backAction={handleBackBtnClick}
							/>

							<div className="border-t-[1px] border-mine-shaft-2 overflow-y-scroll">
								{parseInt(details?.remaining_amount) === 0 ? (
									<MaturityBanner
										className="z-30 relative"
										prefixColor="#fff"
										label={`Hedge completed on ${formatDate(
											details?.maturity_date?.split(" ")[0],
										)}`}
									/>
								) : null}
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
											moment(
												details?.created_at?.split(" ")[0],
												"YYYY-MM-DD",
											) ? (
												<DateIssueBanner />
											) : (
												<MaturityComp />
											)
										}
									/>
								) : null}

								<div className="mx-5">
									{parseInt(details?.remaining_amount) === 0 &&
									parseInt(details?.pnl) > 0 ? (
										<img
											className="absolute top-0 left-0 z-20"
											src={Image1}
											alt=""
										/>
									) : null}
									<div className="pt-4 pb-4 bg-white z-10 relative">
										<div className="text-blackDark font-bold font-inter text-xl leading-[26px] -tracking-[.35px]">
											Hedge details
										</div>
										<p className="font-normal text-sm leading-[22px] mt-1 text-mine-shaft-3 flex-wrap break-all">
											{`Amount : ${getCurrencySymbol(
												details.base_currency,
											)}${formatNumberWithCommas(details.hedge_amount)}`}
										</p>
									</div>
									{parseInt(details?.remaining_amount) === 0 ? (
										<ProfitAndLossAfterComplete
											className="z-30"
											profit={details?.pnl >= 0}
											quoteCurrency={details?.quote_currency}
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
										<>
											{" "}
											<HedgeSlider
												details={details}
												showInfoCallback={showInfoModal}
												hedgeCompleted={
													checkDate(
														moment(
															details?.maturity_date?.split(" ")[0],
															"YYYY-MM-DD",
														),
													) && parseInt(details?.remaining_amount) !== 0
												}
												handleUpdateCallback={handleUpdateCallback}
											/>
											{checkDate(
												moment(
													details?.maturity_date?.split(" ")[0],
													"YYYY-MM-DD",
												),
											) && parseInt(details?.remaining_amount) !== 0 ? null : (
												<div className="flex items-center justify-between gap-x-4 mt-2 pt-2">
													<SecondaryButton
														className=" py-3 px-4 flex justify-center items-center flex-1 gap-[10px] w-full text-red-core rounded-xl border border-bean-red-light bg-transparent hover:bg-transparent text-center font-variant-ligatures-none font-semibold leading-6"
														onClick={() => cancelHedge()}
														buttonText="Cancel hedge"
													/>
													<PrimaryButton
														className=" py-3 px-4 flex justify-center items-center flex-1 gap-[10px] w-full text-white rounded-xl text-center font-variant-ligatures-none font-semibold leading-6"
														onClick={() => useHedge()}
														buttonText="Use hedge"
													/>
												</div>
											)}
										</>
									)}
									<SecondaryButton
										className={`border-none z-40 hover:outline-0 h-8 hover:bg-transparent ${
											checkDate(
												moment(
													details?.maturity_date?.split(" ")[0],
													"YYYY-MM-DD",
												),
											) && parseInt(details?.remaining_amount) === 0
												? "mt-5 mb-1"
												: "mt-4"
										}`}
										onClick={() => {
											navigate("transactions");
										}}
										buttonText={
											<div className="flex z-50 items-center">
												<div className="border-b-[1px] font-inter font-semibold text-sm border-mine-shaft-4 ">
													Transaction history
												</div>
												<div>
													<RightSideIcon color="#717171" />
												</div>
											</div>
										}
									/>
									<HedgeDetails
										details={details}
										showInfoCallback={showInfoModal}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			}
			loadingText={loadingText}
		/>
	);
};

export default Hedge;
