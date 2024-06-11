import React from "react";
import { PrimaryInput } from "../..";
import { IIcon } from "icons";
import { useSelector, useDispatch } from "react-redux";
import DetailsFormPrimaryField from "./DetailsFormPrimaryField";
import { MonthKeyValues } from "utils";
import {
	StoreState,
	setBorrowingCostComparisonSpread,
	setBorrowingCostComparisonSubvention,
} from "store";
import { InfoModal } from "components";
import {
	setBorrowingCostComparisonMoratorium,
	setBorrowingCostComparisonRepayment,
} from "store";
export interface BorrowingDetailsFormComponentInterface {
	base_currency: "USD" | "EUR";
	form: any;
}

const BorrowingDetailsFormComponent: React.FC<
	BorrowingDetailsFormComponentInterface
> = ({ base_currency, form }) => {
	const {
		trade_type,
		tenor,
		fixing,
		moratorium,
		repayment,
		spread,
		subvention,
	} = useSelector((state: StoreState) => state.borrowingCostComparisonSlice);
	const dispatch = useDispatch();

	const isMoratoriumDisabled =
		trade_type === "import" && !(tenor === "3Y" || tenor === "5Y");
	const isRepaymentDisabled = trade_type === "import" && moratorium === "NA";

	const setMoritoriumForImport = () => {
		if (isMoratoriumDisabled)
			dispatch(setBorrowingCostComparisonMoratorium("NA"));
	};

	const setRepaymentForImport = () => {
		if (isRepaymentDisabled)
			dispatch(setBorrowingCostComparisonRepayment("bullet"));
	};

	const openInfoModal = async () => {
		await InfoModal({
			fillContent: [
				{
					title: "",
					description:
						"Compare short-term and long-term borrowing costs in foreign currency vs INR",
				},
			],
		});
	};
	React.useEffect(() => {
		setMoritoriumForImport();
		setRepaymentForImport();
	}, [repayment, moratorium]);

	return (
		<div className="mt-2 flex flex-col gap-y-4 pb-20">
			<DetailsFormPrimaryField
				label="Tenor"
				navigateLink="tenor"
				value={MonthKeyValues[tenor]}
			/>
			<DetailsFormPrimaryField
				label={` Fixing Frequency (${
					base_currency === "USD" ? "SOFR" : "EURIBOR"
				})`}
				navigateLink="fixing"
				value={MonthKeyValues[fixing]}
			/>
			{trade_type === "import" && (
				<DetailsFormPrimaryField
					label={`Moratorium`}
					navigateLink="moratorium"
					value={MonthKeyValues[moratorium]}
					disabled={isMoratoriumDisabled}
				/>
			)}
			{trade_type === "import" && (
				<DetailsFormPrimaryField
					label={`Repayment schedule`}
					navigateLink="repayment"
					value={MonthKeyValues[repayment]}
					disabled={isRepaymentDisabled}
				/>
			)}
			<PrimaryInput
				suffix={
					<button
						className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
						//TODO: Show info modal here
						onClick={openInfoModal}
					>
						<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
							<IIcon color={"#717171"} />
						</span>
					</button>
				}
				onChange={(e) => {
					if (isNaN(e.target.value.replaceAll(",", ""))) {
						alert("Please enter number only");
					} else {
						dispatch(
							setBorrowingCostComparisonSpread(
								e.target.value.replaceAll(",", ""),
							),
						);
					}
				}}
				value={spread}
				prefix={"BPS"}
				form={form}
				field="spread"
				fieldType={"number"}
				inputMode="decimal"
				placeholder={{
					main: "Enter Spread e.g: 200 Bps",
				}}
			/>
			{trade_type === "export" && (
				<PrimaryInput
					suffix={
						<button
							className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
							onClick={openInfoModal}
						>
							<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
								<IIcon color={"#717171"} />
							</span>
						</button>
					}
					onChange={(e) => {
						if (isNaN(e.target.value.replaceAll(",", ""))) {
							alert("Please Enter Numbers only");
						} else {
							dispatch(
								setBorrowingCostComparisonSubvention(
									e.target.value.replaceAll(",", ""),
								),
							);
						}
					}}
					value={subvention}
					prefix={"%"}
					form={form}
					field="subvention"
					fieldType={"number"}
					inputMode="decimal"
					placeholder={{
						main: "Subvention % (Optional)",
					}}
				/>
			)}
		</div>
	);
};

export default BorrowingDetailsFormComponent;
