import React from "react";

const About = () => {
	return (
		<div className="w-full overflow-hidden  mb-20 py-8 h-[441px]">
			<div className=" max-w-[1030px] mx-auto  flex items-center flex-col gap-y-[72px]">
				<div className="">
					<div className="text-[25px] md:text-[32px] font-bold leading-[34px] leading-normal -tracking-[0.5px] md:-tracking-[1.5] text-mine-shaft-4 mb-6 mx-5 box-content">
						About WiredUp
					</div>
					<div className="bg-cornflower-blue-4   py-8 px-6 pb-0 md:pb-8 rounded-2xl flex items-center md:flex-row flex-col relative">
						<div className="text-xl font-normal leading-[34px] -tracking-[0.5px] text-color-black-5 md:w-1/2">
							WiredUp is a cutting-edge application expertly addressing global
							companies' Corporate Forex Risk management needs. Our seasoned
							banking and technology professionals have united to create a
							comprehensive toolkit, ensuring effective and tailored solutions
							within a single product.
						</div>
						<div className="md:w-1/2 h-[200px] md:h-full">
							<div className="absolute   md:-right-12 -right-14 bottom-0 ">
								<img
									className="w-[300px] object-cover sm:w-full h-full"
									src="/icons/abouticon.png"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
