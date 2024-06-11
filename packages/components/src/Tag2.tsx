import React from "react";
import { twMerge } from "tailwind-merge";
import { formatNumberWithCommas } from "utils";

interface TagProps {
	className?: string;
	value: string;
	color: "Green" | "Red";
	suffix?: React.ReactElement;
	currencyCode?: string;
	onClick?: Function;
}

const Tag: React.FC<TagProps> = ({
	className,
	value,
	color,
	suffix,
	currencyCode,
	onClick = () => {},
}) => {
	return (
		<div
			className={twMerge(
				"py-1 px-[6px] rounded-md leading-[22px] inline-flex items-center text-xs font-bold",
				color === "Green"
					? "bg-mountain-meadow-1 text-mountain-meadow-3"
					: "bg-sunset-orange-1 text-sunset-orange-3",
				className,
			)}
		>
			{`${currencyCode}
      ${value ? formatNumberWithCommas(value) : "0"}
      ${parseInt(value) < 0 ? "Loss" : "Gain "} `}
			<span
				onClick={() => {
					onClick();
				}}
				className="cursor-pointer"
			>
				{suffix}
			</span>
		</div>
	);
};

export default Tag;
