import React, { useState } from "react";
import {
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	Header,
	PrimaryInput,
} from "components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { StoreState } from "store";
import { setfcnrCostCalculatorRepaymentRate } from "store/src/fcnrCostCalculatorSlice";


export interface FcnrCostCalculatorHomeInterface {
	web?: boolean;
}
const FcnrLoanRepayment: React.FC<FcnrCostCalculatorHomeInterface> = ({
	web = false,
}) => {

	const {
		repay_rate,
	} = useSelector((state: StoreState) => {
		return state.fcnrCostCalculatorSlice;
	});

	const navigate = useNavigate();
	const dispatch =useDispatch();

	const [errorMsg, setErrorMsg] = useState("");
	const [disabled, setDisabled] = useState(true);

	const form = useBetaForm({
		loan_repay_rate: repay_rate,
	});
	React.useEffect(() => {
		if (form.value.loan_repay_rate != "") {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	
	}, [form.value]);

	const handleBackNavigation = async () => {
		navigate(-1);
	};
	
	const handleContinueClick = async () => {
		await dispatch(setfcnrCostCalculatorRepaymentRate(form.value.loan_repay_rate));
		navigate(
			web === true
				? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/result"
				: "/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/result",
		);
	};

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={<>FCNR/FCDL cost calculator</>}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={handleBackNavigation}
			/>
			<div className="w-full h-full flex flex-col justify-between">
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Enter loan repayment rate"
						description="Please provide the rate at which the FCNR/FCDL loan was repaid to the bank:"
					/>
				</BorrowingCostWrapper>
				<div className="flex flex-col px-5 pt-4 gap-y-4 flex-1 overflow-y-scroll">
					<div className="py-1">
						<PrimaryInput
							onChange={(e: any) => {
								setErrorMsg("");
								const value = e.target.value;

								if (isNaN(value)) {
									setErrorMsg("Enter a number");
								}
							}}
							errorMsg={errorMsg}
							classNames="leading-[22px] "
							form={form}
							field={"loan_repay_rate"}
							fieldType={"number"}
							inputMode="decimal"
							placeholder={{
								main: "Payment rate e.g. ₹86.70",
							}}
							numberOnly
							prefix={getCurrencySymbol("INR")}
							value={form.value.loan_repay_rate}
						/>
					</div>
				</div>
			</div>
			<ContinueButton
				web
				continueCallback={handleContinueClick}
				disabled={disabled}
			/>
		</div>
	);
};

export default FcnrLoanRepayment;
