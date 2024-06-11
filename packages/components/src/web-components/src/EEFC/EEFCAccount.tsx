import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	recalculateHedge,
	useModalNavigation,
	getEEFCDetails,
	recalculateEEFC,
} from "services";
import {
	CurrencyPairFlags,
	EefcSlider,
	Header,
	HedgeWarningBanner,
	Loader,
	MaturityBanner,
	PrimaryButton,
	SecondaryButton,
} from "../../../..";
import { DropdownDownArrowIcon, ForwardArrow } from "icons";
import { checkDate, formatDate, formatNumberWithCommas } from "utils";
import moment from "moment";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import showInfoModal from "../Modals/InfoModal";
import EncashPaymentDropDown from "../PortfolioContent/EncashPaymentDropDown";
import { TRADEDETAILSINFO_WEB, TRADEDETAILSINFO_MOBILE } from "utils";
import EefcTradeDetailsSection from "../../../../../../apps/wiredup/src/pages/fx/portfolio/EefcAccount/EefcTradeDetailsSection";
import EefcOtherDetailsSection from "../../../../../../apps/wiredup/src/pages/fx/portfolio/EefcAccount/EefcOtherDetailsSection";
import { updatePortfolioEEFCSpecificRecord } from "store/src/portfolioEEFCsListSlice";
import { ProfitAndLossAfterComplete } from "components";

const INFODETAILS = [
	{
		title: "Balance amount",
		description: [
			`Remaining amount in a EEFC refers to the EEFC position that is available to be used for managing potential risks due to changes in market conditions, such as fluctuations in exchange rates.`,
		],
	},
	{
		title: "Current market rate",
		description: [
			`The current market rate refers to the prevailing or current exchange rate corresponding to the exposure’s maturity period. It serves as a benchmark for calculating the moneyness of outstanding receivables, payables, and hedges undertaken for their set benchmark rate/ hedged rate.`,
		],
	},
	{
		title: "Maturity date",
		description: [
			`The maturity date for a hedge refers to the date on which the hedging contract expires or comes to an end.`,
		],
	},
	{
		title: "EEFC type",
		description: [
			`EEFC type, such as import or export, refers to the specific category of international trade activity to which an invoice belongs.`,
		],
	},
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

	{
		title: "EEFC basis",
		description: ["TBD"],
	},
];

