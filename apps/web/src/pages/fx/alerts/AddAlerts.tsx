import React, { useState, useEffect, useRef } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import {
	ButtonBidAndAsk,
	ContentHeader,
	ComparisonInput,
	PrimaryButton,
	CurrencyPairFlags,
} from "components";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { saveAlert } from "services";
import SelectCurrencyPair from "../Components/SelectCurrencyPair";
import EditIcon from "icons/EditIcon";
import RightSideIcon from "icons/RightSideIcon";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useSelector } from "react-redux";
import { ArrowIcon } from "icons";
import { StoreState } from "store";

const AlertsHome: React.FC<{
	closeShowAlerts: Function;
	openPermissionModal: Function;
	getAllAlerts: any;
}> = ({ closeShowAlerts, ...props }) => {
	const mobile_number = useSelector(
		(state: StoreState) => state.register.form.mobile_number,
	);

	const [isActiveGreaterThan, setIsActiveGreaterThan] =
		useState<boolean>(false);
	const [isActiveEqualTo, setIsActiveEqualTo] = useState<boolean>(false);
	const [isActiveLessThan, setIsActiveLessThan] = useState<boolean>(false);
	const [buttonSelected, setButtonSelected] = useState("bid");
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const ref = useRef<boolean>(false);

	const form = useBetaForm({
		type: "live-rate-bid",
		operation: "",
		trigger_value: "",
		pair: "",
	});

	const handleRadioChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		radioType: string,
	) => {
		const checked = e.target.checked;
		switch (radioType) {
			case "GreaterThan":
				form.setField("trigger_value", "");
				form.setField("operation", ">");
				setIsActiveGreaterThan(checked);
				setIsActiveEqualTo(false);
				setIsActiveLessThan(false);
				break;
			case "EqualTo":
				form.setField("trigger_value", "");
				form.setField("operation", "=");
				setIsActiveEqualTo(checked);
				setIsActiveGreaterThan(false);
				setIsActiveLessThan(false);
				break;
			case "LessThan":
				form.setField("trigger_value", "");
				form.setField("operation", "<");
				setIsActiveLessThan(checked);
				setIsActiveEqualTo(false);
				setIsActiveGreaterThan(false);
				break;
			default:
				break;
		}
	};

	const handleTextInputChange = (e: any) => {
		const inputValue = e.target.value;
		if (!isNaN(inputValue)) {
			form.setField("trigger_value", inputValue);
		} else {
			alert("please enter the valid number");
		}
	};

	const handleButtonClick = (value: string) => {
		setButtonSelected(value);
		if (value === "ask") {
			form.setField("type", "live-rate-ask");
		}
		if (value === "bid") {
			form.setField("type", "live-rate-bid");
		}
	};

	const handleMessage = async (event: any) => {
		const messageData = JSON.parse(event?.data);

		if (messageData && messageData.type === "notification_info") {
			if (messageData.value === "initial_permission_enabled") {
				closeShowAlerts(false);
			}

			if (messageData.value === "initial_permission_disabled") {
				props.openPermissionModal();
			}
		}
	};

	useEffect(() => {
		window.addEventListener("message", handleMessage, true);

		return () => {
			window.removeEventListener("message", handleMessage, true);
		};
	}, [handleMessage]);

	const handleSubmit = async () => {
		try {
			let triggerValue = form?.value?.trigger_value;
			if (triggerValue.endsWith(".")) {
				alert("Input value is ending with .");
				return;
			}
			await saveAlert(form.value);
			await props.getAllAlerts();
			if (window?.ReactNativeWebView) {
				window?.ReactNativeWebView?.postMessage?.(
					JSON.stringify({
						type: "check_notification_settings",
					}),
				);
			}

			return;
		} catch (err) {
			console.log("error", err);
			form.setErrors(err);
		}
	};

	return (
		<>
			<div className="px-5 mb-10 z-50 flex flex-col  h-[70vh]">
				{showSelectCurrencyPair ? (
					<div className="overflow-scroll absolute top-2 right-0 left-0 bottom-0">
						<SelectCurrencyPair
							setSelectedCurrencyFlagPair={(item: any) => {
								form.setField("pair", item);
							}}
							selectedCurrencyFlagPair={form?.value?.pair?.pair || ""}
							setShowSelectCurrencyPair={setShowSelectCurrencyPair}
						/>
					</div>
				) : (
					<>
						<ContentHeader
							heading="Add alert"
							subHeading="Get notified when the price matches your expectation"
						/>

						<div className="flex items-center mt-2">
							<ButtonBidAndAsk
								onClickAsk={() => handleButtonClick("ask")}
								onClickBid={() => handleButtonClick("bid")}
								classNameAsk={`flex items-center rounded-full ml-2 font-normal text-xs ${
									buttonSelected === "ask"
										? "bg-blackDark text-white hover:bg-blackDark hover:text-white"
										: "bg-white text-blackDark hover:bg-white hover:text-blackDark border border-mine-shaft-2"
								}`}
								classNameBid={`flex items-center rounded-full font-normal text-xs ${
									buttonSelected === "bid"
										? "bg-blackDark text-white hover:bg-blackDark hover:text-white"
										: "bg-white text-blackDark hover:bg-white hover:text-blackDark border border-mine-shaft-2"
								}`}
							/>
						</div>

						<ReuseInputGroup
							onClick={() => setShowSelectCurrencyPair(true)}
							onChange={() => {
								console.log("value changed");
							}}
							wrapperClasses="w-full rounded-xl mt-2"
							//error={form.errors.get("trigger_value")}
							error={
								form.errors.get("pair") ? (
									<div className="flex flex-row items-center pt-2">
										<img
											className="w-[14.67px] h-[14.67px] top-[0.67px] left-[0.67px]"
											src="https://wiredup-staging.imgix.net/eef90e8a-56de-4797-b18b-6782ed95d88d?auto=compress,format"
										/>
										<label className="w-full text-red-600 text-sm text-[14px] pl-2">
											Please select the pair
										</label>
									</div>
								) : (
									""
								)
							}
							className={`${
								form?.value?.pair ? "pl-[52px]" : "pl-4"
							} pr-4 py-3  text-blackDark text-base font-normal rounded-xl border-[1px]  border-[#D9D9D9]`}
							placeholder={
								!form?.value?.pair
									? "Select currency pair e.g: USD/INR"
									: undefined
							}
							prefix={
								<span className="absolute left-4 top-1/2 -translate-y-1/2">
									{form?.value?.pair ? (
										<div className="flex flex-row items-center justify-center">
											<div className="pr-3">
												<CurrencyPairFlags flagpair={form?.value?.pair?.pair} />
											</div>
											{`${form?.value?.pair?.pair.split("/")[0]}`}
											<ArrowIcon className="mx-1" />
											{`${form?.value?.pair?.pair.split("/")[1]} `}
										</div>
									) : null}
								</span>
							}
							suffix={
								form?.value?.pair ? (
									<div
										onClick={() => {
											setShowSelectCurrencyPair(true);
											setIsActiveEqualTo(false);
										}}
									>
										<EditIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
									</div>
								) : (
									<div
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 "
										onClick={() => setShowSelectCurrencyPair(true)}
									>
										<RightSideIcon />
									</div>
								)
							}
						/>
						{form?.value?.pair ? (
							<>
								<div className="pt-6">
									<ComparisonInput
										label="Greater than"
										symbol=">"
										isActive={isActiveGreaterThan}
										pair={
											form.value.pair.pair && form.value.trigger_value
												? getCurrencySymbol(form.value.pair.pair.split("/")[0])
												: ""
										}
										handleRadioChange={(e) =>
											handleRadioChange(e, "GreaterThan")
										}
										handleTextInputChange={handleTextInputChange}
										value={
											form.getField("trigger_value")
												? form.getField("trigger_value")
												: ""
										}
										showBorder={true}
									/>

									<ComparisonInput
										label="Equal to"
										symbol="="
										pair={
											form.value.pair.pair && form.value.trigger_value
												? getCurrencySymbol(form.value.pair.pair.split("/")[0])
												: ""
										}
										isActive={isActiveEqualTo}
										handleRadioChange={(e) => handleRadioChange(e, "EqualTo")}
										handleTextInputChange={handleTextInputChange}
										value={
											form.getField("trigger_value")
												? form.getField("trigger_value")
												: ""
										}
										showBorder={true}
									/>

									<ComparisonInput
										label="Less than"
										symbol="<"
										pair={
											form.value.pair.pair && form.value.trigger_value
												? getCurrencySymbol(form.value.pair.pair.split("/")[0])
												: ""
										}
										isActive={isActiveLessThan}
										handleRadioChange={(e) => handleRadioChange(e, "LessThan")}
										handleTextInputChange={handleTextInputChange}
										value={
											form.getField("trigger_value")
												? form.getField("trigger_value")
												: ""
										}
										showBorder={false}
									/>
								</div>
								{form.errors.get("trigger_value") ? (
									<div className="flex flex-row items-center pt-2">
										<img
											className="w-[14.67px] h-[14.67px] top-[0.67px] left-[0.67px]"
											src="https://wiredup-staging.imgix.net/eef90e8a-56de-4797-b18b-6782ed95d88d?auto=compress,format"
										/>
										<label className="w-full text-red-600 text-sm text-[14px] pl-2">
											Please select the operation and enter value
										</label>
									</div>
								) : null}
								<PrimaryButton
									className="mt-10"
									onClick={() => {
										handleSubmit();
									}}
									buttonText="Save alert"
								/>
							</>
						) : null}
					</>
				)}
			</div>
		</>
	);
};

export default AlertsHome;
