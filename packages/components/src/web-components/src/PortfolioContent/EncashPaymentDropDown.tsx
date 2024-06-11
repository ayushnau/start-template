import React from "react";
import { SubTitle2 } from "../../../Typography";
import { UseHedgesIcon, CashConversionIcon, ImportNetOffIcon } from "icons";

export interface EncashPaymentDropDownProps {
	cashConversionCallback?: () => void;
	importNetOffCallback?: () => void;
	useHedgesCallback?: () => void;
}

const EncashPaymentDropDown: React.FC<EncashPaymentDropDownProps> = ({
	cashConversionCallback,
	importNetOffCallback,
	useHedgesCallback,
}) => {
	return (
		<div className="absolute bottom-0 z-[5] translate-y-full left-0 pt-[5px] bg-transparent">
			<div className="bg-white py-2 text-black flex flex-col w-[288px] items-start rounded-xl shadow-box">
				<div
					className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer transition-all"
					onClick={cashConversionCallback}
				>
					<CashConversionIcon className="cursor-pointer" />
					<SubTitle2 classes="cursor-pointer">Cash conversion</SubTitle2>
				</div>
				<div className="border-b border-[#DDD] w-[220px] ml-[54px]" />
				<div
					className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer  transition-all"
					onClick={importNetOffCallback}
				>
					<ImportNetOffIcon className="cursor-pointer" />
					<SubTitle2 classes="cursor-pointer">Import net-off</SubTitle2>
				</div>
				<div className="border-b border-[#DDD] w-[220px] ml-[54px]" />
				<div
					className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer  transition-all"
					onClick={useHedgesCallback}
				>
					<UseHedgesIcon className="cursor-pointer" />
					<SubTitle2 classes="cursor-pointer">Use hedges(s)</SubTitle2>
				</div>
			</div>
		</div>
	);
};
export default EncashPaymentDropDown;
