import React from "react";
import { PrimaryButton } from "../../../..";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWebHomeScreen } from "store";

export interface ComingSoonModalInterface {}

const ComingSoonModal: React.FC<ComingSoonModalInterface> = ({}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div className="bg-gray-500 bg-opacity-50 w-full h-full flex items-center justify-center">
			<div className="w-1/2 h-1/3 bg-white rounded-lg border border-mine-shaft-3 flex flex-col gap-y-5 items-center justify-center">
				<label className="text-2xl font-inter ">
					Please be patient! Coming Soon!
				</label>
				<PrimaryButton
					className="w-1/2"
					buttonText="Go to FX-Home"
					onClick={() => {
						dispatch(setWebHomeScreen("home"));
						navigate("/fx-home/home");
					}}
				/>
			</div>
		</div>
	);
};

export default ComingSoonModal;
