import React from "react";
import { QrIcon, CrossButtonIcon } from "icons";
import { twMerge } from "tailwind-merge";

interface BarCodeIconProps {
	setShowQrCode: Function;
	showQrCode: boolean;
}

const BarCodeIcon: React.FC<BarCodeIconProps> = ({
	setShowQrCode,
	showQrCode,
}) => {
	return (
		<div
			className={twMerge(
				"rounded-xl p-4 relative flex flex-col items-center justify-center bg-white relative border-box w-[132px] shadow-boxShadow2",
				showQrCode ? "" : "hidden",
			)}
		>
			<div
				onClick={() => {
					setShowQrCode(false);
				}}
				className="absolute -top-[10px] -right-[10px] cursor-pointer"
			>
				<CrossButtonIcon />
			</div>
			<div className="text-sm font-semibold leading-[22px] text-mine-shaft-4 mb-2">
				Download App
			</div>
			{/* Add the correct qr icon here. */}
			<div className="">
				<QrIcon />
			</div>
		</div>
	);
};

export default BarCodeIcon;
