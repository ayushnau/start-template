import React, { useState, useEffect } from "react";
import {
	Header,
	Loader,
	CurrencyPairFlags,
	UnderlineButton,
	PrimaryButton,
	WarningBanner,
	SecondaryButton,
	PrimaryInput,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { CalenderIcon, ForwardArrow, IIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { SubTitle2 } from "../../../Typography";
import CashRateInputs from "../Support/CashRateInputs";
import { createHedge, useModalNavigation } from "services";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import CalendarModal from "../Support/CalendarModal";
import moment from "moment";
import { setToastMessage } from "store";
import { createCashPayment } from "../../../../../services/portfolio/EEFC/createCashPayment";
import { updatePortfolioEEFCSpecificRecord } from "store/src/portfolioEEFCsListSlice";

const EefcCashRecordPayment = () => {
	const params = useParams();
	const { eefcId } = params;
	const navigate = useNavigate();
	const { closeModalScreen, switchModalScreen } = useModalNavigation();

	const [completePayload, setCompletePayload] = useState<any>([{ id: 0 }]);
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState("Save");
	const [openDateModal, setOpenDateModal] = useState(false);
	const [validated, setValidated] = useState(false);

	const dispatch = useDispatch();

	const form = useBetaForm({
		eefc_amount: "",
		date_of_transaction: "",
		cash_rate: "",
	});

	useEffect(() => {
		if (
			+form.getField("eefc_amount") !== 0 &&
			form.getField("date_of_transaction") &&
			form.getField("cash_rate")
		) {
			setValidated(false);
		} else {
			setValidated(true);
		}
	}, [form]);

	const eefc = useSelector((state: any) => {
		if (eefcId) {
			return state?.portfolioEEFCsList?.eefcList[eefcId];
		}
	});
	const handleEefcCashRecordPayment = async () => {
		form.value.eefc_amount = form.value.eefc_amount.replace(/,/g, "");
		form.value.cash_rate = form.value.cash_rate.replace(/,/g, "");

		const payload = form.value;
		const requestObject = [
			{
				eefc_uuid: eefc.uuid,
				amount: form.value.eefc_amount,
				amount_currency: eefc.base_currency,
				type: "transaction_via_cash_eefc",
				date_of_transaction: form.value.date_of_transaction,
				transaction_data: {
					cash_rate: form.value.cash_rate,
					cash_rate_currency: eefc.quote_currency,
				},
			},
		];

		try {
			setIsLoading(true);
			const response: any = await createCashPayment(requestObject);
			if (response.success === true) {
				dispatch(updatePortfolioEEFCSpecificRecord(response.eefc));
			}
			dispatch(
				setToastMessage({
					message: `Payment recorded!!`,
					type: "neutral",
				}),
			);
			switchModalScreen(`eefc-account/${eefc?.uuid}`);
		} catch (err) {
			console.log("error: ", err);
			dispatch(
				setToastMessage({
					message: `⚠️ Error: Please try again`,
					type: "error",
					className: "bg-[#BA1A1A]",
				}),
			);
			closeModalScreen();
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<div className="bg-white h-full flex flex-col">
						<Header
							className="flex items-center justify-between px-6 py-[10px]  bg-white z-30"
							displayTitle="Record cash payment"
							displayTitleStyles="-tracking-[0.3px]"
							displaySubTitle={
								<div className="flex items-center justify-start text-blackDark">
									<div>{eefc?.currency_pair?.split("/")[0]}</div>
									<ForwardArrow className="mx-1 scale-75" />
									<div className="mr-2">
										{eefc?.currency_pair?.split("/")[1]}
									</div>
									{eefc?.currency_pair && (
										<CurrencyPairFlags flagpair={eefc?.currency_pair} />
									)}
								</div>
							}
							displaySubTitleStyles="text-xs font-normal leading-4 text-mine-shaft-3"
							subtitleWrapper="ml-[10px]"
							showEditIcon={false}
							backAction={() => switchModalScreen(`eefc-account/${eefc?.uuid}`)}
						/>
						<div className="h-full">
							<WarningBanner
								className="text-sm font-inter font-normal leading-[22px]"
								label={"Remaining amount"}
								amount={`${
									eefc && eefc?.remaining_amount
										? getCurrencySymbol(eefc.base_currency)
										: ""
								}${
									eefc && eefc?.remaining_amount
										? formatNumberWithCommas(eefc.remaining_amount)
										: ""
								}`}
							/>
							<div className="px-6 mt-[18px] flex flex-col gap-y-4">
								<SubTitle2 classes="text-mine-shaft-3">
									Please enter details of the payment received or paid. It will
									update your remaining amount to pay or receive automatically.
								</SubTitle2>
								<PrimaryInput
									form={form}
									field="eefc_amount"
									numberOnly={true}
									fieldType={"number"}
									placeholder={{
										main: "Enter Amount",
										subString: eefc?.base_currency
											? ` e.g:  ${
													getCurrencySymbol(eefc.base_currency) ||
													form?.getField("currency_pair")?.split("/")[0]
											  } 500,00`
											: "e.g: $500,000",
									}}
									prefix={
										getCurrencySymbol(eefc.base_currency) ||
										getCurrencySymbol(eefc.base_currency)
									}
									// disabled={!form.getField("currency_pair")}
									disabled={false}
								/>
								<PrimaryInput
									onClickCallback={() => setOpenDateModal(true)}
									suffix={
										<div
											onClick={() => {
												if (!validated) setOpenDateModal(true);
											}}
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										>
											<CalenderIcon
												color={buttonText === "Saved" ? "#BCBCBC" : "#717171"}
											/>
										</div>
									}
									form={form}
									// value={}
									field="date_of_transaction"
									fieldType={"date"}
									placeholder="Date of Transaction"
									disabled={false}
								/>
								{openDateModal && (
									<CalendarModal
										classes="absolute top-0 right-0  z-50 px-4 py-5 rounded-xl border bg-white"
										closeModalCallback={(date: Date) => {
											setOpenDateModal(false);
											form.setField(
												"date_of_transaction",
												moment(date).format("YYYY-MM-DD"),
											);
										}}
										minDate={new Date(eefc?.created_at)}
										maxDate={
											new Date() < new Date(eefc?.maturity_date)
												? new Date()
												: new Date(eefc?.maturity_date)
										}
										outsideClickCallback={() => {
											setOpenDateModal(false);
										}}
										date={form.getField("date_of_transaction")}
									/>
								)}
								<PrimaryInput
									form={form}
									field="cash_rate"
									fieldType={"number"}
									numberOnly={true}
									inputMode="decimal"
									placeholder={{
										main: "Cash rate e.g. ₹86.70",
									}}
									// disabled={!form.getField("eefc_amount")}
									disabled={false}
								/>
							</div>
						</div>
						<div
							className={`shadow-boxShadow h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full m-auto `}
						>
							<>
								<UnderlineButton
									onClick={() => {
										closeModalScreen();
									}}
									buttonText="Cancel"
								/>
								<PrimaryButton
									className={`disabled:hover:bg-semiLightGray ${
										validated ? "cursor-not-allowed" : "pointer-events-auto"
									}`}
									disabled={validated}
									onClick={handleEefcCashRecordPayment}
									buttonText={"Save"}
								/>
							</>
						</div>
					</div>
				</>
			}
		/>
	);
};

export default EefcCashRecordPayment;
