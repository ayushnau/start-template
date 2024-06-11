import * as React from "react";
import IconsInterface from "../IconsInterface";

const TransferIcon = ({ className }: IconsInterface) => (
	<svg
		className={className}
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_2468_56797)">
			<path
				d="M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z"
				fill="#646464"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2468_56797">
				<rect width={24} height={24} fill="white" />
			</clipPath>
		</defs>
	</svg>
);
export default TransferIcon;
