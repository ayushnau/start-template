import React, { useState, useEffect } from "react";
import {
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	Header,
	PrimaryInput,
} from "components";

import { useNavigate } from "react-router-dom";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "store";
import moment from "moment";
import {
	setfcnrCostCalculatorFixedInterest,
	setfcnrCostCalculatorInterestType,
} from "store/src/fcnrCostCalculatorSlice";

export interface DataRowProps {
	type: "Fixed" | "Floating";
	label: string;
	selected: "Fixed" | "Floating" | null;
	setSelected: Function;
	form: any;
}

const DataRow = ({ type, label, selected, setSelected }: DataRowProps) => {
	return (
		<div className="flex items-center py-2 justify-start gap-x-2 my-[6px] w-1/2">
			<input
				type="checkbox"
				className="form-checkbox h-6 w-6 rounded-full border-[3px] border-semiLightGray focus:ring-transparent checked:focus:bg-black checked:border-black checked:bg-black"
				onChange={() => {
					if (type === selected) {
						setSelected(null); // Uncheck if already selected
					} else {
						setSelected(type); // Check if not selected
					}
				}}
				checked={type === selected}
			/>
			<label className="text-mine-shaft-4 text-sm font-inter font-normal leading-[22px]">
				{label}
			</label>
		</div>
	);
};

export interface FcnrInterestRateInterface {
	web?: boolean;
}
const FcnrInterestRate: React.FC<FcnrInterestRateInterface> = ({
	web = false,
}) => {
	const {
		interest_type,
		loan_due_date,
		fixed_interest,
	} = useSelector((state: StoreState) => {
		return state.fcnrCostCalculatorSlice;
	});

	const [selected, setSelected] = useState(
		interest_type as "Fixed" | "Floating" | null,
	);
	const [disabled, setDisabled] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");

	const form = useBetaForm({
		fixed_interest_form: fixed_interest,
		float_SOFR: "",
		float_spread: "",
		disabled: true,
		selected_interest_type: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (selected === "Floating") {
			setDisabled(false);
		} else if (selected === "Fixed" && form.value.fixed_interest_form != "") {
			setDisabled(false);
		}
		else setDisabled(true)
	}, [selected, form.value.fixed_interest_form]);

	
	const checkIfDueDateisPast = () => {
		const currentDate = moment();
		const loanDueDate = moment(loan_due_date, "YYYY-MM-DD");
		 if (
				currentDate.format("YYYY-MM-DD") === loanDueDate.format("YYYY-MM-DD")
			) {
				return false;
			}
		if (loanDueDate.isBefore(currentDate)) {
			return true;
		} else {
			return false;
		}
	};

	const handleContinueClick = () => {
		dispatch(setfcnrCostCalculatorInterestType(selected));
		let res = checkIfDueDateisPast();
		if (selected === "Floating") {
			navigate(
				web === true
					? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr"
					: "/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr",
			);
		} else {
			dispatch(
				setfcnrCostCalculatorFixedInterest(form.value.fixed_interest_form),
			);
			if(res === true)
				{ navigate(
						web == true
							? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/repay_rate"
							: "/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/repay_rate",
				  )
				}
			else{
				
					navigate(
						web === true
							? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/result"
							: "/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/result",
				  	);
				
					}
		}
	};

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={<>FCNR/FCDL cost calculator</>}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={() => {
					navigate(-1);
				}}
			/>
			<div className="w-full h-full flex flex-col justify-between ">
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Enter adjusted interest rate"
						description="Please choose the interest type. For fixed interest type, enter the agreed interest rate (adjusted for FX spread):"
					/>

					<div className="w-full h-full flex flex-col justify-between ">
						<div className="flex">
							<DataRow
								type="Fixed"
								label={"Fixed"}
								selected={selected}
								setSelected={setSelected}
								form={form}
							/>

							{selected === "Fixed" && (
								<>
									<div className="w-1/2">
										<PrimaryInput
											onChange={(e: any) => {
												const value = e.target.value;
												if (isNaN(value)) {
													setErrorMsg("Enter a number");
												}
											}}
											classNames="leading-[22px] "
											form={form}
											field={"fixed_interest_form"}
											fieldType={"number"}
											inputMode="decimal"
											placeholder={{
												main: "e.g. 10%",
											}}
											prefix="%"
											value={form.value.fixed_interest_form}
											numberOnly
										/>
									</div>
								</>
							)}
						</div>
						<div className="border-b border-dotted w-full border-mine-shaft-2 my-1 " />
						<div>
							<DataRow
								type="Floating"
								label="Floating"
								selected={selected}
								setSelected={setSelected}
								form={form}
							/>
						</div>
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

export default FcnrInterestRate;
