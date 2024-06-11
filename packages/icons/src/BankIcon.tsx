import * as React from "react";
import IconsInterface from "../IconsInterface";

const BankIcon = ({ className }: IconsInterface) => (
	<svg
		className={className}
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_2468_56801)">
			<path
				d="M7.28578 10.7144H4.71436V16.7144H7.28578V10.7144Z"
				fill="#646464"
			/>
			<path
				d="M12.8571 10.7144H10.2856V16.7144H12.8571V10.7144Z"
				fill="#646464"
			/>
			<path d="M20.1429 18.4285H3V20.9999H20.1429V18.4285Z" fill="#646464" />
			<path
				d="M18.4287 10.7144H15.8572V16.7144H18.4287V10.7144Z"
				fill="#646464"
			/>
			<path
				d="M11.5714 3L3 7.28571V9H20.1429V7.28571L11.5714 3Z"
				fill="#646464"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2468_56801">
				<rect width={24} height={24} fill="white" />
			</clipPath>
		</defs>
	</svg>
);
export default BankIcon;
