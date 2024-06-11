import React from "react";

interface HedgeDetailsRightArrowDownProps {
	className?: string;
}

const HedgeDetailsRightArrowDown: React.FC<HedgeDetailsRightArrowDownProps> = ({
	className = "",
}) => {
	return (
		<svg
			width="15"
			height="48"
			viewBox="0 0 15 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M1 45H0.5V45.5H1V45ZM15 45L10 42.1133V47.8868L15 45ZM0.5 0V45H1.5V0H0.5ZM1 45.5H10.5V44.5H1V45.5Z"
				fill="#DEDEDE"
			/>
		</svg>
	);
};

export default HedgeDetailsRightArrowDown;
