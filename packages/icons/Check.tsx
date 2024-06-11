import React from "react";

interface CheckProps {
	className?: any;
	color?: string;
}
const Check: React.FC<CheckProps> = ({ className = "", color = "white" }) => {
	return (
		<svg
			className={className}
			width="17"
			height="18"
			viewBox="0 0 17 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="8.2243"
				cy="8.99999"
				r="7.7243"
				fill={color}
				stroke="#0AA65C"
			/>
			<path
				d="M11.4429 6.6546L6.711 11.4042L4.69043 9.37605"
				stroke="#0AA65C"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Check;
