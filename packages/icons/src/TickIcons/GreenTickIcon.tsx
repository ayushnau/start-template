import React from "react";

const GreenTickIcon = ({ className = "" }) => {
	return (
		<svg
			className={className}
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="12.5"
				cy="12.5"
				r="11"
				fill="#0AA65C"
				stroke="#0AA65C"
				strokeWidth="2"
			/>
			<path
				d="M17.2263 9.0708L10.3092 15.9879L7.35547 13.0342"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default GreenTickIcon;
