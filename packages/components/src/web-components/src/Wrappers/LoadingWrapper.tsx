import React from "react";
import AuthCardWrapper from "../Wrappers/AuthCardWrapper";
import { LoadingLogo } from "icons";
export interface LoaingContentInterface {
	isLoading: boolean;
	children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoaingContentInterface> = ({
	isLoading,
	children,
}) => {
	return isLoading ? (
		<div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 flex items-center justify-center bg-opacity-50 rounded-3xl">
			<div className="flex h-20 w-20 justify-center items-center rounded-full border-4 border-white border-t-gray-600 opacity-100 animate-spin text-[40px] text-blue-900">
				<LoadingLogo />
			</div>
		</div>
	) : (
		<>{children}</>
	);
};

export default LoadingWrapper;
