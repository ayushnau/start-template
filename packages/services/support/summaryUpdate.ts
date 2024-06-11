import { recalculateSummary } from "services";

export interface SummaryUpdateFunctionInputs {}

let lastExecutionTime = 0;

const summaryUpdate = async () => {
	const current_time = Date.now();
	if (current_time - lastExecutionTime < 120000) return;

	try {
		lastExecutionTime = current_time;
		await recalculateSummary();
	} catch (error) {
		console.log("Error while updating summary data: ", error);
		throw error;
	}
};

export { summaryUpdate };
