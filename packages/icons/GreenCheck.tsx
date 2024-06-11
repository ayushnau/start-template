import React from "react";

interface GreenCheckProps {
	className?: string;
}
const GreenCheck: React.FC<GreenCheckProps> = ({ className = "" }) => {
	return (
		<svg
			className={className}
			width="65"
			height="64"
			viewBox="0 0 65 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="32.5" cy="32" r="30" stroke="#0AA65C" strokeWidth="4" />

			<path
				d="M42.6675 25.446L28.788 39.3256L22.8613 33.3988"
				stroke="#0AA65C"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default GreenCheck;
