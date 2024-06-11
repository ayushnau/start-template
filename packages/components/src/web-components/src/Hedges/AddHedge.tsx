import {
	Header,
	TypesCard,
	CurrencyInput,
	UnderlineButton,
	PrimaryButton,
	PrimaryInput,
	PrimaryDropdown,
	Loader,
	showModalToLink,
} from "components";
import React, { useEffect, useState } from "react";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon } from "icons";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPortfolioHedges, setToastMessage } from "store";
import {
	createHedge,
	linkTradeAndHedge,
	login,
	useModalNavigation,
} from "services";
import CalendarModal from "../Support/CalendarModal";
import showSelectCurrencyPairModal from "../Modals/SelectCurrencyPairModal";
import showInfoModal from "../Modals/InfoModal";
import moment from "moment";
import { setHedgeCount } from "store/web-src/src/forexEntityCountSlice";
import { useSelector } from "react-redux";

const INFODETAILS = [
	{
		title: "Hedge amount",
		description: [
			"Hedge amount refers to the portion of a financial transaction or investment that is protected or mitigated against potential losses through the use of a financial instrument known as a hedge. Hedging is a risk management strategy that involves taking offsetting positions to reduce or eliminate the impact of potential adverse price movements.",
		],
	},
	{
		title: "Hedge rate",
		description: [
			"Hedge rate refers to the predetermined exchange rate in a hedging transaction to secure a future value for a receivable or a payable.",
		],
	},
];

const AddHedge = () => {
	const dispatch = useDispatch();
	const { state } = useLocation();
	const { closeModalScreen, fullNavigation, switchModalScreen } =
		useModalNavigation();
	const [disabled, setDisabled] = useState(true);
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [openDateModal, setOpenDateModal] = React.useState(false);
	const [isLoading, setIsLoading] = useState("");
	const count = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	const action = state?.action;
	const tradeID = state?.tradeId;

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
			//This should be done in backend and as a Transaction
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
					fullNavigation(
						`/fx-home/portfolio/ledger/${state.ledgerId}/trade/${tradeID}`,
						`/fx-home/portfolio/ledger/${state.ledgerId}/`,
					);
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
			web: true,
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
			dispatch(setPortfolioHedges(new Date()));
			dispatch(setHedgeCount(parseInt(count.hedgeCount) + 1));
			dispatch(
				setToastMessage({
					message: `Hedge added!`,
					type: "neutral",
				}),
			);
			switchModalScreen(`hedge/${hedgeId}`);
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

	const showCalendarModal = () => {
		setOpenDateModal(true);
	};

	return (
		<Loader
			isLoading={isLoading === "" ? false : true}
			successComponent={
				<>
					<div className="relative pt-4 bg-white flex flex-col h-full overflow-y-hidden">
						<Header
							className="flex items-center justify-between px-4 pb-2 border-b-semiLightGray border-b "
							displayTitle="New hedge"
							showEditIcon={false}
							backAction={() => {
								closeModalScreen();
							}}
						/>
						{/* this padding is added for the absolutely placed item + bottom padding of the item */}
						<div className="flex flex-col mx-5 mt-4 gap-y-4 pb-[70px] flex-1 overflow-y-scroll ">
							<TypesCard
								typesCard="hedge"
								setOpenDateModal={showCalendarModal}
								form={form}
								disabled={action && action === "linkHedge"}
							/>
							{openDateModal && (
								<CalendarModal
									closeModalCallback={(date: Date) => {
										setOpenDateModal(false);
										form.setField(
											"maturity_date",
											moment(date).format("YYYY-MM-DD"),
										);
									}}
									outsideClickCallback={() => {
										setOpenDateModal(false);
									}}
									minDate={new Date()}
									date={form.getField("maturity_date")}
								/>
							)}
							<CurrencyInput
								setShowSelectCurrencyPair={async () => {
									await showSelectCurrencyPairModal({
										form: form,
									});
								}}
								form={form}
								disabled={action && action === "linkHedge"}
							/>
							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal({ content: INFODETAILS })}
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
										onClick={() => showInfoModal({ content: INFODETAILS })}
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
						<div
							className={`shadow-boxShadow h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full m-auto `}
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
											closeModalScreen();
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
					</div>
				</>
			}
			loadingText={isLoading === "save" ? "Saving.." : ""}
		/>
	);
};

export default AddHedge;
