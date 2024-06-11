import React from "react";
import {
	BorrowingCostHeader,
	BorrowingCostWrapper,
	BorrowingResultsExportCard,
	BorrowingResultsImportCard,
	UnderlineButton,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import { StoreState, clearBorrowingCostComparisonAll } from "store";

export interface BorrowingResultsInterface {
	closeModal?: (navLink?: string) => void;
}

const BorrowingResults: React.FC<BorrowingResultsInterface> = ({
	closeModal,
}) => {
	const { trade_type, base_currency } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);

	const navigateBackCallback = () => {
		closeModal && closeModal();
	};
	const dispatch = useDispatch();

	return (
		<div className="w-full h-full flex flex-col">
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
				<div className="flex gap-x-10">
					{trade_type === "export" ? (
						<BorrowingResultsExportCard web closeModal={closeModal} />
					) : (
						<BorrowingResultsImportCard web closeModal={closeModal} />
					)}
				</div>
				<UnderlineButton
					buttonText="Done"
					onClick={async () => {
						try {
							dispatch(clearBorrowingCostComparisonAll());
							closeModal &&
								closeModal("/fx-home/fx-tools/borrowing-cost-comparison");
						} catch (error) {
							console.log("Error while Fetching :", error);
							throw error;
						}
					}}
				/>
			</BorrowingCostWrapper>
		</div>
	);
};

export default BorrowingResults;
