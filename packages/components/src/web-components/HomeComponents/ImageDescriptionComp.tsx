import React from "react";
import { twMerge } from "tailwind-merge";

interface ImageDescriptionCompProps {
	className?: string;
	imageClassName?: string;
	isImageRight?: boolean;
	image?: React.ReactNode;
	children?: React.ReactNode | React.ReactNode[];
}
const ImageDescriptionComp: React.FC<ImageDescriptionCompProps> = ({
	children,
	className = "",
	imageClassName = "",
	isImageRight = false,
	image,
}) => {
	const imageRender = isImageRight ? " flex-row-reverse" : "";
	return (
		<div className={twMerge("flex items-center", imageRender, className)}>
			<div className={twMerge("flex-1", imageClassName)}>{image}</div>
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default ImageDescriptionComp;
