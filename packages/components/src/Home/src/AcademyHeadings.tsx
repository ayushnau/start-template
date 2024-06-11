import { GreenCheck } from "icons";
import React from "react";

export interface AcademyHeadingsInterface {
	headingList: string[];
}

const AcademyHeadings: React.FC<AcademyHeadingsInterface> = ({
	headingList,
}) => {
	return (
		<div className="flex flex-col gap-y-3">
			{headingList.map((ele: string, index: number) => {
				return (
					<div className="flex gap-x-4 items-center" key={index}>
						<GreenCheck className="h-4 w-4 stretch-0" />
						<label
							key={ele + index}
							className="font-inter text-sm leading-[22px] text-mine-shaft-4"
						>
							<a href="#">{ele}</a>
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default AcademyHeadings;
