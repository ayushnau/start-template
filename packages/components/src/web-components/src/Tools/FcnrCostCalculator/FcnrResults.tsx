import React, { useEffect } from "react";
import { Header, Loader, SecondaryButton } from "components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ResultCardTop from "./ResultCardTop";
import ResultCardBottom from "./ResultCardBottom";
import {
	clearfcnrCostCalculatorAll,
	setfcnrCostCalculatorDueRateUsed,
	setfcnrCostCalculatorInterestCost,
	setfcnrCostCalculatorPrincipalCost,
	setfcnrCostCalculatorTotalCost,
} from "store/src/fcnrCostCalculatorSlice";
import RedirectionConfirmationModal from "../CashVSHedgePickUp/RedirectionConfirmationModal2";
import { StoreState } from "store";
import moment from "moment";
import { calculateFcnrValues } from "services";

export interface FcnrResultInterface {
	web?: boolean;
}

const FcnrResults: React.FC<FcnrResultInterface> = ({ web = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleResetForm = () => {
		dispatch(clearfcnrCostCalculatorAll());
		navigate(
			web === true
				? "/fx-home/fx-tools/fcnr-cost-calculator"
				: "/fx-home/fcnr-cost-calculator",
		);
	};

	const {
		spread,
		loan_due_date,
		loan_start_date,
		num_of_days,
		base_currency,
		eq_inr_amount,
		eq_usd_amount,
		currency_type,
		drawdown_rate_base_currency,
		drawdown_rate_inr,
		fixing_frequency,
		fixed_interest,
		repay_rate,
		due_rate_used,
	} = useSelector((state: StoreState) => {
		return state.fcnrCostCalculatorSlice;
	});

	const drawdown_rate_final =
		currency_type === "currency1"
			? drawdown_rate_base_currency
			: drawdown_rate_inr;

	const checkIfDueDateisPast = () => {
		const currentDate = moment();
		const loanDueDate = moment(loan_due_date, "YYYY-MM-DD");
		if (currentDate.format("YYYY-MM-DD") === loanDueDate.format("YYYY-MM-DD")){
			return false;
		}
		if (loanDueDate == currentDate) {
			return false;
		}
		if (loanDueDate.isBefore(currentDate)) {
			return true;
		} else {
			return false;
		}
	};

	const [isLoading, setIsLoading] = React.useState(false);

	const handleCalculateResult = async (
		loan_completed: boolean,
		drawdown_prop: number,
		repay?: number,
	) => {
		const requestObject = {
			currency: base_currency,
			loan_start_date: loan_start_date,
			usd_amount: eq_usd_amount,
			inr_amount: eq_inr_amount,
			drawdown_rate: drawdown_prop, 
			tenor: num_of_days,
			loan_due_date: loan_due_date,
			fixed_rates: fixed_interest,
			fixing_frequency: fixing_frequency,
			spread: spread,
			is_loan_completed: loan_completed, 
			loan_repayment_rate: repay ? repay : due_rate_used, 
		};
		const calculateFcnrResult = async () => {
			try {
				setIsLoading(true);
				const response: any = await calculateFcnrValues(requestObject);
				dispatch(
					setfcnrCostCalculatorPrincipalCost(response.data.principal_cost),
				);
				dispatch(
					setfcnrCostCalculatorInterestCost(response.data.interest_cost),
				);
				dispatch(setfcnrCostCalculatorTotalCost(response.data.total_cost));
				dispatch(setfcnrCostCalculatorDueRateUsed(response.data.due_rate_used));
			} catch (error) {
				console.log("Error in calculating fcnr values");
				throw error;
			} finally {
				setIsLoading(false);
			}
		};
		calculateFcnrResult();
	};
	const handleBackNavigation = async () => {
		const response = await RedirectionConfirmationModal({});
		if (response) {
			web === true
				? navigate("/fx-home/fx-tools/fcnr-cost-calculator")
				: navigate("/fx-home/fcnr-cost-calculator");
		}
	};

	useEffect(() => {
		 if(repay_rate===""){
			handleCalculateResult(false, parseFloat(drawdown_rate_final));
		}
		else {
				handleCalculateResult(
				true,
				parseFloat(drawdown_rate_final),
				parseFloat(repay_rate));
		}
	}, [drawdown_rate_base_currency, drawdown_rate_inr,repay_rate]);

	return (
		<Loader
			loadingText="Processing.."
			isLoading={isLoading}
			successComponent={
				
				<div className="flex flex-col item-center h-full">
					<div className=" sticky top-0 z-10 bg-white">
						<Header
							className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2 "
							displayTitle={<>FCNR/FCDL cost calculator</>}
							displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
							showEditIcon={false}
							backAction={handleBackNavigation}
						/>
					</div>

					<div className="p-4">
						<ResultCardTop web={web} />
						<ResultCardBottom web={web} />
					</div>

					<div className="shadow-boxShadow mt-auto relative h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full sticky bottom-0 z-20">
						<SecondaryButton
							className="disabled:hover:bg-semiLightGray h-full"
							onClick={() => {
								handleResetForm();
							}}
							buttonText={"Done"}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default FcnrResults;
