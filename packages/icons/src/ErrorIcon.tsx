import React from "react";

function ErrorIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="none"
			viewBox="0 0 16 16"
		>
			<mask
				id="mask0_2809_29120"
				style={{ maskType: "luminance" }}
				width="16"
				height="16"
				x="0"
				y="0"
				maskUnits="userSpaceOnUse"
			>
				<path fill="#fff" d="M16 0H0v16h16V0z"></path>
			</mask>
			<g
				stroke="#F45B69"
				strokeLinecap="round"
				strokeLinejoin="round"
				mask="url(#mask0_2809_29120)"
			>
				<path d="M8 9.107V4.34M8 11.66v-.149M8 15.333A7.333 7.333 0 108 .667a7.333 7.333 0 000 14.666z"></path>
			</g>
		</svg>
	);
}

export default ErrorIcon;
