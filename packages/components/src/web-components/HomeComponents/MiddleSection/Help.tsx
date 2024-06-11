import React from "react";
import ImageDescriptionComp from "../ImageDescriptionComp";
import HeadingDescriptionComp from "../../../global/HeadingDescriptionComp";
import CheckedDescription from "../CheckedDescription";
import { PrimaryButton, ScheduleCallModal } from "components";
import {
	ScheduleIcon,
	GoogleDownloadIcon,
	AppleDownLoadIcon,
	QrIcon,
	FxRateCalculate,
} from "icons";
import { useNavigate } from "react-router-dom";

const data = [
	"Forex Risk Management",
	"FEMA Queries, Regulatory, and Compliance",
	"Term Loans",
	"Working Capital",
	"Market Views",
];

const DescriptionComp = () => {
	const navigate = useNavigate();
	return (
		<>
			{data.map((value: any, index: number) => {
				return <CheckedDescription key={value + index} description={value} />;
			})}
			<PrimaryButton
				className="w-[203px] flex gap-x-[10px]"
				onClick={() => {
					window.open("/login", "_blank");
				}}
				buttonText="Schedule a call"
				buttonPrefix={<ScheduleIcon />}
			/>
		</>
	);
};
const Help = () => {
	return (
		<div id="help" className="mx-5">
			<div className="max-w-[1030px] mx-auto ">
				<div className="">
					<ImageDescriptionComp
						className="md:flex-row flex-col-reverse items-start"
						image={
							<div className="sm:h-[493px] w-full sm:w-auto">
								<img
									className="object-contain h-full w-full"
									src="/icons/sectionimage/help.png"
									alt=""
								/>
							</div>
						}
						children={
							<HeadingDescriptionComp
								headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5px] leading-[34px] md:leading-[120%] mb-0"
								heading="Looking for instant help?
                  Connect with our experts now!"
								description="WiredUp is crafted from two decades of experience in Forex, Banking, and Compliance. Our team of experts would be happy to help you in any of the areas listed below:"
								descriptionClassName="mt-2 leading-6 font-normal leading-6 tracking-0"
								childrenClassName="flex flex-col mt-[21px] gap-y-[21px]"
								children={<DescriptionComp />}
							/>
						}
					/>
				</div>
				<div className="mt-[58px] p-6 flex items-start md:justify-start lg:flex-row flex-col rounded-2xl justify-between border border-color-black-1">
					<div className="flex flex-col gap-y-4 md:flex-1">
						<div className="text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
							Download WiredUp App
						</div>
						<div className="flex items-center gap-x-4 ">
							<div>
								<AppleDownLoadIcon />
							</div>
							<div>
								<GoogleDownloadIcon />
							</div>
						</div>
					</div>
					<div className="hidden md:flex  mt-4 lg:mt-0 items-center gap-x-4 md:flex-1">
						<div>
							<QrIcon className="w-[88px] h-[88px]" />
						</div>
						<div>
							<div className="text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
								Or Scan the code
							</div>
							<p className="text-sm font-normal leading-[22px] text-color-black-5">
								to download app
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Help;
