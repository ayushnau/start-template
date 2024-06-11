import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import { IIcon } from "icons";
import UpdatedPrompt from "./UpdatedPrompt";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import moment from "moment";
import "moment-timezone";
import { HedgeLinkUnlinkIndicator } from "components";
import { MaturityBanner } from "components";
import { formatDate, formatNumberWithCommas } from "utils";

interface HedgeSliderProps {
	details: any;
	showInfoCallback?: Function;
	hedgeCompleted?: boolean;
	handleUpdateCallback?: () => void;
}

const HedgeSlider: React.FC<HedgeSliderProps> = ({
	details,
	showInfoCallback,
	hedgeCompleted,
	handleUpdateCallback,
}) => {
	const showInfoModal = async () => {
		showInfoCallback && (await showInfoCallback());
	};
	const [sliderWidth, setSliderWidth] = useState("0%");

	useEffect(() => {
		if (details) {
			const used_amount =
				parseInt(details?.hedge_amount) - parseInt(details?.remaining_amount);
			const hedge_amount = parseInt(details?.hedge_amount);

			setSliderWidth(`${Math.abs((used_amount / hedge_amount) * 100)}%`);
		}
	}, []);

	return (
		<div className="rounded-xl border border-mine-shaft-2">
			<div className="mx-4 mt-4 mb-3 py-1">
				<div className="flex items-center justify-between">
					<p className="font-normal text-sm  leading-[22px] font-inter text-mine-shaft-3 ">
						{`Balance amount (${(
							(details.remaining_amount * 100) /
							details.hedge_amount
						).toFixed(2)})%`}
					</p>
					<span
						onClick={() => {
							showInfoModal();
						}}
						className="cursor-pointer"
					>
						<IIcon color="#717171" />
					</span>
				</div>
				<div className="text-blackDark mt-[6px] font-bold font-inter text-xl leading-[26px] -tracking-[.35px] flex-wrap break-all">
					{`${
						getCurrencySymbol(details.base_currency)
							? getCurrencySymbol(details.base_currency)
							: details.base_currency
					}${
						details?.remaining_amount
							? formatNumberWithCommas(details?.remaining_amount)
							: ""
					}`}
				</div>

				{hedgeCompleted ? (
					<div className="text-bean-red-dark inline-block bg-bean-red-light px-2 py-1 rounded-lg mt-1 text-sm font-semibold leading-[22px]">
						Update Hedge to view profit/ loss
					</div>
				) : !details?.current_market_rates ||
				  details.current_market_rates === 0 ? (
					<div className="text-[#7E5700]  bg-[#FFDEAC] inline-block px-2 py-1 rounded-lg mt-1 text-sm font-semibold leading-[22px]">
						<span className="">Rate Unavailable</span>
					</div>
				) : (
					<div>
						<Tag
							color={details.mtm < 0 ? "Red" : "Green"}
							currencyCode={
								getCurrencySymbol(details.quote_currency)
									? getCurrencySymbol(details.quote_currency)
									: details.quote_currency
							}
							className="py-1 px-3 my-0 text-mountain-meadow-dark font-inter font-bold text-sm leading-[22px] rounded-lg"
							onClick={() => showInfoModal()}
							value={details.mtm}
							suffix={
								<span
									onClick={() => {
										showInfoModal();
									}}
									className="cursor-pointer"
								>
									<IIcon
										svgStyles="scale-[70%]"
										color={details.mtm < 0 ? "#AB404A" : "#006C51"}
									/>
								</span>
							}
							tagText={parseInt(details.mtm) < 0 ? "Losing" : "Gaining"}
						/>
					</div>
				)}

				<div className="w-full h-[4px] my-3 relative bg-mine-shaft-2 rounded-full">
					<div
						style={{ width: sliderWidth }}
						className={`h-full rounded-full absolute  top-0 left-0 bg-mountain-meadow-3  `}
					></div>
				</div>

				<HedgeLinkUnlinkIndicator
					hedgeCompleted={hedgeCompleted ? hedgeCompleted : false}
					details={details}
					showInfoCallback={showInfoCallback}
				/>
			</div>
			{hedgeCompleted ? (
				<MaturityBanner
					prefixColor="#212121"
					className="py-2 text-blackDark bg-black_light rounded-b-xl text-sm leading-[22px]"
					label={`Hedge completed on ${formatDate(
						details?.maturity_date?.split(" ")[0],
					)}`}
				/>
			) : (
				<UpdatedPrompt
					className="mb-0 mt-3 rounded-b-xl"
					text={`Last updated : ${moment
						.utc(details?.rates_updated_at || details?.updated_at)
						.tz("Asia/Kolkata")
						.format("DD MMM 'YY")} at ${moment
						.utc(details?.rates_updated_at || details?.updated_at)
						.tz("Asia/Kolkata")
						.format("h:mma")
						.toUpperCase()}`}
					showClock={false}
					updateAction={handleUpdateCallback && handleUpdateCallback}
				/>
			)}
		</div>
	);
};

export default HedgeSlider;
