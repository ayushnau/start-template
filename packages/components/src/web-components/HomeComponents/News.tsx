import React from "react";
import HeadingDescriptionComp from "../../global/HeadingDescriptionComp";
import NewsCard from "./NewsCard";
import NextPrev from "./NextPrev";

const data: any = [
	{
		heading: "WiredUp tie-up with FX-Retail Platform",
		description: "The clearing corporation of india ltd",
		image: "handshake",
	},
	{
		heading:
			"WiredUp, an all-in-one revolutionary financial app, set to change the way corporates function",
		description: "",
		image: "toi",
	},
	{
		heading:
			"Ex-banker Sonali Puri successfully launches global's first corporate banking marketplace - WiredUp",
		description: "",
		image: "ani",
	},
];

const DescriptionComp = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
			{" "}
			{data.map((value: any, index: number) => {
				const { heading, description, image } = value;
				return (
					<div key={heading + index} className="py-4 ">
						<NewsCard
							heading={heading}
							description={description}
							icon={image}
						/>
					</div>
				);
			})}
		</div>
	);
};
const News = () => {
	return (
		<div className=" py-10 flex flex-col gap-y-6 relative">
			<div className="mx-[125px] relative  ">
				<NextPrev className="absolute right-0  flex justify-end" />
				<HeadingDescriptionComp
					headingClassName="text-mine-shaft-4 text-[32px] font-bold -tracking-[1.5] leading-normal mb-0 text-center"
					heading="In the news"
					childrenClassName="flex flex-col  gap-y-0 mt-4"
					children={<DescriptionComp />}
				/>
			</div>
		</div>
	);
};

export default News;
