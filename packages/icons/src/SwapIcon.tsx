import React from "react";

function SwapIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="none"
			viewBox="0 0 32 32"
		>
			<rect width="31" height="31" x="0.5" y="0.5" fill="#fff" rx="15.5"></rect>
			<g clipPath="url(#clip0_737_25364)">
				<path
					fill="#646464"
					d="M10.99 15L7 19l3.99 4v-3H18v-2h-7.01v-3zM25 13l-3.99-4v3H14v2h7.01v3L25 13z"
				></path>
			</g>
			<rect
				width="31"
				height="31"
				x="0.5"
				y="0.5"
				stroke="#DEDEDE"
				rx="15.5"
			></rect>
			<defs>
				<clipPath id="clip0_737_25364">
					<path fill="#fff" d="M0 0H24V24H0z" transform="translate(4 4)"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default SwapIcon;
