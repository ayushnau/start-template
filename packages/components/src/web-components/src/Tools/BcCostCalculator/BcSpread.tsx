import React, { useState } from "react";
import { IIcon } from "icons";
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
import showInfoModal from "../../Modals/InfoModal";
import moment from "moment";
import { setbcCostCalculatorSpread } from "store/src/bcCostCalculatorSlice";

export interface BcSpreadInterface {
	web?: boolean;
}

const BcSpread: React.FC<BcSpreadInterface> = ({ web = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { spread, loan_due_date } = useSelector(
		(state: StoreState) => state.bcCostCalculatorSlice,
	);
	const form = useBetaForm({
		float_spread: spread,
	});

	const checkIfDueDateisPast = () => {
		const currentDate = moment();
		const loanDueDate = moment(loan_due_date, "YYYY-MM-DD");
		if (loanDueDate.isBefore(currentDate, 'day')) {
			return true;
		} else {
			return false;
		}
	};

	const handleContinueClick = () => {
		dispatch(setbcCostCalculatorSpread(form.value.float_spread));
		if (checkIfDueDateisPast()) {
			navigate(
				web === true
					? "/fx-home/fx-tools/bc-sc-calculator/details/loan_amt/tenor/int_rate/repay_rate"
					: "/fx-home/bc-sc-calculator/details/loan_amt/tenor/int_rate/repay_rate",
			);
		} else {
			navigate(
				web === true
					? "/fx-home/fx-tools/bc-sc-calculator/details/loan_amt/tenor/int_rate/result"
					: "/fx-home/bc-sc-calculator/details/loan_amt/tenor/int_rate/result",
			);
		}
	};

	const INFODETAILS = [
		{
			title: "Spread",
			description: [
				'The term "spread" refers to the additional interest cost (in basis points) charged over the floating benchmark interest rate.',
			],
		},
	];

	const showInfoCallback = () => {
		showInfoModal({ content: INFODETAILS, web: web });
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
						title="Enter FX adjusted spread"
						description="Please enter the spread on the floating benchmark:"
					/>
				</BorrowingCostWrapper>

				<div className="flex flex-col px-5 pt-4 gap-y-4 flex-1 overflow-y-scroll ">
					<PrimaryInput
						suffix={
							<button
								className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
								onClick={showInfoCallback}
							>
								<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
									<IIcon color={"#717171"} />
								</span>
							</button>
						}
						onChange={(e) => {
							if (isNaN(e.target.value.replaceAll(",", ""))) {
								alert("Please enter number only");
							}
						}}
						prefix={"BPS"}
						form={form}
						value={form.value.float_spread}
						field="float_spread"
						fieldType={"number"}
						inputMode="decimal"
						placeholder={{
							main: "Spread",
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

export default BcSpread;
