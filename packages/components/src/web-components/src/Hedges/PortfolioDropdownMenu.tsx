import React from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2 } from "../../../Typography";

type menuList = {
	Icon: React.ReactNode | React.ReactNode[];
	description: string;
	onClick: any;
};
type section = { heading: string; menuList: menuList[] };

interface PortfolioDropdownMenuProps {
	sectionList: section[];
	className: any;
}
const PortfolioDropdownMenu: React.FC<PortfolioDropdownMenuProps> = ({
	sectionList,
	className,
}) => {
	return (
		<div
			className={twMerge(
				"py-2 rounded-md shadow-box bg-white min-w-[190px]",
				className,
			)}
		>
			{sectionList.map((value, index) => {
				return (
					<div key={value.heading} className="flex items-center flex-col">
						<div className="px-4 text-sm font-normal leading-[40px] text-mine-shaft-3 w-full text-start">
							{value.heading}
						</div>

						{value.menuList.map((element, elementIndex) => {
							const { Icon, description, onClick } = element;
							return (
								<div
									key={description}
									className="px-4 py-2 text-sm font-normal leading-[22px] whitespace-nowrap w-full cursor-pointer hover:bg-mine-shaft-1"
								>
									<div
										className="flex items-center justify-start gap-x-3 w-full text-start"
										onClick={() => onClick()}
									>
										<div>{Icon}</div>
										<SubTitle2
											classes={twMerge(
												"text-black cursor-pointer w-full text-start",
												index !== sectionList.length - 1 &&
													elementIndex === value.menuList.length - 1
													? "after:w-full after:h-[1px] after:bg-[#DDDDDD] after:block after:rounded-full relative after:absolute after:-bottom-2"
													: "",
											)}
										>
											{description}
										</SubTitle2>
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default PortfolioDropdownMenu;
