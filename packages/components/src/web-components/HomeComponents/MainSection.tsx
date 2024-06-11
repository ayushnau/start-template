import React from "react";
import HeadingDescriptionComp from "../../global/HeadingDescriptionComp";
import PrimaryButton from "../../global/buttons/PrimaryButton";
import SecondaryButton from "../../global/buttons/SecondaryButton";
import CurrencyCalculator from "./CurrencyCalulator";
import showStartFreeTrailModal from "../src/Modals/StartFreeTrailModal";
import { FxCalculate } from "icons";
import { useNavigate } from "react-router-dom";

const MainSection = () => {
	const navigate = useNavigate();
	return (
		<div id="main" className="">
			<div className="bg-radial-gradient">
				<div className="flex items-center max-w-[1030px] pl-5 mx-auto box-content  pb-12 md:pb-0 md:h-[580px] md:flex-row  flex-col">
					<div className=" md:py-[115px] px-5 md:px-0 py-4 md:py-0 flex-1 ">
						<HeadingDescriptionComp
							heading="Your All-in-One Solution for Forex
          Risk Management"
							headingClassName="md:text-[48px] text-[32px] md:text-start text-center -tracking-[1.5px] leading-[120%] "
							description="Plan your daily FX activities seamlessly and effectively with our all-in-one FX Risk
          Management platform."
							descriptionClassName="md:text-start text-center text-base md:text-xl md:font-medium  leading-6 md:leading-8  -md:tracking-[0.35px] text-base md:font-medium font-normal text-color-black-5 "
							childrenClassName="text-center md:text-start"
						>
							<PrimaryButton
								className="px-4 py-3 w-[224px] h-12  text-base bg-cornflower-blue-2 rounded-3 text-white mr-5 whitespace-nowrap font-semibold leading-6 "
								buttonText="Get started for FREE"
								onClick={() => {
									window.open("/login", "_blank");
								}}
							/>
						</HeadingDescriptionComp>
					</div>
					<div className="flex-1 h-full hidden md:block w-full md:px-0 px-6 ">
						<div className="md:block absolute top-[100px]">
							<img
								className="w-full h-full "
								src="/icons/sectionimage/herosection.png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="">{<CurrencyCalculator />}</div>
		</div>
	);
};

export default MainSection;
