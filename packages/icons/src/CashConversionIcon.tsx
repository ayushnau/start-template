import * as React from "react";
import IconsInterface from "../IconsInterface";

const CashConversionIcon = ({ className }: IconsInterface) => (
	<svg
		className={className}
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_2644_27734)">
			<rect
				x={4}
				y={10}
				width={16.1667}
				height={9.5}
				stroke="#646464"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<path
				d="M18 6.66602H6"
				stroke="#646464"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16 3.66602H8"
				stroke="#646464"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx={12.0833} cy={14.9173} r={2.08333} fill="#646464" />
		</g>
		<defs>
			<clipPath id="clip0_2644_27734">
				<rect width={24} height={24} fill="white" />
			</clipPath>
		</defs>
	</svg>
);
export default CashConversionIcon;
