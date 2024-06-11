import React from "react";
import IconsInterface from "../IconsInterface";

function CashPaymentIcon({ className }: IconsInterface) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g clipPath="url(#clip0_1277_35609)">
				<path
					stroke="#646464"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M4 10H20.167V19.5H4z"
				></path>
				<path
					stroke="#646464"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M18 6.666H6M16 3.666H8"
				></path>
				<circle cx="12.083" cy="14.917" r="2.083" fill="#646464"></circle>
			</g>
			<defs>
				<clipPath id="clip0_1277_35609">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default CashPaymentIcon;
