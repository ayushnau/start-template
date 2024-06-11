import React from "react";

interface RolloverCardProps {
	//   details: any;
	//   infoDetails: any;
	//   tradeCompleted: boolean;
	//   handleUpdateCallback?: () => void;
	//   infoModalOverride?: () => void;
	tradeNum: any;
	currency: any;
	amount: any;
}

const RolloverCard: React.FC<RolloverCardProps> = (
	{
		//  details,
		//   infoDetails,
		//   tradeCompleted,
		//   handleUpdateCallback,
		//   infoModalOverride,
	},
) => {
	return (
		<div>
			<div className="rounded-xl border border-mine-shaft-2">
				<div className="mx-4 mt-4 mb-3 py-1">
					<div className="flex items-center justify-between ">
						<p className="font-normal text-sm font-inter leading-[22px] text-mine-shaft-3">
							Trade 1 · Import · USD → INR
						</p>
					</div>
					{/* <div className="text-blackDark mt-[6px] font-bold text-xl leading-[26px] -tracking-[.35px] flex-wrap break-all">
                  {`${
                    getCurrencySymbol(details.base_currency)
                      ? getCurrencySymbol(details.base_currency)
                      : details.base_currency
                  }${
                    details.remaining_amount
                      ? formatNumberWithCommas(details.remaining_amount)
                      : ""
                  }`}
                </div> */}
				</div>
			</div>
		</div>
	);
};

export default RolloverCard;
