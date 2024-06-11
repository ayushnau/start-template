import React, { FC } from "react";

interface ChooserCardProps {
	image: string;
	heading: string;
	subHeading: string;
	onCardClick: () => void;
}

const ChooserCard: FC<ChooserCardProps> = (props) => {
	return (
		<div
			className="text-black box-border h-fit md:w-full border p-4 rounded-xl border-gray-300 flex gap-4 mt-4"
			onClick={props.onCardClick}
		>
			<div className="h-[102px] w-[72px] flex-[1_0_auto]">
				<img src={props.image} />
			</div>

			<div className="w-full">
				<div className="text-black text-xl font-bold flex items-center justify-between">
					{props.heading}
					<div>
						<img src="https://wiredup-staging.imgix.net/69037ce4-2f45-4c6d-94cb-f62ce5fee6e3?auto=compress,format" />
					</div>
				</div>

				<div className="text-mine-shaft-3 text-sm font-normal font-inter leading-6">
					{props.subHeading}
				</div>
			</div>
		</div>
	);
};

export default ChooserCard;
