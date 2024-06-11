import React from "react";
import { ChevronRightIcon, EditIcon } from "icons";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface DetailsFormPrimaryFieldInterface {
	label: string | React.ReactNode;
	navigateLink: string;
	value?: string;
	disabled?: boolean;
	callback?: () => void;
}

const DetailsFormPrimaryField: React.FC<DetailsFormPrimaryFieldInterface> = ({
	label,
	navigateLink,
	value,
	disabled = false,
	callback,
}) => {
	const navigate = useNavigate();
	return (
		<div
			id="tenor-option"
			className={twMerge(
				"relative w-full h-14 px-4 py-3 flex justify-between items-center rounded-xl border border-[#D9D9D9]",
				disabled ? "border-none bg-mine-shaft-1" : "",
			)}
			onClick={() => {
				if (callback) {
					callback();
				} else {
					!disabled && navigate(navigateLink);
				}
			}}
		>
			{value ? (
				<div>
					<label className="font-inter text-xs leading-4 absolute top-[7px] text-mine-shaft-3">
						{label}
					</label>
					<label className="font-inter text-base leading-[22px] absolute top-[23px] text-mine-shaft-4">
						{value}
					</label>
				</div>
			) : (
				<label className="font-inter text-base leading-[22px] opacity-50 text-mine-shaft-4">
					{label}
				</label>
			)}
			{value ? !disabled && <EditIcon /> : <ChevronRightIcon />}
		</div>
	);
};

export default DetailsFormPrimaryField;
