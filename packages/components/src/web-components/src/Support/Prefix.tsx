import React from "react";
import { DropdownIcon } from "icons";

const Prefix: React.FC = ({}) => {
	return (
		<div className="absolute h-full flex items-center pl-4">
			<div className="font-inter text-base">+91</div>
			<div className=" flex justify-center items-center ml-2 mr-4">
				<DropdownIcon style="h-4 w-4" color={"#000000"} />
			</div>
			<div className=" bg-gray-200 rounded-md h-6 w-[1px]" />
		</div>
	);
};

export default Prefix;
