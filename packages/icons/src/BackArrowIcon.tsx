import React from "react";

interface BackArrowIconProps {
	className?: string;
}

function BackArrowIcon({ className }: BackArrowIconProps) {
	return (
		<svg
			className={className || ""}
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="none"
			viewBox="0 0 16 16"
		>
			<path
				fill="currentColor"
				d="M16 7H3.83l5.59-5.59L8 0 0 8l8 8 1.41-1.41L3.83 9H16V7z"
			></path>
		</svg>
	);
}

export default BackArrowIcon;
