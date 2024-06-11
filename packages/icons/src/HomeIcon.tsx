import React from "react";

const HomeIcon = ({ color = "#646464" }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g clipPath="url(#clip0_4265_10890)">
				<path
					fill={color}
					d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5zM12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_4265_10890">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
};

export default HomeIcon;
