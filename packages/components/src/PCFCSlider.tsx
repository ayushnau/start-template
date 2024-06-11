import { IIcon } from "icons";
import React, { useState, useEffect } from "react";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

import { formatNumberWithCommas } from "utils";

export interface PCFCSliderProps {
	details: any;
	showInfoCallback?: Function;
	eefcCompleted?: boolean;
	handleUpdateCallback?: () => void;
}

const PCFCSlider: React.FC<PCFCSliderProps> = ({
	details,
	showInfoCallback,
	eefcCompleted,
	handleUpdateCallback,
}) => {
	const showInfoModal = async () => {
		showInfoCallback && (await showInfoCallback());
	};
	const [sliderWidth, setSliderWidth] = useState("0%");

	useEffect(() => {
		if (details) {
			const used_amount =
				parseInt(details?.pcfc_amount) - parseInt(details?.remaining_amount);
			const pcfc_amount = parseInt(details?.pcfc_amount);
			setSliderWidth(`${Math.abs((used_amount / pcfc_amount) * 100)}%`);
		}
	}, []);

	return (
		<div className="rounded-xl border border-mine-shaft-2">
			<div className="mx-4 mt-4 mb-3 py-1">
				<div className="flex items-center justify-between">
					<p className="font-normal text-sm  leading-[22px] font-inter text-mine-shaft-3 ">
						{`Total outstanding amount (${(
							(details.remaining_amount * 100) /
							details.pcfc_amount
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
						getCurrencySymbol(details?.base_currency)
							? getCurrencySymbol(details?.base_currency)
							: details?.base_currency
					}${
						details?.remaining_amount
							? formatNumberWithCommas(details?.remaining_amount)
							: ""
					}`}
				</div>

				<div className="w-full h-[4px] my-3 relative bg-mine-shaft-2 rounded-full">
					<div
						style={{ width: sliderWidth }}
						className={`h-full rounded-full absolute  top-0 left-0 bg-[#717171]  `}
					></div>
				</div>
			</div>
		</div>
	);
};

export default PCFCSlider;
