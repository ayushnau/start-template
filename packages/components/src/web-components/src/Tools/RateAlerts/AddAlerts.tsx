import React, { useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import {
	ButtonBidAndAsk,
	ContentHeader,
	ComparisonInput,
	PrimaryButton,
	CurrencyPairFlags,
} from "components";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { saveAlert } from "services";
import EditIcon from "icons/EditIcon";
import RightSideIcon from "icons/RightSideIcon";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { ArrowIcon, CrossIcon } from "icons";
import SelectCurrencyPair from "../../../../../../../apps/wiredup/src/pages/fx/Components/SelectCurrencyPair";

export interface AddAlertsInterface {
	closeShowAlerts: Function;
	getAllAlerts: any;
	displayAddToastCallback?: any;
}

const AddAlerts: React.FC<AddAlertsInterface> = ({
	closeShowAlerts,
	displayAddToastCallback,
	getAllAlerts,
}) => {
	const [isActiveGreaterThan, setIsActiveGreaterThan] =
		useState<boolean>(false);
	const [isActiveEqualTo, setIsActiveEqualTo] = useState<boolean>(false);
	const [isActiveLessThan, setIsActiveLessThan] = useState<boolean>(false);
	const [buttonSelected, setButtonSelected] = useState("bid");
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);

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

	const handleSubmit = async () => {
		try {
			let triggerValue = form?.value?.trigger_value;
			if (triggerValue.endsWith(".")) {
				alert("Input value is ending with .");
				return;
			}
			const response = await saveAlert(form.value);
			if (response) {
				displayAddToastCallback && displayAddToastCallback();
			}
			await getAllAlerts();
		} catch (err) {
			console.log("error", err);
			form.setErrors(err);
		}
	};

	return (
		<>
			<div className="w-full px-10 py-5 z-50 flex flex-col h-fit max-h-[70vh]">
				<div
					className="my-3 ml-1 cursor-pointer"
					onClick={() => closeShowAlerts()}
				>
					<CrossIcon className="scale-150" />
				</div>
				{showSelectCurrencyPair ? (
					<div className="overflow-hidden">
						<SelectCurrencyPair
							loaderClasses="h-36 w-[300px] md:w-[425px]"
							classNames="h-fit relative overflow-y-scroll p-0"
							pairsClasses="h-[50vh]"
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
										? "bg-mine-shaft-4 text-white hover:bg-mine-shaft-4 hover:text-white"
										: "bg-white text-mine-shaft-4 hover:bg-white hover:text-mine-shaft-4 border border-mine-shaft-2"
								}`}
								classNameBid={`flex items-center rounded-full font-normal text-xs ${
									buttonSelected === "bid"
										? "bg-mine-shaft-4 text-white hover:bg-mine-shaft-4 hover:text-white"
										: "bg-white text-mine-shaft-4 hover:bg-white hover:text-mine-shaft-4 border border-mine-shaft-2"
								}`}
							/>
						</div>

						<ReuseInputGroup
							onClick={() => {
								setShowSelectCurrencyPair(true);
							}}
							onChange={() => {
								console.log("value changed");
							}}
							wrapperClasses="w-full rounded-xl mt-2"
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
								<div className="pt-4">
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

export default AddAlerts;
