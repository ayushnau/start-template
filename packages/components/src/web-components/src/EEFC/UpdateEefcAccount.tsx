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
	showDeleteConfirmationModal,
} from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { ChevronDown, ChevronUp, IIcon } from "icons";
import { setPortfolioModal, setToastMessage } from "store";
import {
	useModalNavigation,
	overrideCalendarStyles,
	updateEEFC,
	deleteEEFC,
	getEEFCDetails,
} from "services";
import showSelectCurrencyPairModal from "../Modals/SelectCurrencyPairModal";
import showInfoModal from "../Modals/InfoModal";
import { UPDATETRADEINFO as ADDTRADEINFO } from "utils";
import moment from "moment";
import CalendarModal from "../Support/CalendarModal";
import { setEefcCount } from "store/web-src/src/forexEntityCountSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	setPortfolioEEFCs,
	updatePortfolioEEFCSpecificRecord,
} from "store/src/portfolioEEFCsListSlice";

const formatedDate = (date: any) => {
	return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
};

const UpdateEefcAccount = () => {
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [dateObj, setDateObj] = useState(Date());
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
	const [eefcData, setEefcData] = useState<any>();
	const [error, setError] = useState(false);
	const [defaultSelected, setDefaultSelected] = useState<any>();
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();
	const location = useLocation();
	const [isDisable, setIsDisable] = useState(true);
	const [loadText, setLoadText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showCounterPartyFields, setShowCounterPartyFields] = useState(true);
	const [openDateModal, setOpenDateModal] = useState(false);
	const { closeModalScreen } = useModalNavigation();
	const [dateType, setDateType] = useState("");
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);

	const navigate = useNavigate();
	const { eefcId } = useParams();

	const count = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	const { eefcCount } = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	const eefc = useSelector((state: any) => {
		if (eefcId) {
			return state?.portfolioEEFCsList?.eefcList[eefcId];
		}
	});

	const init = async () => {
		try {
			setIsLoading(true);
			setEefcData(eefc);
			form.value.maturity_date = formatedDate(eefc.maturity_date);
			form.value.credit_date = formatedDate(eefc.credit_date);
			form.value.currency_pair = eefc.currency_pair;
			form.value.eefc_amount = eefc.eefc_amount;
			form.value.benchmark_rate = eefc.benchmark_rate;
			form.value.created_by = eefc.created_by;
			form.value.bank_name = eefc.bank_name;
			form.value.cp_name = eefc.cp_name;
		} catch (err) {
			console.log("Something went wrong...", err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		setIsKeyboardOpen(window.innerHeight < window.outerHeight);
	}, [isKeyboardOpen]);

	const deleteCallBackFunction = async () => {
		try {
			setIsLoading(true);
			await deleteEEFC(form.value.uuid);
			const refreshToken = JSON.stringify(new Date());
			dispatch(setPortfolioEEFCs(refreshToken));
			dispatch(
				setToastMessage({
					message: `Hedge deleted!`,
					type: "neutral",
				}),
			);
			closeModalScreen();
		} catch (error) {
			console.log("Error Deleting Hedge :", error);
			throw error;
		} finally {
			setIsLoading(false);
			dispatch(setEefcCount(parseInt(eefcCount) - 1));
		}
	};

	const handleDeleteEEFC = async () => {
		await showDeleteConfirmationModal({
			title: "Delete EEFC?",
			description: "All the details will be removed permanently.",
			callbackYes: deleteCallBackFunction,
			makeModalFull: false,
			web: true,
		});
	};

	const form = useBetaForm({
		currency_pair: eefc.currency_pair || "",
		eefc_amount: eefc.hedge_amount || "",
		benchmark_rate: eefc.benchmark_rate || "",
		credit_date: eefc.credit_date || "",
		maturity_date: eefc.maturity_date || "",
		bank_name: eefc.bank_name || "",
		invoice_number: eefc.invoice_number || "",
		cp_name: eefc.cp_name || "",
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

	useEffect(() => {
		overrideCalendarStyles({
			minDate: moment().add(1, "day"),
			maxDate: moment().add(1, "year"),
		});
	}, [form.getField("maturity_date"), runOverrideCalendarStyles, dateObj]);

	const handleEefcUpdate = async () => {
		form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");
		form.value.eefc_amount = form.value.eefc_amount.replace(/,/g, "");
		form.value.eefc_type = eefc?.eefc_type;

		const payload = form.value;
		try {
			setIsLoading(true);
			const response: any = await updateEEFC(payload, eefcId);
			const fetchedUserData: any = await getEEFCDetails(eefcId);
			setLoadText("Updating...");
			if (response.success) {
				dispatch(updatePortfolioEEFCSpecificRecord(fetchedUserData?.eefc));
				dispatch(
					setToastMessage({
						message: `EEFC entry updated successfully!`,
						type: "neutral",
					}),
				);
				closeModalScreen();
			}
		} catch (err) {
			console.log("error occured while updating eefc account: ", error);
			dispatch(
				setToastMessage({
					message: `⚠️ Error: Please try again`,
					type: "error",
					className: "bg-[#BA1A1A]",
				}),
			);
			closeModalScreen();
		} finally {
			navigate(`/fx-home/portfolio/eefc-account/${eefcId}`);
			dispatch(
				setPortfolioModal({
					displayModalScreen: true,
					modalScreen: `eefc-account/${eefcId}`,
				}),
			);
		}
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<div className="relative py-4 bg-white flex flex-col h-full overflow-y-hidden">
						<Header
							displayTitle="Edit credit entry"
							deleteAction={() => handleDeleteEEFC()}
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
								disabled
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
								field="benchmark_rate"
								fieldType={"number"}
								numberOnly={true}
								inputMode="decimal"
								placeholder={{
									main: "Benchmark rate",
								}}
								disabled={!form.getField("eefc_amount")}
								value={
									form.getField("benchmark_rate")
										? form.getField("benchmark_rate")
										: ""
								}
							/>
							<DateSelectorCard
								form={form}
								disabled={!form.getField("eefc_invoice_benchmark_rate")}
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
									minDate={new Date()}
									date={
										dateType === "Credit date"
											? form.getField("credit_date")
											: form.getField("maturity_date")
									}
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
										value={
											form.getField("bank_name")
												? form.getField("bank_name")
												: ""
										}
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
										value={
											form.getField("invoice_number")
												? form.getField("invoice_number")
												: ""
										}
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
										value={
											form.getField("cp_name") ? form.getField("cp_name") : ""
										}
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
									onClick={handleEefcUpdate}
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

export default UpdateEefcAccount;
