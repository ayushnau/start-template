import React from "react";
import CurrencyPairBadge from "../../components/src/portfolio/SortFilters/CurrencyPairBadge";
import EditIcon from "icons/EditIcon";
import { CurrencyPairIconWithText } from "components";
import { capitalizeFirstLetter } from "services";
import { twMerge } from "tailwind-merge";

interface TradeInfoToolsCardProps {
	type: "import" | "export";
	details: React.ReactNode[];
	handleEditButtonClick?: Function;
	pair: string;
	paragraphClasses?: string;
	wrapperClasses?: string;
}

const TradeInfoToolsCard: React.FC<TradeInfoToolsCardProps> = ({
	type,
	pair,
	details,
	handleEditButtonClick,
	paragraphClasses = "",
	wrapperClasses = "",
}) => {
	return (
		<div
			className={twMerge(
				"rounded-xl border border-mine-shaft-2 px-4 py-4 flex flex-col gap-y-1",
				wrapperClasses,
			)}
		>
			<div className="flex justify-between">
				<CurrencyPairIconWithText pair={pair} />
				<div
					className="cursor-pointer"
					onClick={() => handleEditButtonClick && handleEditButtonClick()}
				>
					<EditIcon />
				</div>
			</div>
			<div
				className={twMerge(
					"flex flex-col text-color-black-6 text-sm font-normal leading-[22px]",
					paragraphClasses,
				)}
			>
				<p>Trade type: {capitalizeFirstLetter(type)}</p>
				{...details}
			</div>
		</div>
	);
};

export default TradeInfoToolsCard;
