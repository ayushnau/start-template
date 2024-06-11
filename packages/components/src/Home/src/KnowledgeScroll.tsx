import React from "react";

interface ListItemInterface {
	image: string;
	label: string;
}
export interface KnowledgeScrollInterface {
	itemsList?: ListItemInterface[];
}

const KnowledgeScroll: React.FC<KnowledgeScrollInterface> = ({ itemsList }) => {
	return (
		<div className="w-[calc(110vw-40px)] overflow-x-scroll flex gap-x-4 scrollbar-hide">
			{itemsList?.map((item: ListItemInterface, index: number) => {
				return (
					<div
						key={index}
						className="flex flex-col w-[204px] h-[135px] shrink-0"
					>
						<img className={"shrink-0 w-[204px] h-[110px]"} src={item.image} />
						<label className="font-inter text-sm font-semibold leading-[22px]">
							{item.label}
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default KnowledgeScroll;
