import React, { useState, useEffect } from "react";
import {
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	Header,
	PrimaryInput,
} from "components";

import { useNavigate } from "react-router-dom";
import { StoreState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";

import { CheckIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import {
	setfcnrCostCalculatorAmountBaseCurrency,
	setfcnrCostCalculatorAmountInr,
	setfcnrCostCalculatorCurrencyType,
	setfcnrCostCalculatorDrawdownRateBaseCurrency,
	setfcnrCostCalculatorDrawdownRateInr,
	setfcnrCostCalculatorEquINRamount,
	setfcnrCostCalculatorEquUSDamount,
} from "store/src/fcnrCostCalculatorSlice";

export interface DataRowProps {
	type: "currency1" | "currency2";
	label: string;
	selected: "currency1" | "currency2" | null;
	setSelected: Function;
}

const DataRow = ({ type, label, selected, setSelected }: DataRowProps) => {
	return (
		<div className="flex items-center py-2 justify-start gap-x-2 my-[6px]">
			<input
				type="checkbox"
				checked={type === selected}
				className="form-checkbox h-6 w-6 rounded-full border-[3px] border-semiLightGray focus:ring-transparent checked:focus:bg-black checked:border-black checked:bg-black"
				onChange={() => {
					if (type === selected) {
						setSelected(null); // Uncheck if already selected
					} else {
						setSelected(type); // Check if not selected
					}
				}}
			/>
			<label className="text-mine-shaft-4 text-sm font-inter font-normal leading-[22px]">
				{label}
			</label>
		</div>
	);
};

export interface FcnrLoanAmtInterface {
	web?: boolean;
}
const FcnrLoanAmt: React.FC<FcnrLoanAmtInterface> = ({ web = false }) => {
	const {
		base_currency,
		loan_start_date,
		currency_type,
		amount_base_currency,
		drawdown_rate_base_currency,
		amount_inr,
		drawdown_rate_inr,
	} = useSelector((state: StoreState) => {
		return state.fcnrCostCalculatorSlice;
	});

	const form = useBetaForm({
		amount_currency_form: amount_base_currency,
		drawdown_rate_currency_form: drawdown_rate_base_currency,
		amount_inr_form: amount_inr,
		drawdown_rate_inr_form: drawdown_rate_inr,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [disabled, setDisabled] = useState(true);

	const [selected, setSelected] = useState(
		currency_type as "currency1" | "currency2" | null,
	);
	const [errorMsg1, setErrorMsg1] = useState("");
	const [errorMsg2, setErrorMsg2] = useState("");
	const [additionalContent_1, setAdditionalContent_1] =
		useState<React.ReactNode | null>(null);
	const [additionalContent_2, setAdditionalContent_2] =
		useState<React.ReactNode | null>(null);

	useEffect(() => {
		if (
			(selected === "currency1" &&
				form.value.amount_currency_form != "" &&
				form.value.drawdown_rate_currency_form != "") ||
			(selected === "currency2" &&
				form.value.amount_inr_form != "" &&
				form.value.drawdown_rate_inr_form != "")
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form.value, selected]);

	useEffect(() => {
		var result = 0;
		result =
			form.value.amount_currency_form * form.value.drawdown_rate_currency_form;

		form.value.amount_currency_form != "" &&
		form.value.drawdown_rate_currency_form != ""
			? setAdditionalContent_1(
					<div className="flex ">
						<CheckIcon color={"#7E5700"} />
						<>Equivalent INR amount : ₹{result}</>
					</div>,
			  )
			: setAdditionalContent_1(<></>);
		if(selected==="currency1"){
			dispatch(setfcnrCostCalculatorEquINRamount(result));
		}
	}, [
		form.value.amount_currency_form,
		form.value.drawdown_rate_currency_form,
		selected,
	]);

	useEffect(() => {
	const result = (
		form.value.amount_inr_form / form.value.drawdown_rate_inr_form
	).toFixed(4);
		
		form.value.amount_inr_form != "" && form.value.drawdown_rate_inr_form != ""
			? setAdditionalContent_2(
					<div className="flex ">
						<CheckIcon color={"#7E5700"} />
						<>Equivalent {base_currency} amount : {getCurrencySymbol(base_currency)}{result}</>
					</div>,
			  )
			: setAdditionalContent_2(<></>);
			if(selected==="currency2"){
				dispatch(setfcnrCostCalculatorEquUSDamount(result));
			}
	}, [form.value.amount_inr_form, form.value.drawdown_rate_inr_form, selected]);

	const handleContinueClick = () => {
		
		dispatch(setfcnrCostCalculatorCurrencyType(selected));
		dispatch(
			setfcnrCostCalculatorAmountBaseCurrency(form.value.amount_currency_form),
		);
		dispatch(
			setfcnrCostCalculatorDrawdownRateBaseCurrency(
				form.value.drawdown_rate_currency_form,
			),
		);
		dispatch(setfcnrCostCalculatorAmountInr(form.value.amount_inr_form));
		dispatch(
			setfcnrCostCalculatorDrawdownRateInr(form.value.drawdown_rate_inr_form),
		);
		if (selected === "currency1") {
			dispatch(
				setfcnrCostCalculatorEquUSDamount(form.value.amount_currency_form),
			);
		} else if (selected === "currency2") {
			dispatch(setfcnrCostCalculatorEquINRamount(form.value.amount_inr_form));
		}
		navigate(
			web === true
				? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt/tenor"
				: "/fx-home/fcnr-cost-calculator/details/loan_amt/tenor",
		);
	};

	const handleBackAction = () => {
		navigate(-1);
	};

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={<>FCNR/FCDL cost calculator</>}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={handleBackAction}
			/>
			<div className="w-full h-full flex flex-col justify-between ">
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Enter loan amount and drawdown rate"
						description={`Enter the funds borrowed (${base_currency}/INR equivalent) and the drawdown rate, which is the exchange rate for crediting funds to your current account:`}
					/>

					<div>
						<DataRow
							type="currency1"
							label={base_currency}
							selected={selected}
							setSelected={setSelected}
						/>

						{selected === "currency1" && (
							<>
								<>
									<div className="py-1">
										<PrimaryInput
											onChange={(e: any) => {
												setErrorMsg1("");
												const value = e.target.value;

												if (isNaN(value)) {
													setErrorMsg1("Enter a number");
												}
											}}
											errorMsg={errorMsg1}
											classNames="leading-[22px] "
											form={form}
											field={"amount_currency_form"}
											fieldType={"number"}
											inputMode="decimal"
											placeholder={{
												main: "Enter amount",
											}}
											onBlur={(e, setInFocus) => {
												setInFocus(true);
											}}
											prefix={getCurrencySymbol(base_currency)}
											value={form.value.amount_currency_form}
											numberOnly
										/>
									</div>
									<div className="py-1">
										<PrimaryInput
											onChange={(e: any) => {
												setErrorMsg2("");
												const value = e.target.value;

												if (isNaN(value)) {
													setErrorMsg2("Enter a number ");
												}
											}}
											errorMsg={errorMsg2}
											classNames="leading-[22px] "
											form={form}
											field={"drawdown_rate_currency_form"}
											fieldType={"number"}
											inputMode="decimal"
											placeholder={{
												main: "Enter loan drawdown rate",
											}}
											onBlur={(e, setInFocus) => {
												setInFocus(true);
											}}
											value={form.value.drawdown_rate_currency_form}
											prefix={getCurrencySymbol("INR")}
											numberOnly
										/>
									</div>
								</>

								<div className="text-spanish-yellow-4 p-2" >{additionalContent_1}</div>
							</>
						)}
						<div className="border-b border-dotted w-full border-mine-shaft-2 my-1" />
						<DataRow
							type="currency2"
							label="Equivalent INR amount"
							selected={selected}
							setSelected={setSelected}
						/>
						{selected === "currency2" && (
							<>
								<>
									<div className="py-1">
										<PrimaryInput
											onChange={(e: any) => {
												setErrorMsg1("");
												const value = e.target.value;

												if (isNaN(value)) {
													setErrorMsg1("Enter a number");
												}
											}}
											errorMsg={errorMsg1}
											classNames="leading-[22px] "
											form={form}
											field={"amount_inr_form"}
											fieldType={"number"}
											inputMode="decimal"
											placeholder={{
												main: "Enter amount",
											}}
											onBlur={(e, setInFocus) => {
												setInFocus(true);
											}}
											prefix={getCurrencySymbol("INR")}
											value={form.value.amount_inr_form}
											numberOnly
										/>
									</div>
									<div className="py-1">
										<PrimaryInput
											onChange={(e: any) => {
												setErrorMsg2("");
												const value = e.target.value;

												if (isNaN(value)) {
													setErrorMsg2("Enter a number ");
												}
											}}
											errorMsg={errorMsg2}
											classNames="leading-[22px] "
											form={form}
											field={"drawdown_rate_inr_form"}
											fieldType={"number"}
											inputMode="decimal"
											placeholder={{
												main: "Enter loan drawdown rate",
											}}
											onBlur={(e, setInFocus) => {
												setInFocus(true);
											}}
											value={form.value.drawdown_rate_inr_form}
											prefix={getCurrencySymbol("INR")}
											numberOnly
										/>
									</div>
								</>

								<div className="text-spanish-yellow-4 p-2">{additionalContent_2}</div>
							</>
						)}
					</div>
				</BorrowingCostWrapper>

				<ContinueButton
					web
					continueCallback={handleContinueClick}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default FcnrLoanAmt;
