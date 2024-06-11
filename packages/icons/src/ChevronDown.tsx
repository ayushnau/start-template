import React from "react";

interface ChevronDownProps {
	width?: string;
	height?: string;
	color?: string;
}

const ChevronDown: React.FC<ChevronDownProps> = ({
	width = "24",
	height = "24",
	color = "#717171",
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			fill="none"
			viewBox="0 0 24 24"
		>
			<g clipPath="url(#clip0_2640_11107)">
				<path
					fill={color}
					d="M18.295 9.705l-1.41-1.41-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_2640_11107">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
};

export default ChevronDown;
