import React from "react";
import { SecondaryButton } from "components";

interface NewsCardProps {
	heading: any;
	description: any;
	icon: any;
}
const NewsCard: React.FC<NewsCardProps> = ({
	heading = "",
	description = "",
	icon = "",
}) => {
	return (
		<div className="flex items-start gap-x-2 p-4 h-[164px] rounded-xl border border-color-black-2">
			<div className="flex flex-col flex-1 items-start">
				<div className="text-base font-normal leading-6 text-mine-shaft-4">
					{heading}
				</div>
				<div className="text-sm font-normal leading-[22px]">{description}</div>
				<SecondaryButton
					buttonText="Read more"
					onClick={() => {}}
					className="underline text-sm font-semibold leading-[22px] font-mine-shaft-4 w-[73px] p-0 m-0 py-3 bg-transparent whitespace-nowrap border-none hover:bg-transparent"
				/>
			</div>
			<div className="w-[59px] h-[59px]">
				<img
					className="max-w-full max-h-full object-contain"
					src={`/icons/${icon}.png`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default NewsCard;
