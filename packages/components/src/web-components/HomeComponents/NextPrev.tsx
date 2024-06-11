import React from "react";
import { twMerge } from "tailwind-merge";
import { ChevronBack } from "icons";
interface NextPrevProps {
	className?: any;
}

const NextPrev: React.FC<NextPrevProps> = ({ className = "" }) => {
	return (
		<div
			className={twMerge(
				"mt-2 text-center w-full flex items-center justify-center mt-[10px] gap-x-4 ",
				className,
			)}
		>
			<div className="w-10 h-10  flex items-center cursor-pointer z-10 relative">
				<ChevronBack />
			</div>
			<div className="w-10 h-10 rotate-[180deg] flex items-center cursor-pointer">
				<ChevronBack />
			</div>
		</div>
	);
};

export default NextPrev;
