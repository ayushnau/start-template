import React from "react";
import {
	Confidential,
	WiredUpLogo,
	AppleDownLoadIcon,
	GoogleDownloadIcon,
} from "icons";
import { useNavigate } from "react-router";

const Footer = () => {
	const navigate = useNavigate();
	return (
		<div className="">
			<div className="py-8 bg-mine-shaft-4  z-0">
				<div className="px-2 pt-4 pb-8  border-b border-dotted border-color-black-7 md:px-[125px] px-5 flex flex-col items-center justify-center">
					<Confidential />
					<div className="text-[25px] font-bold leading-[34px] -tracking-[0.5px] mt-4 mb-2 text-color-black-1">
						Confidential · Secure
					</div>
					<div className="text-base font-normal leading-6  text-color-black-3 md:w-[501px] text-center">
						We do not own or sell your data, we most certainly do not bank on
						advertising-based business models.
					</div>
				</div>
				<div className="my-8 max-w-[1030px] mx-auto box-content px-5 flex md:flex-row flex-col  items-start  justify-between py-4 md:gap-x-2 gap-x-0 gap-y-6 md:gap-y-0">
					<div
						onClick={() => navigate("/")}
						className="flex items-center cursor-pointer"
					>
						<WiredUpLogo />
						<div className="text-[22.1px] text-white font-bold leading-[31.8px] -tracking-[0.44px] ml-[4.9px]">
							WiredUp
						</div>
					</div>
					<div className="flex flex-col gap-y-[10px]">
						<div className="heading text-color-black-6 text-sm font-semibold leading-[22px]">
							Company
						</div>
						<div className="text-sm font-normal leading-[22px] text-color-black-2">
							<a target="_blank" href="/privacy-policy">
								Privacy Policy
							</a>
						</div>
						<div className="text-sm font-normal leading-[22px] text-color-black-2">
							<a target="_blank" href="/terms-and-conditions">
								Terms & Conditions
							</a>
						</div>

						<div className="text-sm font-normal leading-[22px] text-color-black-2">
							<a target="_blank" href="/refund-policy">
								Refund Policy
							</a>
						</div>

						<div className="text-sm font-normal leading-[22px] text-color-black-2">
							<a target="_blank" href="/faq">
								FAQ
							</a>
						</div>
					</div>
					<div className="flex flex-col gap-y-[10px]">
						<div className="heading text-color-black-6 text-sm font-semibold leading-[22px]">
							Contact us
						</div>
						<div className="text-sm font-normal leading-[22px] text-color-black-2">
							wiredup@unoroof.com
						</div>
						<div className="text-sm font-normal leading-[22px] text-color-black-2">
							+91 9819762504
						</div>
					</div>
					<div className="flex flex-col gap-y-[10px]">
						<div className="heading text-color-black-6 text-sm font-semibold leading-[22px]">
							Download App
						</div>
						<div className="flex flex-row md:flex-col gap-y-4 gap-x-4">
							<div className="text-sm font-normal leading-[22px] text-color-black-2">
								<a href="https://apps.apple.com/in/app/wiredup-forex-risk-management/id1604844368">
									<AppleDownLoadIcon />
								</a>
							</div>
							<div className="text-sm font-normal leading-[22px] text-color-black-2">
								<a href="https://play.google.com/store/apps/details?id=com.wiredupmobile.global&pcampaignid=web_share">
									<GoogleDownloadIcon />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="border border-b-mine-shaft-4 my-6 h-[1px] leading-0 hidden"></div>
				<div className="flex flex-col gap-y-2   border-t border-color-black-7 border-dotted pt-6">
					<div className="text-sm font-semibold leading-[22px] text-color-black-6 text-center">
						Made with <span className="text-sunset-orange-2 text-xs">❤️</span>{" "}
						love in India
					</div>
					<div className="text-sm font-semibold leading-[22px] text-color-black-3 text-center">
						© Unoroof Fintech Solutions Private Limited
					</div>
				</div>
			</div>
			{/* <div className="w-full h-[75px] bg-white block md:hidden"></div> */}
		</div>
	);
};

export default Footer;
