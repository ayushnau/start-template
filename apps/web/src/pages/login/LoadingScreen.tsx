import React from "react";
import { twMerge } from "tailwind-merge";

interface LoadingScreenInterfce {
	loadingText: string;
	loadingClasses?: string;
}
const LoadingScreen: React.FC<LoadingScreenInterfce> = ({
	loadingText,
	loadingClasses = "",
}: LoadingScreenInterfce) => {
	return (
		<div
			className={twMerge(
				"fixed flex h-screen flex-col w-screen mx-auto inset-0 justify-center items-center bg-black opacity-50 z-10",
				loadingClasses,
			)}
		>
			<div className="relative flex h-20 w-20 justify-center items-center rounded-full border-4 border-white border-t-gray-600 opacity-100 animate-spin"></div>
			<div className="flex text-white px-6 text-center text-base font-semibold font-inter leading-6 pt-4">
				{loadingText}
			</div>
		</div>
	);
};

export default LoadingScreen;
