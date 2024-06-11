import React from "react";
import {
	HomeDropdownIcon1,
	HomeDropdownIcon2,
	HomeDropdownIcon3,
	HomeDropdownIcon4,
	HomeDropdownIcon5,
	HomeDropdownIcon6,
	HomeDropdownIcon7,
	HomeDropdownIcon8,
} from "icons";
import ImageDescriptionComp from "./ImageDescriptionComp";
import { HeadingDescriptionComp } from "components";
import { twMerge } from "tailwind-merge";

const data = [
	{
		title: "Rate Calculator",
		description: "Calculate forward exchange rates",
		image: <HomeDropdownIcon1 />,
		scrollTo: "main",
	},
	{
		title: "Borrowing Cost Comparison",
		description: "Compare costs in multiple currencies",
		image: <HomeDropdownIcon5 />,
		scrollTo: "centralize",
	},
	{
		title: "Manage Portfolio",
		description: "Check profit/loss on trades & hedges",
		image: <HomeDropdownIcon2 />,
		scrollTo: "feature",
	},
	{
		title: "Connect & Consult",
		description: "Instant expert consultation",
		image: <HomeDropdownIcon6 />,
		scrollTo: "pricing",
	},
	{
		title: "Import/Export cost analyser",
		description: "Assess and determine optimal pricing",
		image: <HomeDropdownIcon3 />,
		scrollTo: "feature",
	},
	{
		title: "Bill Discounting",
		description: "To maximise your returns",
		image: <HomeDropdownIcon7 />,
		scrollTo: "",
	},
	{
		title: "Treasury Performance",
		description: "Check profit and loss",
		image: <HomeDropdownIcon4 />,
		scrollTo: "feature",
	},
	{
		title: "Buy/Sell on Wiredup",
		description: "In local & global markets",
		image: <HomeDropdownIcon8 />,
		scrollTo: "",
	},
];

interface NavDropdownProps {
	className?: string;
	handleCloseDropdown?: Function;
}
const NavDropdown: React.FC<NavDropdownProps> = ({
	className = "",
	handleCloseDropdown = () => {},
}) => {
	return (
		<div
			onClick={() => handleCloseDropdown()}
			className={twMerge(
				"  w-[610px] h-[310px] p-4 grid  md:grid-cols-2  gap-x-10 bg-white rounded-2xl shadow-boxShadow ",
				className,
			)}
		>
			{data.map((value, index) => {
				return (
					<a className="scroll-smooth" href={`#${value.scrollTo}`}>
						<div
							key={value.description + index}
							className={twMerge(
								"cursor-pointer ",
								index == 6 || index == 7 ? "" : "border-b",
							)}
						>
							<ImageDescriptionComp
								key={value.title + index}
								image={value.image}
								imageClassName="w-10 flex-initial"
								className="items-start gap-x-3 py-3"
								children={
									<HeadingDescriptionComp
										headingClassName="text-mine-shaft-4 text-sm font-semibold leading-[22px] mb-1 -tracking-[0.3px]"
										heading={value.title}
										description={value.description}
										descriptionClassName="text-xs font-normal leading-[18px]"
										childrenClassName="mt-0"
									/>
								}
							/>
						</div>
					</a>
				);
			})}
		</div>
	);
};

export default NavDropdown;