const EEFCAccount = () => {
	const { eefcId } = useParams();
	const [details, setDetails] = useState<any>({});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showRecordPaymentOptionsModal, setShowRecordPaymentOptionsModal] =
		React.useState(false);
	const [loadingText, setLoadingText] = useState("");
	const { closeModalScreen, switchModalScreen, addToModalScreen } =
		useModalNavigation();
	const [eefcType, setEefcType] = useState("");

	const fetchEEFCData = async () => {
		try {
			setIsLoading(true);
			const response: any = await getEEFCDetails(eefcId);
			setDetails(response.eefc);
			updatePortfolioEEFCSpecificRecord(response.eefc);
		} catch (err) {
			console.log("error occured: ", err);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		details.eefc_type === "manual"
			? setEefcType("Via manual entry")
			: setEefcType("Via export receipt");
	}, [details]);

	const handleBackBtnClick = () => {
		closeModalScreen();
	};

	const handleUpdateCallback = async () => {
		setLoadingText("Updating...");
		setIsLoading(true);
		await recalculateEEFC({ eefc_id: details.uuid }).then((response: any) => {
			if (response.success && response.hedge) {
				setDetails(response.eefc);
			}
			setIsLoading(false);
		});
	};

	const DateIssueBanner = () => {
		return (
			<div className="text-bean-red-dark text-base font-bold leading-6 -tracking-[.3px] w-full">
				<div>Maturity date of the EEFC has lapsed</div>
				<p className="text-sm font-normal leading-[22px] text-bean-red-dark ">
					Please edit the maturity date for further action on the EEFC
				</p>
				<div className="flex items-center justify-between gap-x-4 mt-2">
					<SecondaryButton
						className="px-4 py-3 bg-bean-red-light border-[1px] hover:bg-bean-red-light border-bean-red-dark text-bean-red-dark text-[14px] font-semibold leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							switchModalScreen(`update-eefc-account/${eefcId}`);
						}}
						buttonText="Edit maturity"
					/>
				</div>
			</div>
		);
	};

	const MaturityComp = () => {
		return (
			<div className="text-bean-red-dark text-base font-bold leading-6 -tracking-[.3px]">
				<div>Update EEFC to view profit/ loss</div>
				<p className="text-sm font-normal leading-[22px] text-bean-red-dark ">
					Please add the missing information to view the profit/ loss on this
					EEFC.
				</p>
				<div className="flex items-center justify-between gap-x-4 mt-2">
					<PrimaryButton
						className="px-4 py-3 bg-bean-red-dark hover:bg-bean-red-dark text-white font-semibold text-[14px] leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							switchModalScreen(`update-eefc-account/${eefcId}`);
						}}
						buttonText="Update EEFC"
					/>
					<SecondaryButton
						className="px-4 py-3 bg-bean-red-light border-[1px] hover:bg-bean-red-light border-bean-red-dark text-bean-red-dark text-[14px] font-semibold leading-[22px] h-8 rounded-lg whitespace-nowrap"
						onClick={() => {
							switchModalScreen(`update-eefc-account/${eefcId}`);
						}}
						buttonText="Edit maturity"
					/>
				</div>
			</div>
		);
	};

	useEffect(() => {
		fetchEEFCData();
	}, [eefcId]);

	const handleCashConversionCallback = async () => {
		closeModalScreen();
		addToModalScreen("record-cash-payment");
	};
	const handleImportNetOffCallback = async () => {
		closeModalScreen();
		navigate("import-net-off");
	};
	const handleUseHedgesCallback = async () => {
		closeModalScreen();
		navigate("use-hedges");
	};

	return (
		<Loader
			loadingClasses="opacity-50"
			isLoading={isLoading}
			successComponent={
				<div className="bg-white h-full flex flex-col">
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
						displaySubTitle={"EEFC • " + eefcType}
						showEditIcon={false}
						showEditText={true}
						editAction={() => {
							switchModalScreen(`update-eefc-account/${details?.uuid}`);
						}}
						backAction={handleBackBtnClick}
					/>
					<div className="border-b-[1px] w-full border-mine-shaft-2 pt-2" />

					<div className="border-t-[1px] border-mine-shaft-2 overflow-y-scroll h-full">
						{parseInt(details?.remaining_amount) === 0 ? (
							<MaturityBanner
								className="z-30 relative"
								prefixColor="#fff"
								label={`EEFC completed on ${formatDate(
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
								childWrapperClassNames="w-full"
								childComponent={
									moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD") <
									moment(details?.created_at?.split(" ")[0], "YYYY-MM-DD") ? (
										<DateIssueBanner />
									) : (
										<MaturityComp />
									)
								}
							/>
						) : null}

						<div className="mx-5">
							<div className="pt-4 pb-4 bg-white z-10 relative">
								<div className="text-blackDark font-bold font-inter text-xl leading-[26px] -tracking-[.35px]">
									EEFC Account
								</div>
								<p className="font-normal text-sm leading-[22px] mt-1 text-mine-shaft-3 flex-wrap break-all">{`Amount : ${getCurrencySymbol(
									details.base_currency,
								)}${formatNumberWithCommas(details.eefc_amount)}`}</p>
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
								<EefcSlider
									details={details}
									showInfoCallback={() =>
										showInfoModal({ content: INFODETAILS, web: true })
									}
									eefcCompleted={
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

							{/* Button group just below the cards */}
							<div className="w-full flex gap-x-4 justify-center items-center my-4">
								{parseInt(details?.remaining_amount) === 0 ? null : (
									<>
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
														{"Encash"}
														{showRecordPaymentOptionsModal && (
															<EncashPaymentDropDown
																cashConversionCallback={
																	handleCashConversionCallback
																}
																importNetOffCallback={
																	handleImportNetOffCallback
																}
																useHedgesCallback={handleUseHedgesCallback}
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
									</>
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

							<EefcOtherDetailsSection
								infoDetails={TRADEDETAILSINFO_MOBILE}
								details={details}
								infoModalOverride={() => {
									showInfoModal({ content: TRADEDETAILSINFO_WEB, web: true });
								}}
							/>

							<EefcTradeDetailsSection
								infoDetails={TRADEDETAILSINFO_MOBILE}
								details={details}
								infoModalOverride={() => {
									showInfoModal({ content: TRADEDETAILSINFO_WEB, web: true });
								}}
							/>
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default EEFCAccount;
