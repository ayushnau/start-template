"use client";

import * as React from "react";
import { PrimaryButton } from "components";

interface ButtonInterface {
	activeState: boolean;
	buttonText: string;
	text?: string;
	prefix?: any;
	suffix?: any;
	callback: (() => void) | (() => Promise<void>);
	buttonClasses?: string;
}

export const ReusableButoon: React.FC<ButtonInterface> = ({
	activeState,
	buttonText,
	text,
	callback,
	buttonClasses = "",
}) => {
	return (
		<div className="flex w-full ">
			<PrimaryButton
				className={`m-auto mt-4 ${buttonClasses} ${
					activeState == true
						? "bg-gray-300 hover:bg-gray-300 text-gray-400"
						: "bg-cornflower-blue-2 "
				}`}
				onClick={async (e) => {
					e.stopPropagation();
					await callback();
				}}
				disabled={activeState == true ? true : false}
				buttonPrefix={text === "Success" ? <></> : <></>}
				buttonText={`${buttonText}`}
			/>
		</div>
	);
};
