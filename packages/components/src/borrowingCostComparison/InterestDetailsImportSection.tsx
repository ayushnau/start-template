import React from "react";
import { CurrencyFlag, UnderlineButton } from "../..";
import { EditIcon, GreenRoundedCheckIcon, IIcon } from "icons";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

export interface InterestDetailsSectionInterface {
	currency: string;
	interest_value: string[];
	lowest?: 0 | 1 | 2;
	detailsArray?: { label: string; value: string }[];
	navigationLink?: string;
	tenor?: string;
	closeModalCallback?: (navLink?: string) => void;
}

const InterestDetailsImportSection: React.FC<
	InterestDetailsSectionInterface
> = ({
	currency = "USD",
	interest_value = "7.5",
	lowest = undefined,
	detailsArray,
	navigationLink,
	tenor,
	closeModalCallback,
}) => {
	const [showDetails, setShowDetails] = React.useState(false);

	const label1 = "Fully Hedged cost";
	const label2 = "Unhedged floating interest cost";
	const label3 = "Unhedged fixed rate cost";

	const navigate = useNavigate();

	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<div className="flex justify-start gap-x-2">
					<CurrencyFlag currency={currency} />
					<label className="font-inter  font-bold leading-6 -tracking-[0.3px]">
						{currency}
					</label>
				</div>
				<div
					onClick={async () => {
						navigationLink && navigate(navigationLink);
						setTimeout(() => {
							closeModalCallback && closeModalCallback(navigationLink);
						}, 1000);
					}}
				>
					<EditIcon />
				</div>
			</div>
			<div className="flex items-center justify-start mt-2">
				<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
					{label1}
				</label>
				<div
					className="ml-1 scale-75 flex items-baseline justify-center"
					onClick={() => {
						console.log("TODO: Open info modal here!");
					}}
				>
					<IIcon color="#212121" />
				</div>
			</div>
			<div className="flex justify-start gap-x-1 items-center my-1">
				<label
					className={twMerge(
						"font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]",
						lowest === 0 ? "text-mountain-meadow-2" : "text-red-core",
					)}
				>{`${interest_value[0]}%`}</label>
				{lowest === 0 && <GreenRoundedCheckIcon />}
			</div>
			<div className="flex items-center justify-start mt-2">
				<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
					{label2}
				</label>
				<div
					className="ml-1 scale-75 flex items-baseline justify-center"
					onClick={() => {
						console.log("TODO: Open info modal here!");
					}}
				>
					<IIcon color="#212121" />
				</div>
			</div>
			<div className="flex justify-start gap-x-1 items-center my-1">
				<label
					className={twMerge(
						"font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]",
						lowest === 1 ? "text-mountain-meadow-2" : "text-red-core",
					)}
				>{`${interest_value[1]}%`}</label>
				{lowest === 1 && <GreenRoundedCheckIcon />}
			</div>
			<div className="flex items-center justify-start mt-2">
				<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
					{label3}
				</label>
				<div
					className="ml-1 scale-75 flex items-baseline justify-center"
					onClick={() => {
						console.log("TODO: Open info modal here!");
					}}
				>
					<IIcon color="#212121" />
				</div>
			</div>
			<div className="flex justify-start gap-x-1 items-center my-1">
				<label
					className={twMerge(
						"font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]",
						tenor === "3Y" || tenor === "5Y"
							? lowest === 2
								? "text-mountain-meadow-2"
								: "text-red-core"
							: "text-color-black-5",
					)}
				>{`${
					tenor === "3Y" || tenor === "5Y" ? interest_value[2] + "%" : "NA"
				}`}</label>
				{lowest === 2 && <GreenRoundedCheckIcon />}
			</div>
			{showDetails && (
				<div
					id="details section"
					className="px-3 py-2 grid grid-cols-3 gap-y-4 rounded-xl bg-mine-shaft-1"
				>
					{detailsArray &&
						detailsArray.map((ele, index) => {
							return (
								<div
									className="flex flex-col gap-y-1 justify-start"
									key={index}
								>
									<label className="font-inter text-xs leading-4 text-mine-shaft-3">
										{ele.label}
									</label>
									<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
										{ele.value}
									</label>
								</div>
							);
						})}
				</div>
			)}
			{detailsArray && (
				<UnderlineButton
					className="w-fit px-0 py-0 h-8"
					buttonText={`${showDetails ? "Hide" : "View"} Details`}
					onClick={() => {
						setShowDetails((prev) => !prev);
					}}
				/>
			)}
		</div>
	);
};

export default InterestDetailsImportSection;
