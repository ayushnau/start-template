import React from "react";
import { CurrencyFlag, UnderlineButton } from "../..";
import { EditIcon, GreenRoundedCheckIcon, IIcon } from "icons";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

export interface InterestDetailsSectionInterface {
	currency: string;
	interest_value: string;
	lowest?: boolean;
	detailsArray?: { label: string; value: string }[];
	overrideText?: string;
	navigationLink?: string;
	closeModalCallback?: (navLink?: string) => void;
}

const InterestDetailsSection: React.FC<InterestDetailsSectionInterface> = ({
	currency = "USD",
	interest_value = "7.5",
	lowest = false,
	detailsArray,
	overrideText,
	navigationLink,
	closeModalCallback,
}) => {
	const navigate = useNavigate();
	const [showDetails, setShowDetails] = React.useState(false);
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
					onClick={() => {
						closeModalCallback && closeModalCallback(navigationLink);
						navigationLink && navigate(navigationLink);
					}}
				>
					<EditIcon />
				</div>
			</div>
			<div className="flex items-center justify-start mt-2">
				<label className="font-inter text-sm leading-[22px]">
					{overrideText
						? overrideText
						: `Interest cost for ${currency} borrowing`}
				</label>
				{overrideText && (
					<div
						className="ml-1 scale-75 flex items-baseline justify-center"
						onClick={() => {
							console.log("TODO: Open info modal here!");
						}}
					>
						<IIcon color="#212121" />
					</div>
				)}
			</div>
			<div className="flex justify-start gap-x-1 items-center my-1">
				<label
					className={twMerge(
						"font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]",
						lowest ? "text-mountain-meadow-2" : "text-red-core",
					)}
				>{`${interest_value}%`}</label>
				{lowest && <GreenRoundedCheckIcon />}
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

export default InterestDetailsSection;
