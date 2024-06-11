import React from "react";

interface WarningHedgeHeadingAmountProps {
	heading: string;
	value: React.ReactElement;
	className?: string;
	headingClassName?: string;
	valueClassName?: string;
}

const WarningHedgeHeadingAmount: React.FC<WarningHedgeHeadingAmountProps> = ({
	heading,
	value,
	className = "",
	headingClassName = "",
	valueClassName = "",
}) => {
	return (
		<div className={`${className}`}>
			<div
				className={`text-sm font-semibold leading-[22px] text-mine-shaft-4 ${headingClassName}`}
			>
				{heading}
			</div>
			<div
				className={`text-xl font-bold leading-[26px] -tracking-[.35px] text-sunset-orange-2 ${valueClassName}`}
			>
				{value ? value : null}
			</div>
		</div>
	);
};

export default WarningHedgeHeadingAmount;
