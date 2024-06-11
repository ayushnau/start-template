import React from "react";

function GreenRoundedCheckIcon({ className = "" }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			viewBox="0 0 20 20"
			className={className}
		>
			<circle
				cx="10"
				cy="10"
				r="9"
				fill="#0AA65C"
				stroke="#0AA65C"
				strokeWidth="2"
			></circle>
			<path
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M13.939 7.143l-5.765 5.764-2.461-2.462"
			></path>
		</svg>
	);
}

export default GreenRoundedCheckIcon;
