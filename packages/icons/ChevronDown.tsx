import React from "react";
interface ChevronProps {
	className?: any;
}

const ChevronDown: React.FC<ChevronProps> = ({ className = "" }) => {
	return (
		<svg
			className={className}
			width="13"
			height="12"
			viewBox="0 0 13 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.05762 4.50012L6.49512 7.93762L9.93262 4.50012"
				stroke="#717171"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ChevronDown;
