import {
	Header,
	CurrencyInput,
	PrimaryButton,
	PrimaryInput,
	Loader,
	CalendarModal as CalendarModalMobile,
} from "components";
import TypesCard from "../../../../../src/TypesCard";
import React, { useState } from "react";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { CalenderIcon } from "icons";
import { useDispatch } from "react-redux";
import CalendarModal from "../../../../../src/web-components/src/Support/CalendarModal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import showSelectCurrencyPairModal from "../../Modals/SelectCurrencyPairModal";
import ResultRollover from "./ResultRollover";
import { getRolloverRate } from "services";

export interface CalculateRolloverChargesHomeInterface {
	web?: boolean;
}

const CalculateRolloverChargesHome: React.FC<
	CalculateRolloverChargesHomeInterface
> = ({ web = false }) => {
	const [dateObj, setDateObj] = useState(new Date());
	const [openDateModal, setOpenDateModal] = useState(false);
	const [openDateModal2, setOpenDateModal2] = useState(false);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [disabled, setDisabled] = useState(true);
	const [showResult, setShowResult] = useState(false);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState("");
	const [rolloverRateChange, setRolloverRateChange] = useState({});

	const form = useBetaForm({
		rollover_type: "",
		currency_pair: "",
		current_hedge_maturity: "",
		new_hedge_maturity: "",
	});
	const handleResetForm = () => {
		form.setField("rollover_type", "");
		form.setField("currency_pair", "");
		form.setField("current_hedge_maturity", "");
		form.setField("new_hedge_maturity", "");
	};

	const validateForm = () => {
		if (
			(form.value.rollover_type != "" &&
				form.value.currency_pair != "" &&
				form.value.current_hedge_maturity != "",
			form.value.new_hedge_maturity != "")
		) {
			return true;
		}
		return false;
	};

	const showCalendarModal = async () => {
		if (!web) {
			const details = {
				setDateObj: setDateObj,
				form: form,
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
				minDate: moment(),
				maxDate: moment().add(1, "year"),
				form_field: "current_hedge_maturity",
			};

			const response = await CalendarModalMobile({
				details: details,
			});
		} else {
			setOpenDateModal(true);
		}
	};

	const showCalendarModal2 = async () => {
		if (!web) {
			const details = {
				setDateObj: setDateObj,
				form: form,
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
				minDate: moment(),
				maxDate: moment().add(1, "year"),
				form_field: "new_hedge_maturity",
			};
			await CalendarModalMobile({
				details: details,
			});
		} else {
			setOpenDateModal2(true);
		}
	};

	const handleRolloverCalculate = async () => {
		// const payload = form.value;
		if (validateForm()) {
			try {
				setIsLoading("Save");
				const payload = {
					type: form.getField("rollover_type"),
					pair: form.getField("currency_pair"),
					current_maturity_date: form.getField("current_hedge_maturity"),
					new_maturity_date: form.getField("new_hedge_maturity"),
				};
				const response: any = await getRolloverRate(payload);
				setRolloverRateChange(response);
				setShowResult(true);
			} catch (error: any) {
				console.log(error);
				if (error.response.data.statusCode == 501) {
					alert(error.response.data.message);
				} else {
					alert("something went wrong.");
				}
				throw Error(error);
			} finally {
				setIsLoading("");
			}
		} else {
			alert("Please Enter valid values ");
		}
	};

	React.useEffect(() => {
		if (
			form.value.rollover_type !== "" &&
			form.value.currency_pair !== "" &&
			form.value.current_hedge_maturity !== "" &&
			form.value.new_hedge_maturity !== ""
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form.value]);

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={<>Calculate Rollover/ Swap Charges</>}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={() => {
					if (showResult) setShowResult(false);
					else navigate(-1);
				}}
			/>
			{showResult ? (
				<ResultRollover
					web={web}
					form={form}
					type={form.getField("rollover_type")}
					current_hedge_maturity_date={moment(
						form.getField("current_hedge_maturity"),
						"YYYY-MM-DD",
					).format("DD MMM 'YY")}
					new_hedge_maturity_date={moment(
						form.getField("new_hedge_maturity"),
						"YYYY-MM-DD",
					).format("DD MMM 'YY")}
					currency_pair={form.getField("currency_pair")}
					setShowResult={setShowResult}
					rolloverRateChange={rolloverRateChange}
					handleResetForm={handleResetForm}
				/>
			) : (
				<Loader
					isLoading={isLoading !== "" ? true : false}
					successComponent={
						<div className="relative  bg-white flex flex-col h-full overflow-y-hidden">
							{/* this padding is added for the absolutely placed item + bottom padding of the item */}
							<div className="flex flex-col px-5 pt-4 gap-y-4 flex-1 overflow-y-scroll ">
								<div className="pt-2 flex flex-col gap-y-1">
									<label className="flex gap-x-[9px] font-inter text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
										Add trade details
									</label>
									<label className="font-inter text-sm leading-[21px] text-color-black-5">
										Please provide the necessary information to proceed:
									</label>
								</div>
								<TypesCard
									setOpenDateModal={() => {
										setOpenDateModal(false);
									}}
									form={form}
									typesCard={"rollover"}
								/>
								<CurrencyInput
									setShowSelectCurrencyPair={async () => {
										await showSelectCurrencyPairModal({
											form: form,
											mobile: !web,
										});
									}}
									form={form}
									suffix
								/>

								{openDateModal && (
									<CalendarModal
										classes="top-1/2 -translate-y-1/2"
										closeModalCallback={(date: Date) => {
											setOpenDateModal(false);
											form.setField(
												"current_hedge_maturity",
												moment(date).format("YYYY-MM-DD"),
											);
										}}
										outsideClickCallback={() => {
											setOpenDateModal(false);
										}}
										date={form.getField("current_hedge_maturity")}
										minDate={new Date()}
									/>
								)}
								<PrimaryInput
									onClickCallback={(e: any) => {
										showCalendarModal();
									}}
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() => {}}
										>
											<span
												onClick={() => console.log("suffix clicked")}
												className="cursor-pointer text-[24px] text-[#717171] pr-1"
											>
												<CalenderIcon />
											</span>
										</button>
									}
									onBlur={(e, setInFocus) => {
										setInFocus(true);
									}}
									form={form}
									field="current_hedge_maturity"
									fieldType="date"
									placeholder={{
										main: "Current hedge maturity date",
									}}
									prefix={""}
									inputMode="none"
								/>

								{openDateModal2 && (
									<CalendarModal
										classes="top-1/2 -translate-y-1/2"
										closeModalCallback={(date: Date) => {
											setOpenDateModal2(false);
											form.setField(
												"new_hedge_maturity",
												moment(date).format("YYYY-MM-DD"),
											);
										}}
										outsideClickCallback={() => {
											setOpenDateModal2(false);
										}}
										date={form.getField("new_hedge_maturity")}
										minDate={new Date()}
									/>
								)}
								<PrimaryInput
									onClickCallback={(e: any) => {
										showCalendarModal2();
									}}
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() => {}}
										>
											<span
												onClick={() => console.log("suffix clicked")}
												className="cursor-pointer text-[24px] text-[#717171] pr-1"
											>
												<CalenderIcon />
											</span>
										</button>
									}
									onBlur={(e, setInFocus) => {
										setInFocus(true);
									}}
									form={form}
									field="new_hedge_maturity"
									fieldType="date"
									placeholder={{
										main: "New hedge maturity date",
									}}
									prefix={""}
									inputMode="none"
								/>
							</div>
							<div className="shadow-boxShadow sticky bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center">
								<PrimaryButton
									className="disabled:hover:bg-semiLightGray"
									disabled={disabled}
									onClick={() => handleRolloverCalculate()}
									buttonText="Calculate"
								/>
							</div>
						</div>
					}
					loadingText={"Processing.."}
				/>
			)}
		</div>
	);
};

export default CalculateRolloverChargesHome;
