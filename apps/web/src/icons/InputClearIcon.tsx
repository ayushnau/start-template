import React from "react";

function InputClearIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			fill="none"
			viewBox="0 0 26 26"
		>
			<rect width="26" height="26" fill="#E9E9E9" rx="13"></rect>
			<mask
				id="mask0_332_2922"
				style={{ maskType: "luminance" }}
				width="10"
				height="10"
				x="8"
				y="8"
				maskUnits="userSpaceOnUse"
			>
				<path fill="#fff" d="M18 8H8v10h10V8z"></path>
			</mask>
			<g
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				mask="url(#mask0_332_2922)"
			>
				<path d="M8.417 8.417l9.166 9.166M17.583 8.417l-9.166 9.166"></path>
			</g>
		</svg>
	);
}

export default InputClearIcon;
