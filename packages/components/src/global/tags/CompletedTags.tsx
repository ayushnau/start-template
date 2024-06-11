import React from "react";
import { IIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { InfoModalV2 } from "components";
import { TRANSACTIONSINFO } from "utils";

export interface CompletedTagsInterface {
	fit?: boolean;
	amount: string;
	amount_currency: string;
}

const CompletedTags: React.FC<CompletedTagsInterface> = ({
	amount,
	amount_currency,
	fit = false,
}) => {
	const loss_styles = "bg-bean-red-dark text-bean-red-light";
	const profit_styles = "bg-mountain-meadow-dark text-mountain-meadow-1";

	let formatted_amount = amount;
	if (typeof amount === "number") {
		formatted_amount = (amount as number).toString();
	}

	const showInfoModal = async () => {
		await InfoModalV2({
			content: TRANSACTIONSINFO,
			web: true,
		});
	};

	const CONSTLABELTEXT = {
		loss: "Loss",
		profit: "Profit",
	};

	return (
		<div
			className={
				`flex items-center rounded-md px-2 py-1 font-bold text-xs ${
					fit ? "w-fit my-1 " : ""
				} ` + (formatted_amount?.includes("-") ? loss_styles : profit_styles)
			}
		>
			{`${getCurrencySymbol(amount_currency)}${formatNumberWithCommas(
				formatted_amount?.replace("-", ""),
			)} ${
				formatted_amount?.includes("-")
					? CONSTLABELTEXT["loss"]
					: CONSTLABELTEXT["profit"]
			}`}
			<span
				onClick={(e) => {
					showInfoModal();
				}}
			>
				<IIcon
					color={formatted_amount?.includes("-") ? "#FFDADA" : "#D1F0E1"}
					svgStyles={"scale-[70%] ml-[2px]"}
				/>
			</span>
		</div>
	);
};

export default CompletedTags;
