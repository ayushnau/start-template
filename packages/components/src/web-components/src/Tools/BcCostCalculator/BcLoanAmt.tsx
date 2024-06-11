import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	Header,
	PrimaryInput,
} from "components";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useNavigate } from "react-router-dom";
import { StoreState } from "store";
import { setbcCostCalculatorLoanAmt } from "store/src/bcCostCalculatorSlice";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

export interface BcLoanAmtInterface {
	web?: boolean;
}

const BcLoanAmt: React.FC<BcLoanAmtInterface> = ({ web = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loan_amount, base_currency } = useSelector(
		(state: StoreState) => state.bcCostCalculatorSlice,
	);
	const form = useBetaForm({
		loan_amt_form: loan_amount,
	});

	const handleContinueClick = () => {
		dispatch(setbcCostCalculatorLoanAmt(form.value.loan_amt_form));

		navigate(
			web === true
				? "/fx-home/fx-tools/bc-sc-calculator/details/loan_amt/tenor"
				: "/fx-home/bc-sc-calculator/details/loan_amt/tenor",
		);
	};

	const [disabled, setDisabled] = useState(true);

	React.useEffect(() => {
		if (form.value.float_spread != "") {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form.value]);

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={"BC/SC/LAI cost calculator"}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={() => {
					navigate(-1);
				}}
			/>
			<div className="w-full h-full flex flex-col justify-between ">
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Enter loan amount"
						description="Please enter the funds borrowed:"
					/>
				</BorrowingCostWrapper>

				<div className="flex flex-col px-5 pt-4 gap-y-4 flex-1 overflow-y-scroll ">
					<PrimaryInput
						onChange={(e) => {
							if (isNaN(e.target.value.replaceAll(",", ""))) {
								alert("Please enter number only");
							}
						}}
						prefix={getCurrencySymbol(base_currency)}
						form={form}
						value={form.value.loan_amt_form}
						field="loan_amt_form"
						fieldType={"number"}
						inputMode="decimal"
						placeholder={{
							main: "Amount e.g. $10,000",
						}}
					/>
				</div>
			</div>
			<ContinueButton
				web
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={disabled}
			/>
		</div>
	);
};

export default BcLoanAmt;
