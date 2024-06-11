import React from "react";
import { PrimaryButton } from "components";

export interface TableUseHedgeButtonInterface {
	hedge_uuid: number;
	handleUseHedgeButtonClick: any;
	form: any;
	currentActiveHedge?: any;
}

const TableUseHedgeButton: React.FC<TableUseHedgeButtonInterface> = ({
	hedge_uuid,
	handleUseHedgeButtonClick,
	form,
	currentActiveHedge,
}) => {
	const checkShouldDisable = () => {
		if (
			hedge_uuid == currentActiveHedge &&
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
			className="h-8 rounded-lg px-4 py-3"
			buttonText="Use Hedge"
			onClick={() => {
				handleUseHedgeButtonClick();
			}}
			disabled={checkShouldDisable()}
		/>
	);
};

export default TableUseHedgeButton;
