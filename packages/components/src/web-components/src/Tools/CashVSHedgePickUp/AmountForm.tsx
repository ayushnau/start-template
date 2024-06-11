import React from "react";
import { useNavigate } from "react-router-dom";
import ToolsContentWrapper from "../Support/ToolsContentWrapper";
import HeadingDescriptionComponent from "../Support/HeadingDescriptionComponent";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { PrimaryButton, Loader, Header, PrimaryInput } from "components";
import { useDispatch, useSelector } from "react-redux";
import {
	setCashVsHedgepickupAmountsData,
	setCashVsHedgepickupResponseData,
} from "store";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { InfoDescription } from "../Support/InfoDescription";
import { calculateCashVsHedgePickup } from "services";
const monthNames = [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC",
];
export interface AmountFromInterface {
	web?: boolean;
}

const AmountFrom: React.FC<AmountFromInterface> = ({ web = false }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

	const {
		type,
		pair,
		hedge_data,
		receivable_amount,
		no_months_hedge,
		additional_receivable_amount,
	} = useSelector((state: any) => state?.cashVsHedgepickupTool);
	const [currency1] = pair.split("/");

	const today = new Date();
	const month = monthNames[today.getMonth()];

	const months_hedge_data =
		hedge_data.hedges[
			Object.keys(hedge_data.hedges).filter((ele) =>
				ele.toLowerCase().includes(month.toLowerCase()),
			)[0]
		];

	const form = useBetaForm({
		receivable_amount: receivable_amount ? receivable_amount : "",
		additional_receivable_amount: additional_receivable_amount
			? additional_receivable_amount
			: "",
	});

	const handleFormSubmit = async () => {
		try {
			setIsLoading(true);
			dispatch(setCashVsHedgepickupAmountsData(form.value));
			const payload: any = {
				type: type,
				pairs: pair,
				hedge_amount_for_month: months_hedge_data?.totalAmount
					? months_hedge_data?.totalAmount
					: hedge_data.total_amount,
				weighted_avg_for_month: months_hedge_data?.weightedAverageRate
					? months_hedge_data?.weightedAverageRate
					: hedge_data.totalWeightedAverageRate,
				total_user_entered_amount:
					+form.value.receivable_amount +
					+form.value.additional_receivable_amount,
			};
			if (no_months_hedge) {
				payload["no_month_hedges"] = true;
			}
			const response: any = await calculateCashVsHedgePickup(payload);
			if (response.result) {
				dispatch(setCashVsHedgepickupResponseData(response));
			}
			navigate(
				web
					? "/fx-home/fx-tools/cash-vs-hedge-pickup/results"
					: "/fx-home/cash-vs-hedge-pickup/results",
			);
		} catch (error) {
			console.log("Error while Fetching :", error);
			alert(
				"Error while calculation Cash vs Hedge Pickup Rate! Pls check your input!",
			);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackNavigation = () => {
		navigate(-1);
	};

	React.useEffect(() => {
		setIsButtonDisabled(
			form.value.receivable_amount === "" ||
				parseFloat(form.value.receivable_amount) <= 0,
		);
	}, [form.value.receivable_amount]);

	return (
		<Loader
			loadingText="Processing.."
			isLoading={isLoading}
			successComponent={
				<div className={"relative md:mx-auto w-full h-full pb-[72px]"}>
					<Header
						className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
						displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
						displayTitle={"Cash vs. hedge pickup"}
						showEditIcon={false}
						subtitleWrapper="ml-0"
						backAction={handleBackNavigation}
					/>
					<ToolsContentWrapper classes="gap-y-2">
						<HeadingDescriptionComponent
							wrapperClasses="pt-2 pb-0"
							heading={`Add ${
								type === "export" ? "receivable" : "payable"
							}(s) details`}
							description="Please provide the necessary information to proceed:"
						/>
						<div className="mt-2">
							<PrimaryInput
								form={form}
								field="receivable_amount"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: `${
										type === "export" ? "Receivable" : "Payable"
									} amount `,
									subString: currency1
										? `e.g:  ${
												getCurrencySymbol(currency1) || currency1
										  } 500,000`
										: "e.g: $500,000",
								}}
								prefix={getCurrencySymbol(currency1)}
								numberOnly
								defaultValue={form.value.receivable_amount}
							/>
						</div>
						<div className="mt-2">
							<PrimaryInput
								form={form}
								field="additional_receivable_amount"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: `Additional ${
										type === "export" ? "receivable" : "payable"
									} (If any)`,
								}}
								prefix={getCurrencySymbol(currency1)}
								numberOnly
								defaultValue={form.value.additional_receivable_amount}
							/>
						</div>
						<InfoDescription>
							Additional amount of{" "}
							{type === "export" ? "receivable" : "payable"} expected in the
							current month. This will help us evaluate cash usage vs. Hedge
							pickup better.
						</InfoDescription>
					</ToolsContentWrapper>
					<div className="shadow-boxShadow absolute bottom-0 h-[72px] py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full">
						<PrimaryButton
							className="disabled:hover:bg-semiLightGray h-full"
							onClick={handleFormSubmit}
							disabled={isButtonDisabled}
							buttonText={"Compare"}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default AmountFrom;
