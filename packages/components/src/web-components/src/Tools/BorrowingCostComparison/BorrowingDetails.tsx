import React from "react";
import {
	BorrowingCostHeader,
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	BorrowingDetailsFormComponent,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { clearBorrowingCostComparisonDetails } from "store";
import { showBackConfirmationModal } from "components";

const BorrowingDetails: React.FC = () => {
	const {
		trade_type,
		moratorium,
		base_currency,
		tenor,
		repayment,
		fixing,
		spread,
		subvention,
	} = useSelector((state: any) => state.borrowingCostComparisonSlice);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleContinueClick = () => {
		navigate("/fx-home/fx-tools/borrowing-cost-comparison/details/inr");
	};

	const onBackPress = async () => {
		await showBackConfirmationModal({
			title: "Are you sure you want to leave?",
			description:
				"If you choose to leave this screen, you'll lose all your current progress. ",
			callbackYes: navigateBackCallback,
			makeModalFull: false,
			web: true,
		});
	};

	const activateButton = () => {
		if (trade_type === "export") {
			if (spread !== "" && subvention !== "" && tenor !== "" && fixing !== "") {
				return !true;
			}
		} else {
			if (
				spread !== "" &&
				moratorium !== "" &&
				tenor !== "" &&
				repayment !== "" &&
				fixing !== ""
			) {
				return !true;
			}
		}
		return !false;
	};

	const navigateBackCallback = () => {
		dispatch(clearBorrowingCostComparisonDetails());
		navigate("/fx-home/fx-tools/borrowing-cost-comparison/");
	};

	const form = useBetaForm({
		tenor: tenor,
		moratorium: moratorium,
		fixing: fixing,
		repayment: repayment,
		spread: spread ? spread : "",
		subvention: subvention ? subvention : "",
	});

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<div>
				<BorrowingCostHeader
					label={
						trade_type === "export"
							? "Export Borrowing"
							: "Import/ Term financing"
					}
					subLabel={`${base_currency} vs INR`}
					navigateBackCallback={onBackPress}
				/>
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						currency={base_currency}
						title={`${base_currency} borrowing details`}
						description={`Please provide the necessary information for borrowing in ${base_currency}, so we can calculate the final interest cost`}
					/>
					<BorrowingDetailsFormComponent
						base_currency={base_currency}
						form={form}
					/>
				</BorrowingCostWrapper>
			</div>
			<ContinueButton
				web
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={activateButton()}
			/>
		</div>
	);
};

export default BorrowingDetails;
