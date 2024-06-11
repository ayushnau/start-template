import React from "react";
import {
	BorrowingCostHeader,
	BorrowingCostWrapper,
	BorrowingResultsExportCard,
	BorrowingResultsImportCard,
	UnderlineButton,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreState, clearBorrowingCostComparisonAll } from "store";

const BorrowingResultsScreen: React.FC = () => {
	const { trade_type, base_currency } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const navigateBackCallback = () => {
		navigate(-1);
	};

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
			<BorrowingCostWrapper className="gap-y-4">
				{trade_type === "export" ? (
					<BorrowingResultsExportCard />
				) : (
					<BorrowingResultsImportCard />
				)}
				<UnderlineButton
					buttonText="Done"
					onClick={() => {
						dispatch(clearBorrowingCostComparisonAll());
						navigate("/fx-home");
					}}
				/>
			</BorrowingCostWrapper>
		</div>
	);
};

export default BorrowingResultsScreen;
