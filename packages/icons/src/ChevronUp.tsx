import React from "react";

function ChevronUp({ color = "#717171" }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g clipPath="url(#clip0_2894_5515)">
				<path
					fill={color}
					d="M18.295 14.295l-1.41 1.41-4.59-4.58-4.59 4.58-1.41-1.41 6-6 6 6z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_2894_5515">
					<path
						fill="#fff"
						d="M0 0H24V24H0z"
						transform="matrix(1 0 0 -1 0 24)"
					></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default ChevronUp;
