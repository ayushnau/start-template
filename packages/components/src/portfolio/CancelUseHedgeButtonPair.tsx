import React from "react";
import {
	SecondaryButton,
	PrimaryButton,
	CancelUnlinkedHedgeModal,
} from "components";
import { cancelHedge, useHedge } from "services";

interface CancelUseHedgeProps {
	details?: any;
	onHedgeCancel?: Function;
	onHedgeUse?: Function;
	className?: string;
}

const CancelUseHedgeButtonPair: React.FC<CancelUseHedgeProps> = ({
	onHedgeCancel = () => {},
	onHedgeUse = () => {},
	className = "",
}) => {
	return (
		<div className={`flex gap-x-4 ${className}`}>
			<SecondaryButton
				className="rounded-lg h-8 whitespace-nowrap py-3 px-4 flex justify-center items-center flex-1 gap-[10px] w-full text-red-core border border-bean-red-light bg-transparent hover:bg-transparent text-center font-variant-ligatures-none font-semibold leading-6"
				onClick={() => onHedgeCancel()}
				buttonText="Cancel hedge"
			/>
			<PrimaryButton
				className="rounded-lg h-8 whitespace-nowrap py-3 px-4 flex justify-center items-center flex-1 gap-[10px] w-full text-white  text-center font-variant-ligatures-none font-semibold leading-6"
				onClick={() => onHedgeUse()}
				buttonText="Use hedge"
			/>
		</div>
	);
};

export default CancelUseHedgeButtonPair;
