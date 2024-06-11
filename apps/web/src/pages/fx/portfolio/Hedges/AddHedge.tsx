import {
	Header,
	TypesCard,
	CurrencyInput,
	UnderlineButton,
	PrimaryButton,
	PrimaryInput,
	PrimaryDropdown,
	Loader,
	InfoModal,
	CalendarModal,
	showModalToLink,
} from "components";
import React, { useEffect, useState } from "react";
import SearchCurrencyPair from "../../Components/SelectCurrencyPair";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon } from "icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";
import {
	createHedge,
	linkTradeAndHedge,
	overrideCalendarStyles,
} from "services";
import moment from "moment";

const showInfoModal = async () => {
	await InfoModal({
		fillContent: [
			{
				title: "Hedge amount",
				description:
					"Hedge amount refers to the portion of a financial transaction or investment that is protected or mitigated against potential losses through the use of a financial instrument known as a hedge. Hedging is a risk management strategy that involves taking offsetting positions to reduce or eliminate the impact of potential adverse price movements.",
			},
			{
				title: "Hedge rate",
				description:
					"Hedge rate refers to the predetermined exchange rate in a hedging transaction to secure a future value for a receivable or a payable.",
			},
		],
	});
};

const AddHedge = () => {
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [isLoading, setIsLoading] = useState("");
	const navigate = useNavigate();
	const [dateObj, setDateObj] = useState(Date());
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
	const dispatch = useDispatch();
	const { state } = useLocation();

	const action = state?.action;
	const tradeID = state?.tradeId;

	useEffect(() => {
		setIsKeyboardOpen(window.innerHeight < window.outerHeight);
	}, [isKeyboardOpen]);

	const setTradeValuesIfFound = () => {
		setIsLoading("settingTradeValues");
		if (state) {
			form.setField("hedge_type", state.type);
			form.setField("currency_pair", state.pair);
		}
		setTimeout(() => {
			setIsLoading("");
		}, 1000);
	};

	useEffect(() => {
		setTradeValuesIfFound();
	}, []);

	const createAndLinkCallback = async (link_amount: string) => {
		try {
			setIsLoading("createAndLink");
			const createHedgeResult: any = await createHedge(form.value);
			if (createHedgeResult?.success) {
				const linkHedgeResult: any = await linkTradeAndHedge(
					{
						hedge_uuid: createHedgeResult.hedge_id,
						link_amount: link_amount,
					},
					tradeID,
				);
				if (linkHedgeResult.success) {
					dispatch(
						setToastMessage({
							message: `Hedge updated!`,
							type: "neutral",
						}),
					);
					navigate(`/ledger/${state.ledgerId}/trade/${tradeID}`);
				}
			} else {
				throw "Create Hedge process failed";
			}
		} catch (error) {
			console.log("Error while linking creating and linking hedge");
		} finally {
			setIsLoading("");
		}
	};

	const linkHedgeModal = async () => {
		form.value.hedge_amount = form.value.hedge_amount.replace(/,/g, "");
		form.value.hedged_rates = form.value.hedged_rates.replace(/,/g, "");
		await showModalToLink({
			hedge_details: form.value,
			createAndLinkCallback: createAndLinkCallback,
			unhedged_amount: state.trade_unhedged_amount,
		});
	};

	const form = useBetaForm({
		hedge_type: "",
		maturity_date: "",
		currency_pair: "",
		hedge_amount: "",
		hedged_rates: "",
		created_by: "",
		bank_name: "",
		bank_ref: "",
		uuid: "",
		hedge_basis: "",
	});

	const handleHedgeSave = async () => {
		form.value.hedge_amount = form.value.hedge_amount.replace(/,/g, "");
		form.value.hedged_rates = form.value.hedged_rates.replace(/,/g, "");
		const payload = form.value;
		try {
			setIsLoading("save");
			const response: any = await createHedge(payload);
			const hedgeId = response.hedge_id;
			//TODO: can create a seperate function for this send toast action and just pass the object to it
			dispatch(
				setToastMessage({
					message: `Hedge added!`,
					type: "neutral",
				}),
			);
			navigate(`/hedge/${hedgeId}`);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading("");
		}
	};

	useEffect(() => {
		if (
			form.getField("hedge_type") &&
			form.getField("maturity_date") &&
			form.getField("currency_pair") &&
			form.getField("hedge_amount") &&
			form.getField("hedged_rates") &&
			+form.getField("hedge_amount") !== 0
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form]);

	useEffect(() => {
		overrideCalendarStyles({
			minDate: moment().add(1, "day"),
			maxDate: moment().add(1, "year"),
		});
	}, [form.getField("maturity_date"), runOverrideCalendarStyles, dateObj]);

	const showCalendarModal = async () => {
		//TODO: This calender modal seems similar to another made for use and cancel hedge. Both can be merged in one
		await CalendarModal({
			details: {
				setDateObj: setDateObj,
				form: form,
				minDate: moment().add(1, "day"),
				maxDate: moment().add(1, "year"),
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
			},
		});
	};

	return (
		<Loader
			isLoading={isLoading === "" ? false : true}
			successComponent={
				<>
					{showSelectCurrencyPair ? (
						<div className="h-[100vh] overflow-scroll absolute right-0 left-0 bottom-0 top-0 z-50 bg-white">
							<SearchCurrencyPair
								setSelectedCurrencyFlagPair={(item: any) => {
									form.setField("currency_pair", item.pair);
								}}
								selectedCurrencyFlagPair={form?.value?.currency_pair || ""}
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
							/>
						</div>
					) : (
						<></>
					)}

					<div className="relative py-4 bg-white flex flex-col h-full overflow-y-hidden">
						<Header
							className="flex items-center justify-between px-4 pb-2 border-b-semiLightGray border-b "
							displayTitle="New hedge"
							showEditIcon={false}
							backAction={() => {
								navigate(-1);
							}}
						/>
						{/* this padding is added for the absolutely placed item + bottom padding of the item */}
						<div className="flex flex-col mx-5 mt-4 gap-y-4 pb-[76px] flex-1 overflow-y-scroll ">
							<TypesCard
								typesCard="hedge"
								setOpenDateModal={showCalendarModal}
								form={form}
								disabled={action && action === "linkHedge"}
							/>
							<CurrencyInput
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
								form={form}
								disabled={action && action === "linkHedge"}
							/>
							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal()}
									>
										<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								form={form}
								field="hedge_amount"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Hedge amount ",
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
								onClickCallback={(e: any) => {
									if (!form.getField("currency_pair")) {
										alert("Please select the currency flag first");
									}
								}}
							/>
							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal()}
									>
										<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								form={form}
								field="hedged_rates"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Hedge rate ",
									subString: form?.getField("currency_pair")?.split("/")[1]
										? `e.g: ${
												getCurrencySymbol(
													form?.getField("currency_pair")?.split("/")[1],
												) || form?.getField("currency_pair")?.split("/")[1]
										  } 86.70`
										: "e.g: ₹82.70 ",
								}}
								prefix={
									getCurrencySymbol(
										form?.getField("currency_pair")?.split("/")[1],
									)
										? getCurrencySymbol(
												form?.getField("currency_pair")?.split("/")[1],
										  )
										: form?.getField("currency_pair")?.split("/")[1]
								}
								disabled={!form.getField("currency_pair")}
							/>
							<PrimaryInput
								form={form}
								field="bank_name"
								placeholder={{
									main: "Bank name (Optional) ",
								}}
							/>
							<PrimaryInput
								form={form}
								field="bank_ref"
								placeholder={{
									main: "Bank reference number (Optional) ",
								}}
							/>
							<PrimaryDropdown form={form} />
						</div>
					</div>

					<div
						className={`shadow-boxShadow fixed bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center md:w-1/3 m-auto ${
							isKeyboardOpen ? "pb-[30px]" : ""
						}`}
					>
						{action && action === "linkHedge" ? (
							<PrimaryButton
								className="disabled:hover:bg-semiLightGray"
								disabled={disabled}
								onClick={() => linkHedgeModal()}
								buttonText={"Continue"}
							/>
						) : (
							<>
								<UnderlineButton
									onClick={() => {
										navigate(-1);
									}}
									buttonText="Cancel"
								/>
								<PrimaryButton
									className="disabled:hover:bg-semiLightGray"
									disabled={disabled}
									onClick={() => handleHedgeSave()}
									buttonText={"Save"}
								/>
							</>
						)}
					</div>
				</>
			}
			loadingText={isLoading === "save" ? "Saving.." : ""}
		/>
	);
};

export default AddHedge;
