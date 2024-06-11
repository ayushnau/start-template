import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import AvailableOnBadge from "../global/tags/AvailableOnBadge";
import { GreenCheck } from "icons";
import { PrimaryButton } from "../..";
import { ScheduleCallModal as showScheduleCallModal } from "../..";

export interface ScheduleCallSectionInterface {
	handleConnectAndConsultClick?: any;
}

const ScheduleCallSection: React.FC<ScheduleCallSectionInterface> = ({
	handleConnectAndConsultClick,
}) => {
	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/ScheduleCallImage.png`;

	const LISTTEXT = [
		"Forex Risk Management",
		"FEMA Queries, Regulatory, and Compliance",
		"Term Loans",
		"Working Capital",
		"Market Views",
	];

	return (
		<HomeSectionWrapper className="p-4 bg-[#F0F6FF]">
			<div className="flex gap-x-4">
				<div className="flex flex-col">
					<AvailableOnBadge />
					<label className="font-inter text-xl mt-1 font-bold leading-[26px] text-mine-shaft-4 -tracking-[0.35px]">
						Looking for instant help? Connect with our experts now!
					</label>
					<label className="font-inter text-sm leading-[22px] text-mine-shaft-3">
						Our expert team with over 20 years of expertise in Forex, Banking,
						and Compliance is ready to assist you on below areas:
					</label>
				</div>
				<img className="h-[178px] w-[102px] shrink-0" src={url1} alt={url1} />
			</div>
			<div className="flex flex-col py-2 gap-y-3">
				{LISTTEXT.map((ele: string, index: number) => {
					return (
						<div key={index} className="flex items-center gap-x-2 ">
							<GreenCheck className="h-[17px] w-[17px] shrink-0" />
							<label className="font-inter text-mine-shaft-4 leading-[22px] text-sm ">
								{ele}
							</label>
						</div>
					);
				})}
			</div>
			<PrimaryButton
				className="h-8 rounded-lg"
				buttonText="Schedule a call"
				onClick={() => {
					if (handleConnectAndConsultClick) {
						// handleConnectAndConsultClick();
						showScheduleCallModal({});
					} else {
						showScheduleCallModal({});
					}
				}}
			/>
		</HomeSectionWrapper>
	);
};

export default ScheduleCallSection;
