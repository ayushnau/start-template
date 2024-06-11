import React from "react";
import { formatNumberWithCommas } from "utils";

interface TagProps {
	className?: string;
	value: string;
	color: "Green" | "Red";
	suffix?: React.ReactElement;
	currencyCode?: string;
	onClick?: Function;
	showPrefix?: string;
	tagText?: string;
}

const Tag: React.FC<TagProps> = ({
	className,
	value,
	color,
	suffix,
	currencyCode,
	onClick = () => {},
	showPrefix = "",
	tagText,
}) => {
	return (
		<div
			className={`px-1 py-[6px] rounded-[6px] leading-[22px]  inline-flex items-center my-1   ${
				color === "Green"
					? "bg-mountain-meadow-1 text-mountain-meadow-3"
					: "bg-sunset-orange-1 text-sunset-orange-3"
			} ${className}`}
		>
			<span className="flex-wrap break-all">
				{`${currencyCode}${value ? formatNumberWithCommas(value) : "0"} ${
					tagText ? tagText : ""
				}`}
			</span>
			<span
				onClick={(e) => {
					e.stopPropagation();
					onClick();
				}}
				className="ml-[1px] cursor-pointer break-all"
			>
				{suffix}
			</span>
		</div>
	);
};

export default Tag;
