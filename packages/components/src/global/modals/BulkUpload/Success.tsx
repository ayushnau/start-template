import React from "react";
import { GreenConfirm } from "icons";
import { SecondaryButton } from "components";
import { recalculateTrade } from "services";

interface SuccessProps {
	recordSize: number;
	closeModal: Function;
	type: string;
	successCallback?: any;
}
const Success: React.FC<SuccessProps> = ({
	recordSize = 0,
	closeModal,
	type,
	successCallback,
}) => {
	React.useEffect(() => {
		return () => {
			successCallback && successCallback();
		};
	});

	return (
		<>
			<div className="">
				<GreenConfirm />
			</div>
			<div className="text-lg font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
				<p>Congratulations! </p>
				<p>
					{" "}
					{recordSize} {type} imported successfully.
				</p>
			</div>
			<SecondaryButton
				className="px-4 py-3 border border-mine-shaft-4 text-lg font-semibold leading-6 w-full block"
				buttonText="Okay"
				onClick={() => {
					closeModal(false);
				}}
			/>
		</>
	);
};

export default Success;
