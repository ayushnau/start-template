import React from "react";
interface PortfolioIconProps {
	color?: string;
}

const PortfolioIcon: React.FC<PortfolioIconProps> = ({ color }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_1933_16780)">
				<path
					d="M14.5 6V4H10.5V6H14.5ZM4.5 8V19H20.5V8H4.5ZM20.5 6C21.61 6 22.5 6.89 22.5 8V19C22.5 20.11 21.61 21 20.5 21H4.5C3.39 21 2.5 20.11 2.5 19L2.51 8C2.51 6.89 3.39 6 4.5 6H8.5V4C8.5 2.89 9.39 2 10.5 2H14.5C15.61 2 16.5 2.89 16.5 4V6H20.5Z"
					fill={color}
				/>
				<g clipPath="url(#clip1_1933_16780)">
					<path
						d="M11.667 17.3332H13.3337V10.6665H11.667V17.3332ZM9.16699 17.3332H10.8337V13.9998H9.16699V17.3332ZM14.167 12.7498V17.3332H15.8337V12.7498H14.167Z"
						fill={color}
					/>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_1933_16780">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.5)"
					/>
				</clipPath>
				<clipPath id="clip1_1933_16780">
					<rect
						width="10"
						height="10"
						fill="white"
						transform="translate(7.5 9)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default PortfolioIcon;
