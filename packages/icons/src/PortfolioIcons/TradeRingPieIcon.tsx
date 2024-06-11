import React from "react";
import IconsInterface from "../../IconsInterface";

interface TradeRingPieIcon extends IconsInterface {
	percentage?: number;
}

function TradeRingPieIcon({ percentage = 20 }: TradeRingPieIcon) {
	const circumference = 2 * 3.14 * 9;
	const dashLength = (percentage / 100) * circumference;
	const gapLength = circumference - dashLength;
	const percentage_string = `${dashLength} ${gapLength}`;

	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 28 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle r="14" cx="14" cy="14" fill="#7E5700" />
			<circle
				r="9"
				cx="14"
				cy="14"
				fill="transparent"
				stroke="#FFF"
				strokeWidth="10"
				strokeDasharray={percentage_string}
				transform="rotate(-90 14 14)"
			/>
			<circle r="10" cx="14" cy="14" fill="#FFDEAC" />
		</svg>
	);
}

export default TradeRingPieIcon;
