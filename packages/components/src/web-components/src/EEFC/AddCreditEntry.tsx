import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	Loader,
	Header,
	PrimaryInput,
	UnderlineButton,
	PrimaryButton,
	CurrencyInput,
	DateSelectorCard,
} from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { ChevronDown, ChevronUp, IIcon } from "icons";
import { setPortfolioEEFCs, setToastMessage } from "store";
import { createEEFC, useModalNavigation } from "services";
import showSelectCurrencyPairModal from "../Modals/SelectCurrencyPairModal";
import showInfoModal from "../Modals/InfoModal";
import { UPDATETRADEINFO as ADDTRADEINFO } from "utils";
import moment from "moment";
import CalendarModal from "../Support/CalendarModal";
import { setEefcCount } from "store/web-src/src/forexEntityCountSlice";

const AddCreditEntry = () => {
	const [isDisable, setIsDisable] = useState(true);
	const [isLoading, setIsLoading] = useState("");
	const [showCounterPartyFields, setShowCounterPartyFields] = useState(false);
	const [openDateModal, setOpenDateModal] = useState(false);
	const { closeModalScreen } = useModalNavigation();
	const [dateType, setDateType] = useState("");
	const dispatch = useDispatch();

	const count = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	const form = useBetaForm({
		currency_pair: "",
		eefc_amount: "",
		benchmark_rate: "",
		credit_date: "",
		maturity_date: "",
		bank_name: "",
		invoice_number: "",
		cp_name: "",
		eefc_type: "",
	});

	const showCalendarModal = (label: any) => {
		setDateType(label);
		setOpenDateModal(true);
	};

	useEffect(() => {
		if (
			form.getField("currency_pair") &&
			form.getField("benchmark_rate") &&
			+form.getField("eefc_amount") !== 0 &&
			form.getField("credit_date") &&
			form.getField("maturity_date")
		) {
			setIsDisable(false);
		} else {
			setIsDisable(true);
		}
	}, [form]);

	const handleEefcSave = async () => {
		form.value.eefc_amount = form.value.eefc_amount.replace(/,/g, "");
		form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");

		const payload = form.value;
		payload["eefc_type"] = "manual";

		try {
			setIsLoading("save");
			const response: any = await createEEFC(payload);
			if (response?.success) {
				dispatch(setPortfolioEEFCs(new Date()));
				dispatch(setEefcCount(parseInt(count.eefcCount) + 1));
				dispatch(
					setToastMessage({
						message: `EEFC entry recorded successfully!`,
						type: "neutral",
					}),
				);
			} else {
				throw "Something went wrong while creating EEFC Account";
			}

			closeModalScreen();
		} catch (err: any) {
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
			setIsLoading("");
		}
	};

	return (
		<Loader
			isLoading={isLoading === "" ? false : true}
			successComponent={
				<>
					<div className="relative py-4 bg-white flex flex-col h-full overflow-y-hidden">
						<Header
							displayTitle="Add credit entry"
							showEditIcon={false}
							backAction={() => {
								closeModalScreen();
							}}
						/>
						<div className="border-b-[1px] w-full border-mine-shaft-2 pt-2" />
						<div className="flex flex-col mx-5 mt-4 gap-y-4 pb-[76px] flex-1 overflow-y-scroll ">
							<CurrencyInput
								setShowSelectCurrencyPair={async () => {
									await showSelectCurrencyPairModal({
										form: form,
									});
								}}
								form={form}
							/>
							<PrimaryInput
								form={form}
								field="eefc_amount"
								fieldType={"number"}
								numberOnly={true}
								placeholder={{
									main: "Amount ",
									subString: form?.getField("currency_pair")?.split("/")[0]
										? `e.g:  ${
												getCurrencySymbol(
													form?.getField("currency_pair")?.split("/")[0],
												) || form?.getField("currency_pair")?.split("/")[0]
										  } 500,00`
										: "e.g: $500,000",
								}}
								prefix={
									getCurrencySymbol(
										form?.getField("currency_pair")?.split("/")[0],
									)
										? getCurrencySymbol(
												form?.getField("currency_pair")?.split("/")[0],
										  )
										: form?.getField("currency_pair")?.split("/")[0]
								}
								disabled={!form.getField("currency_pair")}
							/>
							<PrimaryInput
								form={form}
								numberOnly={true}
								field="benchmark_rate"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Invoice benchmark rate",
								}}
								disabled={!form.getField("eefc_amount")}
							/>
							<DateSelectorCard
								form={form}
								disabled={!form.getField("benchmark_rate")}
								setOpenDateModal={showCalendarModal}
							/>
							{openDateModal && (
								<CalendarModal
									closeModalCallback={(date: Date) => {
										setOpenDateModal(false);
										if (dateType === "Credit date") {
											form.setField(
												"credit_date",
												moment(date).format("YYYY-MM-DD"),
											);
										} else {
											form.setField(
												"maturity_date",
												moment(date).format("YYYY-MM-DD"),
											);
										}
									}}
									outsideClickCallback={() => {
										setOpenDateModal(false);
									}}
									minDate={
										dateType === "Credit date"
											? moment().subtract(45, "days").toDate()
											: moment().toDate()
									}
									maxDate={
										dateType === "Credit date" ? moment().toDate() : undefined
									}
									date={
										dateType === "Credit date"
											? form.getField("credit_date")
											: form.getField("maturity_date")
									}
									checkWeekend={dateType === "Credit date" ? false : true}
								/>
							)}

							{/* optional part */}
							<div className="border-b-[1px] w-full border-mine-shaft-2 pt-2" />
							<div
								className="py-2 flex justify-between"
								onClick={() => {
									setShowCounterPartyFields(!showCounterPartyFields);
								}}
							>
								<label>Add other details</label>
								<span>
									{showCounterPartyFields ? <ChevronUp /> : <ChevronDown />}
								</span>
							</div>
							{showCounterPartyFields ? (
								<div
									className={
										"flex flex-col gap-y-4 transition-all duration-700" +
										(showCounterPartyFields ? "" : "hidden opacity-0")
									}
								>
									<PrimaryInput
										form={form}
										field="bank_name"
										onChange={(e) => {
											form.setField("bank_name", e.target.value);
										}}
										placeholder={{ main: "Bank name (optional)" }}
										suffix={
											<button
												className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
												onClick={() =>
													showInfoModal({ content: ADDTRADEINFO, web: true })
												}
											>
												<span
													onClick={() => {}}
													className="cursor-pointer text-[24px] text-[#717171] pr-1"
												>
													<IIcon color={"#717171"} />
												</span>
											</button>
										}
									/>
									<PrimaryInput
										form={form}
										field="invoice_number"
										fieldType={"number"}
										onChange={(e) => {
											form.setField("invoice_number", e.target.value);
										}}
										placeholder={{ main: "Invoice number (optional)" }}
										suffix={
											<button
												className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
												onClick={() =>
													showInfoModal({ content: ADDTRADEINFO, web: true })
												}
											>
												<span
													onClick={() => {}}
													className="cursor-pointer text-[24px] text-[#717171] pr-1"
												>
													<IIcon color={"#717171"} />
												</span>
											</button>
										}
									/>

									<PrimaryInput
										form={form}
										field="cp_name"
										onChange={(e) => {
											form.setField("cp_name", e.target.value);
										}}
										placeholder={{
											main: "Counter party name (optional)",
										}}
										suffix={
											<button
												className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
												onClick={() =>
													showInfoModal({ content: ADDTRADEINFO, web: true })
												}
											>
												<span
													onClick={() => {}}
													className="cursor-pointer text-[24px] text-[#717171] pr-1"
												>
													<IIcon color={"#717171"} />
												</span>
											</button>
										}
									/>
								</div>
							) : (
								<></>
							)}
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
										isDisable ? "cursor-not-allowed" : "pointer-events-auto"
									}`}
									disabled={isDisable}
									onClick={handleEefcSave}
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

export default AddCreditEntry;
