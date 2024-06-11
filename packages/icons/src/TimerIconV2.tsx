import React from "react";
import IconsInterface from "../IconsInterface";

const TimerIconV2 = ({ className, fillColor }: IconsInterface) => (
	<svg
		width={32}
		height={32}
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<rect x={0.5} y={0.5} width={31} height={31} rx={15.5} fill="white" />
		<rect x={0.5} y={0.5} width={31} height={31} rx={15.5} stroke="#DEDEDE" />
		<g clipPath="url(#clip0_3637_51814)">
			<path
				d="M19 5H13V7H19V5ZM15 18H17V12H15V18ZM23.03 11.39L24.45 9.97C24.02 9.46 23.55 8.98 23.04 8.56L21.62 9.98C20.07 8.74 18.12 8 16 8C11.03 8 7 12.03 7 17C7 21.97 11.02 26 16 26C20.98 26 25 21.97 25 17C25 14.88 24.26 12.93 23.03 11.39ZM16 24C12.13 24 9 20.87 9 17C9 13.13 12.13 10 16 10C19.87 10 23 13.13 23 17C23 20.87 19.87 24 16 24Z"
				fill={fillColor ? fillColor : "#646464"}
			/>
		</g>
		<defs>
			<clipPath id="clip0_3637_51814">
				<rect width={24} height={24} fill="white" transform="translate(4 4)" />
			</clipPath>
		</defs>
	</svg>
);
export default TimerIconV2;
