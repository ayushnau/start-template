import React from "react";
import { PrimaryButton } from "components";

export interface TablePCFCLoanRepayButtonInterface {
	pcfc_uuid: number;
	handlePCFCLoanRepayButtonClick: any;
	form: any;
	currentActivePCFCLoan?: any;
}

const TablePCFCLoanRepayButton: React.FC<TablePCFCLoanRepayButtonInterface> = ({
	pcfc_uuid,
	handlePCFCLoanRepayButtonClick,
	form,
	currentActivePCFCLoan,
}) => {
	const checkShouldDisable = () => {
		if (
			pcfc_uuid == currentActivePCFCLoan &&
			form.value.amount !== "" &&
			form.value.date_of_transaction !== "" &&
			!form.errors.hasErrors()
		) {
			return false;
		}
		return true;
	};
	return (
		<PrimaryButton
			className={`h-8 rounded-lg px-4 py-3 ${
				checkShouldDisable() ? "cursor-not-allowed" : ""
			}`}
			buttonText="Repay"
			onClick={() => {
				handlePCFCLoanRepayButtonClick();
			}}
			disabled={checkShouldDisable()}
		/>
	);
};

export default TablePCFCLoanRepayButton;
