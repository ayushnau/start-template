import React from "react";
import { PrimaryButton } from "components";

export interface TableUseEefcButtonInterface {
	trade_uuid: number;
	handleUseEefcButtonClick: any;
	form: any;
	currentActivetrade?: any;
}

const TableUseEefcButton: React.FC<TableUseEefcButtonInterface> = ({
	trade_uuid,
	handleUseEefcButtonClick,
	form,
	currentActivetrade,
}) => {
	const checkShouldDisable = () => {
		if (
			trade_uuid == currentActivetrade &&
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
			buttonText="Use EEFC"
			onClick={() => {
				handleUseEefcButtonClick();
			}}
			disabled={checkShouldDisable()}
		/>
	);
};

export default TableUseEefcButton;
