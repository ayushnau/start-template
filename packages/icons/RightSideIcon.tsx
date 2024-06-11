import React from "react";

interface RightSideIconProps {
	color?: string;
}

const RightSideIcon: React.FC<RightSideIconProps> = ({ color = "#717171" }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_130_37852)">
				<path
					d="M10.5 6L9.08997 7.41L13.67 12L9.08997 16.59L10.5 18L16.5 12L10.5 6Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_130_37852">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default RightSideIcon;
