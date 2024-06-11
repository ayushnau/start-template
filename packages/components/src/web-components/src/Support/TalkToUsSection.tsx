import React from "react";
import CheckedDescription from "../../HomeComponents/CheckedDescription";
import { SecondaryButton } from "../../../..";
import { TalkToUsModal as showTalkToUsModal } from "../../../..";

export interface TalkToUsSectionInterface {
	closeModal?: () => void;
}

const TalkToUsSection: React.FC<TalkToUsSectionInterface> = ({
	closeModal,
}) => {
	const LABELSCONTENT = [
		"Multiple licenses",
		"FX Risk Management outsourcing",
		"Banking operations outsourcing",
	];

	return (
		<div className="p-6 w-full flex flex-col justify-center items-start gap-y-4 rounded-xl bg-[#F0F6FF]">
			<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]">
				Get customised pricing for Annual / Enterprise plan
			</label>
			<div className="flex flex-col gap-y-2">
				{LABELSCONTENT.map((label: string, index: number) => {
					return (
						<CheckedDescription
							key={index}
							description={label}
							className="gap-x-2"
							color="transparent"
						/>
					);
				})}
			</div>
			<SecondaryButton
				className="bg-transparent border-mine-shaft-4 rounded-lg w-[200px] px-3 h-8"
				buttonText="Talk to us"
				onClick={() => {
					closeModal && closeModal();
					showTalkToUsModal({});
				}}
			/>
		</div>
	);
};

export default TalkToUsSection;
