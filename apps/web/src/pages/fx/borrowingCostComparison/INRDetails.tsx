import React from "react";
import {
	BorrowingCostHeader,
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	PrimaryInput,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IIcon } from "icons";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { StoreState, setBorrowingCostComparisonInterestRate } from "store";

const INRDetailsScreen: React.FC = () => {
	const { base_currency, interest_rate, trade_type } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleContinueClick = () => {
		const val = +form.value.interest_rate;
		dispatch(setBorrowingCostComparisonInterestRate(val.toString()));
		navigate("/fx-home/borrowing-cost-comparison/details/results");
	};

	const activateButton = () => {
		if (
			form.value.interest_rate &&
			form.value.interest_rate !== "" &&
			+form.value.interest_rate > 0
		) {
			return !true;
		}
		return !false;
	};

	const navigateBackCallback = () => {
		navigate("/fx-home/borrowing-cost-comparison/details");
	};

	const form = useBetaForm({
		interest_rate: interest_rate ? interest_rate : "",
	});

	return (
		<div className="md:mx-auto w-full md:w-1/3">
			<BorrowingCostHeader
				label={
					trade_type === "export"
						? "Export Borrowing"
						: "Import/ Term financing"
				}
				subLabel={`${base_currency} vs INR`}
				navigateBackCallback={navigateBackCallback}
			/>
			<BorrowingCostWrapper>
				<BorrowingCostTextContent
					currency={"INR"}
					title={`INR borrowing details`}
					description={`Please share the interest rate offered by your bank for borrowing in INR, so we can compare the two interest costs`}
				/>
				<div className="mt-2">
					<PrimaryInput
						suffix={
							<button
								className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
								//TODO: Show info modal here
								onClick={() => console.log(">>SHOW INFO MODAL FROM HERE")}
							>
								<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
									<IIcon color={"#717171"} />
								</span>
							</button>
						}
						value={
							form.value.interest_rate !== "" ? form.value.interest_rate : " "
						}
						prefix={"%"}
						form={form}
						field="interest_rate"
						fieldType={"number"}
						inputMode="decimal"
						placeholder={{
							main: "Enter interest rate ",
							subString: "e.g. 9%",
						}}
					/>
				</div>
			</BorrowingCostWrapper>
			<ContinueButton
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={activateButton()}
			/>
		</div>
	);
};

export default INRDetailsScreen;
