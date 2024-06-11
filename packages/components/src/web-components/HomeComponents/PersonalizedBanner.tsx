import React from "react";
import { BannerPurseIcon } from "icons";
import { SecondaryButton, TalkToUsModal } from "components";
import CheckedDescription from "./CheckedDescription";

const PersonalizedBanner = () => {
	const handleOpenTalktoUsModal = async () => {
		await TalkToUsModal({});
	};
	return (
		<div className="flex items-center gap-x-6 bg-cornflower-blue-4 p-6 rounded-xl">
			<div className="w-full">
				<label className="text-sm font-semibold leading-[22px] text-mine-shaft-4 uppercase">
					looking for an Annual plan or a custom requirement?
				</label>
				<div className="text-[25px] font-bold leading-[34px] -tracking-[0.5px] my-2 text-mine-shaft-4">
					Get Personalised Pricing for Enterprise plan
				</div>
				<div className="flex items-start md:items-center md:flex-row flex-col  gap-x-6 gap-y-2 md:gap-y-0 mt-1">
					<CheckedDescription
						color="#F0F6FF"
						className={"gap-x-2 "}
						description="Multiple licenses"
						descriptionClassName="text-base font-normal leading-[22px] text-mine-shaft-4"
					/>
					<CheckedDescription
						color="#F0F6FF"
						className={"gap-x-2"}
						description="FX Risk Management outsourcing"
						descriptionClassName="text-base font-normal leading-[22px] text-mine-shaft-4"
					/>
					<CheckedDescription
						color="#F0F6FF"
						className={"gap-x-2"}
						description="Banking operations outsourcing"
						descriptionClassName="text-base font-normal leading-[22px] text-mine-shaft-4"
					/>
				</div>
				<div className="">
					<SecondaryButton
						className="mt-6  rounded-xl bg-transparent hover:bg-cornflower-blue-1 border-mine-shaft-4 w-full sm:w-[195px] h-12"
						buttonText="Talk to us"
						onClick={() => {
							handleOpenTalktoUsModal();
						}}
					/>
				</div>
			</div>
			<div className="flex items-center justify-center w-[161px] h-[100px]">
				<div className="hidden md:block w-full h-full">
					<BannerPurseIcon />
				</div>
			</div>
		</div>
	);
};

export default PersonalizedBanner;
