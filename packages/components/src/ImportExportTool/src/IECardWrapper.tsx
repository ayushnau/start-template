import React from "react";
import { twMerge } from "tailwind-merge";

export interface IECardWrapperInterface {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
}

const IECardWrapper: React.FC<IECardWrapperInterface> = ({
	children,
	className,
}) => {
	return (
		<div
			className={twMerge(
				"p-4 border rounded-xl border-mine-shaft-2 w-full flex flex-col gap-y-1",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default IECardWrapper;
