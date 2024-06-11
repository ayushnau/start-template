import React from "react";
import IconsInterface from "../IconsInterface";

function UseHedgesIcon({ className }: IconsInterface) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g clipPath="url(#clip0_1277_35613)">
				<path
					fill="#646464"
					d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99 8-8z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_1277_35613">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default UseHedgesIcon;
