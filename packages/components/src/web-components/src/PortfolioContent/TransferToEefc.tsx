import React, { useState, useEffect } from "react";
import {
	CurrencyPairFlags,
	Header,
	Loader,
	PrimaryButton,
	PrimaryInput,
	UnderlineButton,
	WarningBanner,
} from "components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createTradeEEFCTransferAccount, useModalNavigation } from "services";
import { useSelector, useDispatch } from "react-redux";
import { setToastMessage, StoreState } from "store";
import { CalenderIcon, ForwardArrow, IIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { SubTitle2 } from "../../../Typography";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import CalendarModal from "../Support/CalendarModal";
import moment from "moment";
import { CalendarModal as CalendarModalMobile } from "components";
import { updatePortfolioTradeSpecificRecord } from "store";
import { setEefcCount } from "store/web-src/src/forexEntityCountSlice";

interface TransferToEefcProps {
	setCompletePayload?: any;
	currentPayload?: any;
	web?: boolean;
}

const TransferToEefc: React.FC<TransferToEefcProps> = ({ web = true }) => {
	const params = useParams();
	const { tradeId } = params;
	const { closeModalScreen, switchModalScreen } = useModalNavigation();
	const [isDisable, setIsDisable] = useState(true);
	const [openDateModal, setOpenDateModal] = useState(false);
	const [openDateModal2, setOpenDateModal2] = useState(false);
	const [dateObj, setDateObj] = useState(new Date());
	const [isLoading, setIsLoading] = useState("");
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [dateType, setDateType] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const trade = useSelector((state: StoreState) => {
		const tradeList: any = state?.portfolioTradesList?.tradeList;
		if (tradeId) {
			return tradeList[tradeId];
		}
	});

	const count = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	const form = useBetaForm({
		eefc_amount: "",
		credit_date: "",
		maturity_date: "",
	});

	useEffect(() => {
		if (form.getField("credit_date") && form.getField("maturity_date")) {
			setIsDisable(false);
		} else {
			setIsDisable(true);
		}
	}, [form]);

	const validateForm = () => {
		if (isNaN(form.value.eefc_amount.replaceAll(",", ""))) {
			return false;
		}
		return true;
	};

	const handleSaveTransferToEefc = async () => {
		form.value.eefc_amount = form.value.eefc_amount.replace(/,/g, "");
		const payload = form.value;

		if (validateForm()) {
			try {
				setIsLoading("save");
				const response: any = await createTradeEEFCTransferAccount(
					payload,
					tradeId,
				);
				if (response.success) {
					dispatch(updatePortfolioTradeSpecificRecord(response.trade));
					dispatch(setEefcCount(parseInt(count.eefcCount) + 1));
					dispatch(
						setToastMessage({
							message: `Payment recorded!`,
							type: "neutral",
						}),
					);
					switchModalScreen(`trade/${tradeId}`);
				}
			} catch (err) {
				console.log("Error occured", err);
				dispatch(
					setToastMessage({
						message: `⚠️ Error: Please try again`,
						type: "error",
						className: "bg-[#BA1A1A]",
					}),
				);
				closeModalScreen();
			} finally {
				setIsLoading("");
			}
		}
	};

	const showCalendarModal = async (label: any) => {
		if (!web) {
			const details = {
				setDateObj: setDateObj,
				form: form,
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
				minDate:
					label === "credit_date"
						? moment().subtract(45, "days").toDate()
						: moment().toDate(),
				maxDate: label === "credit_date" ? moment().toDate() : undefined,
				form_field: `${
					label === "credit_date" ? "credit_date" : "maturity_date"
				}`,
				no_date_limit: true,
				customAlertMsg:
					"please select a date less than 2 years of current date",
			};

			const response = await CalendarModalMobile({
				details: details,
			});
		} else {
			setDateType(label);
			if (label === "credit_date") setOpenDateModal(true);
			if (label === "maturity_date") setOpenDateModal2(true);
		}
	};

	const handleCloseModalCallback = (date: Date) => {
		setOpenDateModal(false);
		if (dateType === "credit_date") {
			form.setField("credit_date", moment(date).format("YYYY-MM-DD"));
		} else {
			form.setField("maturity_date", moment(date).format("YYYY-MM-DD"));
		}
	};
	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	return (
		<Loader
			loadingText={"Loading"}
			isLoading={isLoading !== "" ? true : false}
			successComponent={
				<div className="relative pt-4 bg-white flex flex-col h-full overflow-y-hidden">
					<Header
						className="flex items-center justify-between px-6 py-[10px] bg-white z-30"
						displayTitle="Transfer to EEFC"
						displayTitleStyles="-tracking-[0.3px]"
						displaySubTitle={
							<div className="flex items-center justify-start text-blackDark">
								<div>{trade?.currency_pair?.split("/")[0]}</div>
								<ForwardArrow className="mx-1 scale-75" />
								<div className="mr-2">
									{trade?.currency_pair?.split("/")[1]}
								</div>
								{trade?.currency_pair && (
									<CurrencyPairFlags flagpair={trade?.currency_pair} />
								)}
							</div>
						}
						displaySubTitleStyles="text-xs font-normal leading-4 text-mine-shaft-3"
						subtitleWrapper="ml-[10px]"
						showEditIcon={false}
						backAction={() => switchModalScreen(`trade/${trade?.uuid}`)}
					/>
					<div>
						<WarningBanner
							className="text-sm font-inter font-normal leading-[22px]"
							label={"Unhedged amount"}
							amount={`${
								trade && trade?.unhedged_amount
									? getCurrencySymbol(trade.base_currency)
									: ""
							}${
								trade && trade?.unhedged_amount
									? formatNumberWithCommas(trade.unhedged_amount)
									: ""
							}`}
						/>
						<div className="px-6 mt-[18px] flex flex-col gap-y-4">
							<SubTitle2 classes="text-mine-shaft-3">
								Please enter details of the payment received or paid. It will
								update your remaining amount to pay or receive automatically.
							</SubTitle2>
						</div>
						<div className="flex flex-col mx-5 mt-4 gap-y-4 pb-[76px] flex-1 overflow-y-scroll ">
							<PrimaryInput
								form={form}
								field="eefc_amount"
								fieldType={"number"}
								numberOnly={true}
								placeholder={{
									main: "Amount ",
									subString: trade?.currency_pair?.split("/")[0]
										? `e.g:  ${
												getCurrencySymbol(
													trade?.currency_pair?.split("/")[0],
												) || trade?.currency_pair?.split("/")[0]
										  } 500,00`
										: "e.g: $500,000",
								}}
								prefix={
									getCurrencySymbol(trade?.currency_pair?.split("/")[0])
										? getCurrencySymbol(trade?.currency_pair?.split("/")[0])
										: trade?.currency_pair?.split("/")[0]
								}
								errorMsg={
									+form.value.eefc_amount <= +trade.unhedged_amount
										? undefined
										: "Entered amount can not be greater than the unhedged amount"
								}
								disabled={false}
							/>

							{openDateModal && (
								<CalendarModal
									classes="top-1/2 -translate-y-1/2"
									closeModalCallback={(date: Date) => {
										handleCloseModalCallback(date);
									}}
									outsideClickCallback={() => {
										setOpenDateModal(false);
									}}
									date={form.getField("credit_date")}
									minDate={moment().subtract(45, "days").toDate()}
									maxDate={moment().toDate()}
									checkWeekend={dateType === "credit_date" ? false : true}
								/>
							)}
							{openDateModal2 && (
								<CalendarModal
									classes="top-1/2 -translate-y-1/2"
									closeModalCallback={(date: Date) => {
										handleCloseModalCallback(date);
									}}
									outsideClickCallback={() => {
										setOpenDateModal2(false);
									}}
									date={
										dateType === "Credit date"
											? form.getField("credit_date")
											: form.getField("maturity_date")
									}
									minDate={moment().toDate()}
									maxDate={undefined}
									checkWeekend={dateType === "credit_date" ? false : true}
								/>
							)}
							{/* credit date */}
							<PrimaryInput
								onClickCallback={(e: any) => {
									showCalendarModal("credit_date");
								}}
								suffix={
									<button className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex">
										<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
											<CalenderIcon />
										</span>
									</button>
								}
								onBlur={(e, setInFocus) => {
									setInFocus(true);
								}}
								form={form}
								field="credit_date"
								fieldType="date"
								placeholder={{
									main: "Credit date",
								}}
								prefix={""}
								inputMode="none"
								// value={form.value.credit_date}
								value={
									form.value.credit_date
										? formatedDate(form.value.credit_date)
										: form.value.credit_date
								}
								disabled={!form.getField("eefc_amount")}
							/>
							{/* maturity date */}
							<PrimaryInput
								onClickCallback={(e: any) => {
									showCalendarModal("maturity_date");
								}}
								suffix={
									<button className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex">
										<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
											<CalenderIcon />
										</span>
									</button>
								}
								onBlur={(e, setInFocus) => {
									setInFocus(true);
								}}
								form={form}
								field="maturity_date"
								fieldType="date"
								placeholder={{
									main: "Maturity date",
								}}
								prefix={""}
								inputMode="none"
								// value={form.value.maturity_date}
								value={
									form.value.maturity_date
										? formatedDate(form.value.maturity_date)
										: form.value.maturity_date
								}
								disabled={!form.getField("credit_date")}
							/>

							<div className="font-inter text-sm leading-[21px] text-color-black-5  flex gap-x-2">
								<IIcon svgStyles="w-4 h-4 shrink-0" color="#646464" />
								Maturity date refers to the date by which you expect these funds
								to be utilised for an outward payment or converted into your
								local currency and transferred to your current account.
							</div>
						</div>
					</div>

					<div className="absolute bottom-0 w-full">
						<div className="shadow-boxShadow sticky bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center">
							<>
								<UnderlineButton
									onClick={() => {
										closeModalScreen();
									}}
									buttonText="Cancel"
								/>
								<PrimaryButton
									className={`disabled:hover:bg-semiLightGray ${
										isDisable ? "cursor-not-allowed" : "pointer-events-auto"
									}`}
									disabled={isDisable}
									onClick={handleSaveTransferToEefc}
									buttonText={"Save"}
								/>
							</>
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default TransferToEefc;
