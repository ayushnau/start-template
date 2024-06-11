import React from "react";

function AccountIcon({ color = "#646464" }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="25"
			fill="none"
			viewBox="0 0 24 25"
		>
			<g clipPath="url(#clip0_5026_8888)">
				<path
					fill={color}
					d="M6 15.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm6 12c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_5026_8888">
					<path
						fill="#fff"
						d="M0 0H24V24H0z"
						transform="translate(0 .5)"
					></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default AccountIcon;
