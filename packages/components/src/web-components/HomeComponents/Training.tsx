import React from "react";
import ImageDescriptionComp from "./ImageDescriptionComp";
``;
import HeadingDescriptionComp from "../../global/HeadingDescriptionComp";
import { SecondaryButton, ContactUsModal } from "components";
import {
	FxRateCalculate,
	PhoneIcon,
	AppleDownLoadIcon,
	GoogleDownloadIcon,
} from "icons";
import { useNavigate } from "react-router-dom";

const data: any = [
	"Debt. structuring and working capital optimisation",
	"Fx Risk management Lits",
	"FEMA Compliances Lite",
	"Escrow accounts",
	"India imports guidelines & much more",
];

const RightImageComponent = () => {
	return (
		<div className="rounded-2xl border border-color-black-1 flex md:flex-row flex-col gap-x-4 p-4 bg-white">
			<div className="w-14 md:mx-0 mx-auto">
				<PhoneIcon />
			</div>
			<div>
				<p className="text-sm font-normal text-center md:text-start leading-[22px] text-mine-shaft-4">
					Book your sessions seamlessly on the WiredUp mobile app!
				</p>
				<div className="mt-3 flex flex-row gap-x-4 items-center justify-center">
					<AppleDownLoadIcon />
					<GoogleDownloadIcon />
				</div>
			</div>
		</div>
	);
};

const DescriptionComp = () => {
	const navigate = useNavigate();
	return (
		<>
			{data.map((value: any, index: any) => {
				return (
					<div
						key={value + index}
						className="py-3 text-base font-bold leading-6 -tracking-[0.3px] border-b border-color-black-2 border-dotted"
					>
						{value}
					</div>
				);
			})}

			<p className="text-base font-normal leading-6  text-color-black-6 mt-2">
				Have any query or doubt?
			</p>
			<SecondaryButton
				className="px-4 py-3 w-[114px] h-8 whitespace-nowrap rounded-lg border border-mine-shaft-4 hover:bg-cornflower-blue-1 font-sm font-semibold leading-[22px] mt-2"
				buttonText="Contact us"
				onClick={() => {
					window.open("/login", "_blank");
				}}
			/>
		</>
	);
};
const Training = () => {
	return (
		<div id="training" className="mx-5">
			<div className="max-w-[1030px] mx-auto">
				<ImageDescriptionComp
					image={
						<div className="relative">
							<div className=" md:h-[493px] w-full md:w-auto relative isolate ">
								<img
									className="object-contain h-full w-full"
									src="/icons/sectionimage/events.svg"
									alt=""
								/>
							</div>
							<div className="block md:-mt-[4vh] lg:-mt-[7vh] 2xl:-mt-[0vh]  -bottom-7 bg-white">
								<RightImageComponent />
							</div>
						</div>
					}
					imageClassName="w-full sm:auto"
					isImageRight={true}
					className="flex-col-reverse md:flex-row-reverse py-0 md:py-8 items-start"
					children={
						<HeadingDescriptionComp
							headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5] leading-[34px] leading-normal mb-0"
							heading="Corporate Training and events"
							childrenClassName="flex flex-col gap-y-0 mt-2"
							children={<DescriptionComp />}
							description="For over 20 years, our team of experts has been conducting training sessions and educational events for leading private and government entities. Book your session with us now!"
							descriptionClassName="text-base leading-6 font-normal mt-2 "
						/>
					}
				/>
			</div>
		</div>
	);
};

export default Training;
