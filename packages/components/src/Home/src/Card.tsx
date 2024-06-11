import { RightSideIcon } from "icons";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface CardInterface {
	fill: string;
	icon: React.ReactNode;
	title: string;
	description?: string;
	handleBillDiscountingClick?: any;
}

const Card: React.FC<CardInterface> = ({
	fill = "",
	icon,
	title,
	description,
	handleBillDiscountingClick,
}) => {
	const color = "bg-[" + fill + "]";

	return (
		<div className="w-full rounded-xl py-3 flex gap-x-3 bg-white justify-between items-center cursor-pointer">
			<div
				className="flex gap-x-3 items-center"
				onClick={() => {
					handleBillDiscountingClick && handleBillDiscountingClick();
				}}
			>
				<div
					className={twMerge(
						"w-10 h-10 rounded-full flex items-center justify-center",
						color,
					)}
				>
					{icon}
				</div>
				<div className="flex flex-col gap-y-1">
					<label className="font-inter text-sm text-mine-shaft-4 font-semibold leading-[22px] cursor-pointer">
						{title}
					</label>
					{description && (
						<label className="font-inter text-xs text-color-black-6 leading-[18px] cursor-pointer">
							{description}
						</label>
					)}
				</div>
			</div>
			<RightSideIcon />
		</div>
	);
};

export default Card;
