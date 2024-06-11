import React, { useState } from "react";
import { SecondaryButton } from "components";

interface ConfirmProps {
	heading: string;
	description?: string;
	showConfirmSlide: Function;
	onConfirm: Function;
}

const Confirm = ({
	heading,
	description,
	showConfirmSlide,
	onConfirm,
}: ConfirmProps) => {
	const [confirmDelete, setConfirmDelete] = useState(false);
	return (
		<div className="p-4">
			<div className="font-bold  text-xl mb-2">{heading}</div>
			<p className="font-normal text-sm text-mine-shaft-3 ">{description}</p>
			<div className="flex space-x-4 mt-4 mb-4">
				<SecondaryButton
					className="w-6/12 border-black bg-white text-black font-semibold text-base"
					onClick={() => showConfirmSlide(false)}
					buttonText="No"
				/>
				<SecondaryButton
					className="w-6/12 border-black bg-white text-black font-semibold text-base"
					onClick={() => onConfirm()}
					buttonText="Yes"
				/>
			</div>
		</div>
	);
};

export default Confirm;
