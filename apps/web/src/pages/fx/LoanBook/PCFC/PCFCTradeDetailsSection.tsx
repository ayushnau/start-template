import React from "react";

interface PCFCTradeDetailsSectionProps {
	details: any;
	infoDetails: any;
	infoModalOverride?: () => void;
}

const PCFCTradeDetailsSection: React.FC<PCFCTradeDetailsSectionProps> = ({
	details,
	infoDetails,
	infoModalOverride,
}) => {
	const getCorrectOrderNumberFormat = (orderNumberString: string) => {
		return orderNumberString?.split(",").join(", ");
	};
	return (
		<div className="border-t-[1px] border-mine-shaft-2 mt-4 py-1 leading-4">
			<div className="flex  items-center justify-between mt-3">
				<div className="text-base font-bold">Trade details</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<div className="flex-1">
					<div className="flex items-center gap-x-[1px] text-xs font-normal text-mine-shaft-3">
						<div>Order number(s)</div>
					</div>
					<div className="text-blackDark text-sm font-normal pt-1">
						{details?.order_number
							? getCorrectOrderNumberFormat(details?.order_number)
							: "-"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PCFCTradeDetailsSection;
