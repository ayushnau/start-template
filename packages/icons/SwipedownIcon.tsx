import React from "react";

const SwipedownIcon: React.FC<{ style: string }> = ({ style }) => {
	return (
		<svg
			width="39"
			height="10"
			viewBox="0 0 39 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${style}`}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M38.1369 1.75498C38.5487 3.07284 37.8142 4.47504 36.4963 4.88687L20.4963 9.88687C20.0178 10.0364 19.5054 10.0386 19.0256 9.89323L2.52564 4.89323C1.20427 4.49281 0.457683 3.09702 0.8581 1.77565C1.25852 0.454275 2.6543 -0.29231 3.97568 0.108107L19.7393 4.88498L35.005 0.114468C36.3228 -0.297364 37.725 0.437119 38.1369 1.75498Z"
				fill="#DEDEDE"
			/>
		</svg>
	);
};

export default SwipedownIcon;
