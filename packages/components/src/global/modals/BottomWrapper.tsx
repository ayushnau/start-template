import React from "react";
import { forwardRef } from "react";
import { CrossIcon, HandleIcon } from "icons";
import { twMerge } from "tailwind-merge";

interface BottomWrapperProps {
	children: React.ReactElement | React.ReactNode | React.ReactNode[];
	onAction: Function;
	web?: boolean;
	wrapperClass?: string;
	className?: string;
	showCross?: boolean;
	hideTopIcons?: boolean;
}

const BottomWrapper: React.ForwardRefRenderFunction<
	HTMLInputElement,
	BottomWrapperProps
> = (
	{
		children,
		onAction,
		web = false,
		className = "",
		wrapperClass = "",
		showCross = true,
		hideTopIcons = false,
	},
	ref,
) => {
	return (
		<div
			className={twMerge(
				`w-full rounded-t-2xl bg-white opacity-100 z-20 pt-4 max-h-[97vh]`,
				className,
				web ? "rounded-xl" : "",
			)}
		>
			{!hideTopIcons && (
				<div
					onClick={() => {
						onAction(false);
					}}
					className={twMerge(
						"w-full h-fit cursor-pointer pb-4 text-center mx-auto",
						wrapperClass,
						web ? "w-fit mx-0" : "",
					)}
				>
					{web ? (
						showCross && <CrossIcon className="ml-5 mt-1 scale-150" />
					) : (
						<HandleIcon className="mx-auto" />
					)}
				</div>
			)}

			{children}
		</div>
	);
};

export default forwardRef<HTMLInputElement, BottomWrapperProps>(BottomWrapper);
