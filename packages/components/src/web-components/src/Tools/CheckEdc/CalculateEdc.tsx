import React from "react";
import { Header, SecondaryButton } from "components";
import { TradeInfoToolsCard } from "components";
import { EdcToolsResult } from "components";

interface CalculateEdcProps {
	type: "import" | "export";
	hedgeMaturityDate: string;
	setShowResult: Function;
	edcCalculatedPoint: string;
	pair: string;
	handleResetForm: Function;
}
const CalculateEdc: React.FC<CalculateEdcProps> = ({
	type,
	hedgeMaturityDate,
	setShowResult,
	edcCalculatedPoint,
	pair,
	handleResetForm,
}) => {
	return (
		<div className="h-full flex flex-col">
			<div className="h-full flex flex-col gap-y-4 px-4 py-4">
				<TradeInfoToolsCard
					type={type}
					pair={pair}
					details={[<p>Hedge maturity date: {hedgeMaturityDate}</p>]}
					handleEditButtonClick={() => setShowResult(false)}
				/>
				<EdcToolsResult
					edcCalculatedPoint={edcCalculatedPoint}
					pair={pair}
					type={type}
				/>
			</div>
			<div className="shadow-boxShadow mt-auto relative h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full">
				<SecondaryButton
					className="disabled:hover:bg-semiLightGray h-full"
					onClick={() => {
						setShowResult(false);
						handleResetForm();
						//   navigate("/fx-home/fx-tools/check-edc/calculated-trade-details");
					}}
					buttonText={"Done"}
				/>
			</div>
		</div>
	);
};

export default CalculateEdc;
