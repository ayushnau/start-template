import React from "react";
import { PrimaryButton } from "../..";
import { twMerge } from "tailwind-merge";

export interface ContinueButtonInterface {
	continueCallback: () => void;
	disabled: boolean;
	web?: boolean;
	className?: string;
}

const ContinueButton: React.FC<ContinueButtonInterface> = ({
	continueCallback,
	disabled,
	web = false,
	className = "",
}) => {
	const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

	React.useEffect(() => {
		setIsKeyboardOpen(window.innerHeight < window.outerHeight);
	}, [isKeyboardOpen]);

	return (
		<div
			className={twMerge(
				`shadow-boxShadow h-fit py-3 px-4 flex bg-white z-50 shadow-style-chooser gap-x-5 items-center justify-center w-full`,
				web ? "" : isKeyboardOpen ? "pb-[30px]" : "",
				web ? "" : "fixed bottom-0 left-0 right-0 md:w-1/3 m-auto",
				className,
			)}
		>
			<PrimaryButton
				className="disabled:hover:bg-semiLightGray"
				disabled={disabled}
				onClick={continueCallback}
				buttonText={"Continue"}
			/>
		</div>
	);
};

export default ContinueButton;
