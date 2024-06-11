import React from "react";

interface ToolsIconProps {
	color: string;
}

const ToolsIcon: React.FC<ToolsIconProps> = ({ color }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_921_4618)">
				<path
					d="M8.25006 5.6L10.7501 7L9.35006 4.5L10.7501 2L8.25006 3.4L5.75006 2L7.15006 4.5L5.75006 7L8.25006 5.6ZM20.2501 15.4L17.7501 14L19.1501 16.5L17.7501 19L20.2501 17.6L22.7501 19L21.3501 16.5L22.7501 14L20.2501 15.4ZM22.7501 2L20.2501 3.4L17.7501 2L19.1501 4.5L17.7501 7L20.2501 5.6L22.7501 7L21.3501 4.5L22.7501 2ZM15.1201 7.29C14.7301 6.9 14.1001 6.9 13.7101 7.29L2.04006 18.96C1.65006 19.35 1.65006 19.98 2.04006 20.37L4.38006 22.71C4.77006 23.1 5.40006 23.1 5.79006 22.71L17.4501 11.05C17.8401 10.66 17.8401 10.03 17.4501 9.64L15.1201 7.29ZM14.0901 12.78L11.9701 10.66L14.4101 8.22L16.5301 10.34L14.0901 12.78Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_921_4618">
					<rect
						width="24"
						height="24"
						fill={color}
						transform="translate(0.75)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default ToolsIcon;
