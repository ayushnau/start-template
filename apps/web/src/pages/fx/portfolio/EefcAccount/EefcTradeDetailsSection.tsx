import React from "react";
import { IIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { SecondaryButton, showTradeDetailsInfoModal } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";
import { formatNumberWithCommas } from "utils";

interface EefcTradeDetailsSectionProps {
	details: any;
	infoDetails: any;
	infoModalOverride?: () => void;
}
const formatedDate = (date: any) => {
	return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
};

const EefcTradeDetailsSection: React.FC<EefcTradeDetailsSectionProps> = ({
	details,
	infoDetails,
	infoModalOverride,
}) => {
	const showInfoModal = async () => {
		if (infoModalOverride) {
			infoModalOverride();
		} else {
			await showTradeDetailsInfoModal({
				details: infoDetails,
			});
		}
	};

	const capitaliseFirstLetter = (str: string) => {
		if (typeof str === "string") {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
		return "N/A";
	};

	return (
		<div className="border-t-[1px] border-mine-shaft-2 mt-4 py-1 leading-4">
			<div className="flex  items-center justify-between mt-3">
				<div className="text-base font-bold">Trade details</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<div className="flex-1">
					<div className="flex items-center gap-x-[1px] text-xs font-normal text-mine-shaft-3">
						<div>Invoice Number</div>
						{/* <span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span> */}
					</div>
					<div className="text-blackDark text-sm font-normal ">
						{details?.invoice_number ? details?.invoice_number : "-"}
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center justify-start text-xs font-normal text-mine-shaft-3 gap-x-[1px]">
						<div>Counterparty name</div>
						<span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span>
					</div>
					<div className="text-blackDark text-sm font-normal">
						{details?.cp_name ? details?.cp_name : "-"}
					</div>
				</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<div className="flex-1">
					<div className="flex items-center gap-x-[1px] text-xs font-normal text-mine-shaft-3">
						<SecondaryButton
							className=" w-fit text-sm whitespace-nowrap rounded-lg outline-none border-none px-0 underline hover:bg-transparent hover:outline-none hover:border-none"
							onClick={() => {}}
							buttonText="View all details"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EefcTradeDetailsSection;
