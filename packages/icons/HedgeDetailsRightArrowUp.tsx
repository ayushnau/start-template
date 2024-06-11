import React from "react";
interface HedgeDetailsRightArrowUpProps {
	className?: string;
}

const HedgeDetailsRightArrowUp: React.FC<HedgeDetailsRightArrowUpProps> = ({
	className = "",
}) => {
	return (
		<svg
			width="15"
			height="14"
			viewBox="0 0 15 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M1 11H0.5V11.5H1V11ZM15 11L10 8.11325V13.8868L15 11ZM0.5 0V11H1.5V0H0.5ZM1 11.5H10.5V10.5H1V11.5Z"
				fill="#DEDEDE"
			/>
		</svg>
	);
};

export default HedgeDetailsRightArrowUp;
