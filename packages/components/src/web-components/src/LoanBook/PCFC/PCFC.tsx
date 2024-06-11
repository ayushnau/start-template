import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModalNavigation, recalculateEEFC, getPcfcById } from "services";
import { ForwardArrow } from "icons";
import { checkDate, formatNumberWithCommas } from "utils";
import moment from "moment";
import { TRADEDETAILSINFO_WEB, TRADEDETAILSINFO_MOBILE } from "utils";
import {
	CurrencyPairFlags,
	Header,
	Loader,
	PCFCSlider,
	PrimaryButton,
	SecondaryButton,
} from "components";
import showInfoModal from "../../../../../../../packages/components/src/web-components/src/Modals/InfoModal";
import PCFCTradeDetailsSection from "../../../../../../../apps/wiredup/src/pages/fx/LoanBook/PCFC/PCFCTradeDetailsSection";
import PCFCOtherDetailsSection from "../../../../../../../apps/wiredup/src/pages/fx/LoanBook/PCFC/PCFCOtherDetailsSection";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { currentSelectedPcfcRecord } from "store";
import { useDispatch } from "react-redux";
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

const PCFC = () => {
	const { pcfcId } = useParams();
	console.log("pcfcId: ", pcfcId);
	const [details, setDetails] = useState<any>({});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const { closeModalScreen, switchModalScreen, addToModalScreen } =
		useModalNavigation();
	const dispatch = useDispatch();
	const [eefcType, setEefcType] = useState("");

	const fetchEEFCData = async () => {
		try {
			setIsLoading(true);
			const response: any = await getPcfcById(pcfcId);
			setDetails(response.pcfc);
			dispatch(currentSelectedPcfcRecord(response.pcfc));
		} catch (err) {
			console.log("error occured: ", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		details?.eefc_type === "manual"
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

	useEffect(() => {
		fetchEEFCData();
	}, [pcfcId]);

	const handleRepayCTA = () => {
		closeModalScreen();
		navigate(`/fx-home/loan-book/loan-repay/${pcfcId}`);
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
						displaySubTitle={"PCFC/PSFC Loan"}
						showEditIcon={false}
						showEditText={true}
						editAction={() => {
							switchModalScreen(`update-pcfc/${details?.uuid}`);
						}}
						backAction={handleBackBtnClick}
					/>
					<div className="border-b-[1px] w-full border-mine-shaft-2 pt-2" />

					<div className="border-t-[1px] border-mine-shaft-2 overflow-y-scroll h-full">
						<div className="mx-5">
							<div className="pt-4 pb-4 bg-white z-10 relative">
								<div className="text-blackDark font-bold font-inter text-xl leading-[26px] -tracking-[.35px]">
									Loans details
								</div>

								<p className="font-normal text-sm leading-[22px] mt-1 text-mine-shaft-3 flex-wrap break-all">{`Amount : ${getCurrencySymbol(
									details?.base_currency,
								)}${formatNumberWithCommas(details.pcfc_amount)}`}</p>
							</div>

							<PCFCSlider
								details={details}
								showInfoCallback={() =>
									showInfoModal({ content: INFODETAILS, web: true })
								}
								eefcCompleted={
									checkDate(
										moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD"),
									) && parseInt(details?.remaining_amount) !== 0
								}
								handleUpdateCallback={handleUpdateCallback}
							/>

							{/* Button group just below the cards */}
							<div className="w-full flex gap-x-4 justify-center items-center my-4">
								{parseInt(details?.remaining_amount) === 0 ? null : (
									<>
										<PrimaryButton
											className="py-3 px-4 h-12 w-full relative flex justify-center items-center hover:bg-cornflower-blue-3"
											onClick={handleRepayCTA}
											buttonText={
												<>
													<label className="text-white text-center font-inter text-base font-semibold leading-6">
														{"Repay"}
													</label>
												</>
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

							<PCFCOtherDetailsSection
								infoDetails={TRADEDETAILSINFO_MOBILE}
								details={details}
								infoModalOverride={() => {
									showInfoModal({ content: TRADEDETAILSINFO_WEB, web: true });
								}}
							/>

							<PCFCTradeDetailsSection
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

export default PCFC;
