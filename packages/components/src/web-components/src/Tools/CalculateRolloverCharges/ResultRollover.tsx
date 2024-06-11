import React from "react";
import { SecondaryButton, TradeInfoToolsCard } from "../../../../..";
import RollOverToolResult from "../../../../../src/RollOverToolResult";

interface ResultRolloverProps {
	web?: boolean;
	form: any;
	type: "import" | "export";
	setShowResult: Function;
	current_hedge_maturity_date: string;
	new_hedge_maturity_date: string;
	currency_pair: string;
	rolloverRateChange: any;
	handleResetForm: Function;
}
const ResultRollover: React.FC<ResultRolloverProps> = ({
	web = false,
	form,
	type,
	setShowResult,
	current_hedge_maturity_date,
	new_hedge_maturity_date,
	currency_pair,
	rolloverRateChange,
	handleResetForm,
}) => {
	return (
		<div className="h-full flex flex-col">
			<div className="h-full flex flex-col gap-y-4 px-4 py-4">
				<TradeInfoToolsCard
					type={type}
					pair={currency_pair}
					details={[
						<p>Current Hedge maturity date: {current_hedge_maturity_date}</p>,
						<p>New Hedge maturity date: {new_hedge_maturity_date}</p>,
					]}
					paragraphClasses="gap-y-1"
					wrapperClasses="rounded-xl"
					handleEditButtonClick={() => setShowResult(false)}
				/>

				<RollOverToolResult
					web={web}
					form={form}
					rolloverRateChange={rolloverRateChange}
				/>
			</div>
			<div className="shadow-boxShadow mt-auto relative h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full">
				<SecondaryButton
					className="disabled:hover:bg-semiLightGray h-full"
					onClick={() => {
						handleResetForm();
						setShowResult(false);
						//   navigate(back);
					}}
					buttonText={"Done"}
				/>
			</div>
		</div>
	);
};

export default ResultRollover;
