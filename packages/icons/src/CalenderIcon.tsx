import React from "react";

interface CalendarIconProps {
	color?: string;
}
const CalenderIcon: React.FC<CalendarIconProps> = ({ color = "#717171" }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="none"
			viewBox="0 0 16 16"
		>
			<g clipPath="url(#clip0_3092_3280)">
				<path
					fill={color}
					d="M13.333 2h-.667V.667h-1.333V2H4.666V.667H3.333V2h-.667c-.733 0-1.333.6-1.333 1.333V14c0 .733.6 1.333 1.333 1.333h10.667c.733 0 1.333-.6 1.333-1.333V3.333c0-.733-.6-1.333-1.333-1.333zm0 12H2.666V5.333h10.667V14z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_3092_3280">
					<path fill="#fff" d="M0 0H16V16H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
};

export default CalenderIcon;
