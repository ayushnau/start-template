import React from "react";
import CheckedDescription from "./CheckedDescription";
import Marquee from "react-fast-marquee";

const VisionComponent = () => {
	// console.log(new Array(12));
	return (
		<div className=" mt-10 md:mt-16 relative  gap-y-[15px] relative py-8 -mb-[10px] md:mb-[50px]">
			<div className="text-[32px]  font-bold -tracking-[1.5px] leading-normal text-center mb-8">
				Believers In Our Vision
			</div>
			<div className="sm:w-[560px] h-[232px] absolute top-0 right-1/2 translate-x-1/2 z-20">
				<img
					src="/icons/slidericon/worldimage.png"
					className="object-contain w-full h-full"
					alt=""
				/>
			</div>
			<Marquee speed={70} style={{ transform: "" }}>
				<div className=" flex gap-x-[30px] h-full">
					{Array.from({ length: 14 }, (_, index) => {
						return (
							<div key={index} className="w-32 min-w-32 flex flex-col">
								<img
									className="object-fill w-32 h-16"
									src={`/icons/slidericon/imageslider${index + 1}.png`}
									alt=""
								/>
								<img
									className="object-fill w-32 h-16 mt-4"
									src={`/icons/slidericon/imageslider${index + 15}.png`}
									alt=""
								/>
							</div>
						);
					})}
				</div>
			</Marquee>
		</div>
	);
};

export default VisionComponent;
