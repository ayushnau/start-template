import * as React from "react";
import IconsInterface from "../IconsInterface";

const ImportNetOffIcon = ({ className }: IconsInterface) => (
	<svg
		className={className}
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_2644_27738)">
			<path
				d="M9.99 10L6 14L9.99 18V15H15V13H9.99V10ZM22 10L18.01 6V9H13V11H18.01V14L22 10Z"
				fill="#646464"
			/>
			<path
				d="M5 5H10V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H16V19H5V5Z"
				fill="#646464"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2644_27738">
				<rect width={24} height={24} fill="white" />
			</clipPath>
		</defs>
	</svg>
);
export default ImportNetOffIcon;
