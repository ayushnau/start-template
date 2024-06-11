import React from "react";

const TableHeader: React.FC<{
	label: string;
	icon?: React.ReactNode;
	wrapperStyles?: string;
	labelStyles?: string;
}> = ({
	label,
	icon,
	wrapperStyles = "flex justify-start items-center w-full",
	labelStyles = "font-inter text-xs leading-4 text-mine-shaft-3",
}) => {
	return (
		<div className={wrapperStyles}>
			<label className={labelStyles}>{label}</label>
			{icon && icon}
		</div>
	);
};

export default TableHeader;
