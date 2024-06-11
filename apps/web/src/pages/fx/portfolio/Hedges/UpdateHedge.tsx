import {
	Header,
	TypesCard,
	CurrencyInput,
	UnderlineButton,
	PrimaryButton,
	PrimaryInput,
	Loader,
	InfoModal,
	CalendarModal,
	PrimaryDropdown,
	showDeleteConfirmationModal,
} from "components";
import React, { useEffect, useState } from "react";
import SearchCurrencyPair from "../../Components/SelectCurrencyPair";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon } from "icons";
import { overrideCalendarStyles, deleteHedge, updateHedge } from "services";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UPDATEHEDGEINFO, formatNumberWithCommas } from "utils";
import moment from "moment";

const formatedDate = (date: any) => {
	return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
};

const EditHedge = () => {
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [dateObj, setDateObj] = useState(Date());
	const { hedgeId } = useParams();
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
	const dispatch = useDispatch();
	const [hedgeData, setHedgeData] = useState<any>();
	const [error, setError] = useState(false);
	const [defaultSelected, setDefaultSelected] = useState<any>();
	const [isEditing, setIsEditing] = useState(false);
	const location = useLocation();
	const [loadText, setLoadText] = useState("");

	const hedge = useSelector((state: any) => {
		if (hedgeId) {
			return state?.portfolioHedgesList?.hedgeList[hedgeId];
		}
	});

	const init = async () => {
		try {
			setIsLoading(true);
			setHedgeData(hedge);
			form.value.hedge_type = hedge.hedge_type;
			form.value.maturity_date = formatedDate(hedge.maturity_date);
			form.value.currency_pair = hedge.currency_pair;
			form.value.hedge_amount = hedge.hedge_amount;
			form.value.hedged_rates = hedge.hedged_rates;
			form.value.created_by = hedge.created_by;
			form.value.bank_name = hedge.bank_name;
			form.value.uuid = hedge.uuid;
			form.value.hedge_basis = hedge.hedge_basis;
			if (form.value.hedge_basis) {
				setDefaultSelected({ label: hedge.hedge_basis });
			}
		} catch (error) {
			console.log("Error Populating edit hedge form with data:", error);
			throw error;
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
			await deleteHedge(form.value.uuid);
			navigate("/fx-home", {
				state: { select: "portfolio", secondTab: "hedges" },
			});
			dispatch(
				setToastMessage({
					message: `Hedge deleted!`,
					type: "neutral",
				}),
			);
		} catch (error) {
			console.log("Error while deleting Hedge: ", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteLedger = async () => {
		await showDeleteConfirmationModal({
			title: "Delete Hedge?",
			description: "All the details will be removed permanently.",
			callbackYes: deleteCallBackFunction,
			makeModalFull: false,
		});
	};

	const form = useBetaForm({
		hedge_type: hedge.hedge_type,
		maturity_date: formatedDate(hedge.maturity_date),
		currency_pair: hedge.currency_pair,
		hedge_amount: hedge.hedge_amount,
		hedged_rates: hedge.hedged_rates,
		created_by: hedge.created_by,
		bank_name: hedge.bank_name,
		bank_ref: hedge.bank_ref,
		uuid: hedgeId,
		hedge_basis: hedge.hedge_basis,
	});

	useEffect(() => {
		if (
			+form.value.hedge_amount <
				+hedgeData?.cancelled_amount +
					+hedgeData?.linked_amount +
					+hedgeData?.used_amount ||
			+form.value.hedge_amount === 0
		) {
			if (+form.value.hedge_amount !== 0) setError(true);
			setDisabled(true);
		} else {
			setError(false);
			setDisabled(false);
		}
	}, [form.value.hedge_amount]);

	const handleHedgeUpdate = async () => {
		form.value.hedged_rates = form.value.hedged_rates.replace(/,/g, "");
		form.value.hedge_amount = form.value.hedge_amount.replace(/,/g, "");
		const payload = form.value;
		try {
			setIsLoading(true);
			setLoadText("Updating..");
			const response: any = await updateHedge(payload);
			// const tradeId = response?.exposure_id;
			dispatch(
				setToastMessage({
					message: `Hedge Updated!`,
					type: "neutral",
				}),
			);
		} catch (error) {
			console.log("Error while updating Hedge", error);
			throw error;
		} finally {
			navigate(`/hedge/${hedgeId}`);
		}
	};

	useEffect(() => {
		if (
			form.getField("hedge_type") &&
			form.getField("maturity_date") &&
			form.getField("currency_pair") &&
			form.getField("hedge_amount") &&
			form.getField("hedged_rates")
		) {
			setDisabled(false);
		}
	}, [form]);

	useEffect(() => {
		overrideCalendarStyles({
			minDate: moment().add(1, "day"),
			maxDate: moment().add(1, "year"),
		});
	}, [form.getField("maturity_date"), runOverrideCalendarStyles, dateObj]);

	useEffect(() => {
		if (location.state && location.state.updateDate) {
			showCalendarModal(true);
		}
	}, []);

	const showInfoModal = async () => {
		await InfoModal({
			fillContent: UPDATEHEDGEINFO,
		});
	};

	const showCalendarModal = async (addImmediateFunction?: boolean) => {
		const details = {
			setDateObj: setDateObj,
			form: form,
			setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
			dateObj: dateObj,
			minDate: moment().add(1, "day"),
			maxDate: moment().add(1, "year"),
			immediateCalledFunction: () => {},
		};
		if (addImmediateFunction) {
			details.immediateCalledFunction = handleHedgeUpdate;
		}
		await CalendarModal({
			details: details,
		});
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					{showSelectCurrencyPair ? (
						<div className="h-[100vh] overflow-scroll absolute right-0 left-0 bottom-0 top-0 z-50 bg-white">
							<SearchCurrencyPair
								setSelectedCurrencyFlagPair={(item: any) => {
									form.setField("currency_pair", item.pair);
								}}
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
							/>
						</div>
					) : (
						<></>
					)}

					<div className="relative py-4 bg-white flex flex-col h-full overflow-y-hidden">
						<Header
							className="flex items-center justify-between px-4 pb-4 border-b-semiLightGray border-b "
							displayTitle={<>Edit hedge</>}
							showDelete
							showEditIcon={false}
							deleteAction={() => handleDeleteLedger()}
							backAction={() => {
								navigate(-1);
							}}
						/>
						<div className="flex flex-col mx-5 mt-5 gap-y-4 pb-[76px] flex-1 overflow-y-scroll ">
							<TypesCard
								typesCard="hedge"
								setOpenDateModal={showCalendarModal}
								form={form}
								disabled
							/>
							<CurrencyInput
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
								form={form}
								disabled
							/>
							<div>
								<PrimaryInput
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() => showInfoModal()}
										>
											<span
												onClick={() => console.log("suffix clicked")}
												className="cursor-pointer text-[24px] text-[#717171] pr-1"
											>
												<IIcon color={"#717171"} />
											</span>
										</button>
									}
									form={form}
									field="hedge_amount"
									inputMode="decimal"
									value={
										isEditing
											? ""
											: formatNumberWithCommas(form.getField("hedge_amount"))
									}
									fieldType={"number"}
									placeholder={{
										main: "Hedge amount ",
										subString: form.getField("currency_pair").split("/")[0]
											? `e.g:  ${
													getCurrencySymbol(
														form.getField("currency_pair").split("/")[0],
													) || form.getField("currency_pair").split("/")[0]
											  } 500,00`
											: "e.g: $500,000",
									}}
									prefix={
										getCurrencySymbol(
											form.getField("currency_pair").split("/")[0],
										)
											? getCurrencySymbol(
													form.getField("currency_pair").split("/")[0],
											  )
											: form.getField("currency_pair").split("/")[0]
									}
									disabled={!form.getField("currency_pair")}
									onClickCallback={(e: any) => {
										setIsEditing(true);
										if (!form.getField("currency_pair")) {
											alert("Please select the currency flag first");
										}
									}}
									errorMsg={
										error
											? "Hedge amount cannot be less than the sum of the Hedge amount used, cancelled, and linked"
											: ""
									}
									errorWithIcon
									iconPlaceTop
								/>
							</div>
							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal()}
									>
										<span
											onClick={() => console.log("suffix clicked")}
											className="cursor-pointer text-[24px] text-[#717171] pr-1"
										>
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								form={form}
								field="hedged_rates"
								fieldType={"number"}
								inputMode="decimal"
								value={
									isEditing
										? ""
										: formatNumberWithCommas(form.getField("hedged_rates"))
								}
								placeholder={{
									main: "Hedge rate ",
									subString: form.getField("currency_pair").split("/")[1]
										? `e.g: ${
												getCurrencySymbol(
													form.getField("currency_pair").split("/")[1],
												) || form.getField("currency_pair").split("/")[1]
										  } 86.70`
										: "e.g: ₹82.70 ",
								}}
								prefix={
									getCurrencySymbol(
										form.getField("currency_pair").split("/")[1],
									)
										? getCurrencySymbol(
												form.getField("currency_pair").split("/")[1],
										  )
										: form.getField("currency_pair").split("/")[1]
								}
								disabled={!form.getField("currency_pair")}
								onClickCallback={(e: any) => {
									setIsEditing(true);
								}}
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

							<PrimaryDropdown form={form} defaultSelected={defaultSelected} />
						</div>
					</div>

					<div
						className={`shadow-boxShadow fixed bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white  shadow-style-chooser items-center justify-center md:w-1/3 m-auto gap-x-5}`}
					>
						<UnderlineButton
							onClick={() => {
								navigate(-1);
							}}
							buttonText="Cancel"
						/>
						<PrimaryButton
							className="disabled:hover:bg-semiLightGray"
							disabled={disabled}
							onClick={() => {
								handleHedgeUpdate();
							}}
							buttonText="Update"
						/>
					</div>
				</>
			}
			loadingText={loadText ? loadText : ""}
		/>
	);
};

export default EditHedge;
