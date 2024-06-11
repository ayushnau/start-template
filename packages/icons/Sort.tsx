import React from "react";

export interface SortInterface {
	color?: string;
}

const Sort: React.FC<SortInterface> = ({ color = "#717171" }) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_2657_13540)">
				<path
					d="M2.5 15H7.5V13.3333H2.5V15ZM2.5 5V6.66667H17.5V5H2.5ZM2.5 10.8333H12.5V9.16667H2.5V10.8333Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_2657_13540">
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Sort;
