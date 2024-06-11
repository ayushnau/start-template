import React from "react";

export interface FilterIconInterface {
	fill?: string;
	color?: string;
	disabled?: boolean;
}

const Filter: React.FC<FilterIconInterface> = ({
	fill = "white",
	color = "#717171",
	disabled = false,
}) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_2657_13546)">
				<path
					d="M15.4834 5.45728L16.412 4.25H14.8889H6H4.47685L5.40553 5.45728L8.9537 10.0699V15V16.5L10.1537 15.6L11.6352 14.4889L11.9352 14.2639V13.8889V10.0699L15.4834 5.45728Z"
					fill={fill}
					stroke={disabled ? "#909090" : color}
					strokeWidth="1.5"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2657_13546">
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Filter;
