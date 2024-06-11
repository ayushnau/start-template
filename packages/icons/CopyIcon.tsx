import React from "react";

interface CopyIconProps {
	color?: string;
	className?: string;
}

const CopyIcon: React.FC<CopyIconProps> = ({
	color = "#2176FF",
	className,
}) => {
	return (
		<svg
			width="17"
			height="16"
			viewBox="0 0 17 16"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_130_37897)">
				<path
					d="M11.1667 0.666504H3.16671C2.43337 0.666504 1.83337 1.2665 1.83337 1.99984V11.3332H3.16671V1.99984H11.1667V0.666504ZM13.1667 3.33317H5.83337C5.10004 3.33317 4.50004 3.93317 4.50004 4.6665V13.9998C4.50004 14.7332 5.10004 15.3332 5.83337 15.3332H13.1667C13.9 15.3332 14.5 14.7332 14.5 13.9998V4.6665C14.5 3.93317 13.9 3.33317 13.1667 3.33317ZM13.1667 13.9998H5.83337V4.6665H13.1667V13.9998Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_130_37897">
					<rect
						width="16"
						height="16"
						fill="white"
						transform="translate(0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default CopyIcon;
