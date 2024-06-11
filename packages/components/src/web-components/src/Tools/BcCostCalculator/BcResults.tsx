import React, { useEffect } from "react";
import { Header, Loader, SecondaryButton } from "components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BcResultCardTop from "./BcResultCardTop";
import BcResultCardBottom from "./BcResultCardBottom";
import RedirectionConfirmationModal from "../CashVSHedgePickUp/RedirectionConfirmationModal2";
import { StoreState } from "store";
import { calculateBCSCValues, calculateFcnrValues } from "services";
import {
	clearbcCostCalculatorAll,
	setbcCostCalculatorBorrowingRate,
	setbcCostCalculatorDueRateUsed,
	setbcCostCalculatorInterestCost,
	setbcCostCalculatorPrincipalCost,
	setbcCostCalculatorTotalCost,
} from "store/src/bcCostCalculatorSlice";

export interface ResultInterface {
	web?: boolean;
}

const BcResults: React.FC<ResultInterface> = ({ web = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleResetForm = () => {
		dispatch(clearbcCostCalculatorAll());
		navigate(
			web === true
				? "/fx-home/fx-tools/bc-sc-calculator"
				: "/fx-home/bc-sc-calculator",
		);
	};

	const {
		spread,
		loan_due_date,
		loan_start_date,
		num_of_days,
		base_currency,
		fixing_frequency,
		fixed_interest,
		due_rate_used,
		borrowing_rate_used,
		repayment_rate,
	} = useSelector((state: StoreState) => {
		return state.bcCostCalculatorSlice;
	});

	const [isLoading, setIsLoading] = React.useState(false);

	const handleCalculateResult = async (
		loan_completed: boolean,
		borrow_rate: number,
		repay?: number,
	) => {
		const requestObject = {
			currency: base_currency,
			loan_start_date: loan_start_date,
			tenor: num_of_days,
			loan_due_date: loan_due_date,
			fixed_rates: fixed_interest,
			fixing_frequency: fixing_frequency,
			spread: spread,
			is_loan_completed: loan_completed,
			loan_repayment_rate: repay ? repay : due_rate_used,
			borrowing_rate_given: borrow_rate,
		};
		const calculateBCSCResult = async () => {
			try {
				setIsLoading(true);
				const response: any = await calculateBCSCValues(requestObject);
				dispatch(
					setbcCostCalculatorPrincipalCost(response.data.principal_cost),
				);
				dispatch(setbcCostCalculatorInterestCost(response.data.interest_cost));
				dispatch(setbcCostCalculatorTotalCost(response.data.total_cost));
				dispatch(setbcCostCalculatorDueRateUsed(response.data.due_rate_used));

				dispatch(
					setbcCostCalculatorBorrowingRate(response.data.borrowing_rate_used),
				);
			} catch (error) {
				alert("Please enter valid dates ");
				navigate(
					web === true
						? "/fx-home/fx-tools/bc-sc-calculator/details/loan_amt/tenor"
						: "/fx-home/bc-sc-calculator/details/loan_amt/tenor",
				);
				console.log("Error in calculating BC/SC values");
				throw error;
			} finally {
				setIsLoading(false);
			}
		};
		calculateBCSCResult();
	};
	const handleBackNavigation = async () => {
		const response = await RedirectionConfirmationModal({});
		if (response) {
			web === true
				? navigate("/fx-home/fx-tools/bc-sc-calculator")
				: navigate("/fx-home/bc-sc-calculator");
		}
	};

	useEffect(() => {
		if (repayment_rate === "") {
			handleCalculateResult(false, parseFloat(borrowing_rate_used));
		} else {
			handleCalculateResult(
				true,
				parseFloat(borrowing_rate_used),
				parseFloat(repayment_rate),
			);
		}
	}, [borrowing_rate_used, repayment_rate]);

	return (
		<Loader
			loadingText="Processing.."
			isLoading={isLoading}
			successComponent={
				<div className="flex flex-col item-center h-full">
					<div className=" sticky top-0 z-10 bg-white">
						<Header
							className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2 "
							displayTitle={"BC/SC/LAI cost calculator"}
							displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
							showEditIcon={false}
							backAction={handleBackNavigation}
						/>
					</div>

					<div className="p-4">
						<BcResultCardTop web={web} />
						<BcResultCardBottom web={web} />
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

export default BcResults;
