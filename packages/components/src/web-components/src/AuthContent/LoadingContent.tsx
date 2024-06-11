import React from "react";
import AuthCardWrapper from "../Wrappers/AuthCardWrapper";

export interface LoaingContentInterface {
	isLoading?: boolean;
	children?: React.ReactNode;
}

const LoadingContent: React.FC<LoaingContentInterface> = ({
	isLoading,
	children,
}) => {
	return isLoading ? (
		<div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-400 flex items-center justify-center bg-opacity-50">
			<div className="absolute flex h-20 w-20 justify-center items-center rounded-full border-4 border-white border-t-gray-600 opacity-100 animate-spin text-[40px] text-blue-900">
				W
			</div>
		</div>
	) : (
		<>{children}</>
	);
};

export default LoadingContent;
