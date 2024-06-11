import React from "react";

interface HeadingDescriptionPairProps {
	headingText: string | React.ReactNode;
	headingCallback?: Function;
	descriptionText: string;
	descriptionTextClasses?: string;
	className?: string;
}
const HeadingDescriptionPair: React.FC<HeadingDescriptionPairProps> = ({
	headingText,
	descriptionText,
	descriptionTextClasses = "",
	headingCallback = () => {},
	className,
}) => {
	return (
		<>
			<div className={`flex-1 ${className}`}>
				<div
					onClick={() => {
						headingCallback();
					}}
					className="flex items-center  text-xs font-normal text-mine-shaft-3 gap-x-[1px]"
				>
					<div>{headingText}</div>
				</div>
				<div
					className={`text-blackDark text-sm font-normal ${descriptionTextClasses}`}
				>
					{descriptionText}
				</div>
			</div>
		</>
	);
};

export default HeadingDescriptionPair;
