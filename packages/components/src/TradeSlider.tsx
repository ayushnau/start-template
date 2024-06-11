import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import { IIcon } from "icons";
import UpdatedPrompt from "./UpdatedPrompt";
import { showTradeDetailsInfoModal, MaturityBanner } from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import moment from "moment";
import { formatDate, formatNumberWithCommas } from "utils";

interface TradeSliderProps {
	details: any;
	infoDetails: any;
	tradeCompleted: boolean;
	handleUpdateCallback?: () => void;
	infoModalOverride?: () => void;
}

const TradeSlider: React.FC<TradeSliderProps> = ({
	details,
	infoDetails,
	tradeCompleted,
	handleUpdateCallback,
	infoModalOverride,
}) => {
	const [sliderWidth, setSliderWidth] = useState("0%");

	const showInfoModal = async () => {
		if (infoModalOverride) {
			infoModalOverride();
		} else {
			await showTradeDetailsInfoModal({
				details: infoDetails,
			});
		}
	};

	const remaining_percentage = (
		(parseInt(details.remaining_amount) / parseInt(details.trade_amount)) *
		100
	).toFixed(1);

	useEffect(() => {
		if (details) {
			const used_amount = parseInt(details?.paid_amount);
			const trade_amount = parseInt(details?.trade_amount);

			setSliderWidth(`${Math.abs((used_amount / trade_amount) * 100)}%`);
		}
	}, []);

	return (
		<div className="rounded-xl border border-mine-shaft-2">
			<div className="mx-4 mt-4 mb-3 py-1">
				<div className="flex items-center justify-between">
					<p className="font-normal text-sm font-inter leading-[22px] text-mine-shaft-3">
						{`Remaining amount (${remaining_percentage}%)`}
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
				<div className="text-blackDark mt-[6px] font-bold text-xl leading-[26px] -tracking-[.35px] flex-wrap break-all">
					{`${
						getCurrencySymbol(details.base_currency)
							? getCurrencySymbol(details.base_currency)
							: details.base_currency
					}${
						details.remaining_amount
							? formatNumberWithCommas(details.remaining_amount)
							: ""
					}`}
				</div>
				<div className="w-full h-1 my-3 relative bg-mine-shaft-2 rounded-full">
					<div
						style={{ width: sliderWidth }}
						className="w-1 h-full rounded-full absolute  top-0 left-0 bg-mine-shaft-3"
					></div>
				</div>

				{tradeCompleted || details.is_hedge_matured ? (
					<div className="text-bean-red-dark font-inter inline-flex font-semibold leading-[22px]  bg-bean-red-light px-2 py-1 rounded-lg mt-1">
						Update trade to view profit/ loss
					</div>
				) : !details?.current_market_rates ||
				  details.current_market_rates === 0 ? (
					<div className="text-[#7E5700]  bg-[#FFDEAC] inline-block px-2 py-1 rounded-lg mt-1 text-sm font-semibold leading-[22px]">
						<span className="">Rate Unavailable</span>
					</div>
				) : (
					<div className="">
						<Tag
							color={details.mtm < 0 ? "Red" : "Green"}
							currencyCode={
								getCurrencySymbol(details.quote_currency)
									? getCurrencySymbol(details.quote_currency)
									: details.quote_currency
							}
							className="py-1 px-3 my-0 text-mountain-meadow-dark font-inter font-bold text-sm leading-[22px] rounded-lg"
							onClick={() => showInfoModal()}
							suffix={
								<>
									<IIcon
										svgStyles={"scale-[80%] ml-1"}
										color={details.mtm < 0 ? "#AB404A" : "#057D45"}
									/>
								</>
							}
							value={details.mtm}
							tagText={parseInt(details.mtm) < 0 ? "Risk" : "Gain"}
						/>
					</div>
				)}
			</div>
			{tradeCompleted ? (
				<MaturityBanner
					prefixColor="#212121"
					className="py-2 text-blackDark bg-black_light rounded-b-xl text-sm leading-[22px]"
					label={`Trade matured on ${formatDate(
						details?.maturity_date?.split(" ")[0],
					)}`}
				/>
			) : (
				<UpdatedPrompt
					className="mb-0 mt-0 rounded-b-xl"
					text={`Last updated : ${moment
						.utc(details.rates_updated_at)
						.tz("Asia/Kolkata")
						.format("DD MMM 'YY")} at ${moment
						.utc(details.rates_updated_at)
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

export default TradeSlider;
