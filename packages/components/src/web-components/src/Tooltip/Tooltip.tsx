import React, { useState } from "react";
import "./index.css";

interface TooltipProps {
	text: string;
	children?: React.ReactNode;
	textClasses?: string;
	classes?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
	text,
	children,
	textClasses,
	classes,
}) => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	const handleMouseEnter = () => {
		setShowTooltip(true);
	};
	const handleMouseLeave = () => {
		setShowTooltip(false);
	};
	return (
		<div
			className="relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			{showTooltip && (
				<div
					className="relative inline-block"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div
						className={`z-10 tooltip absolute bg-[#212121] px-4 py-2 rounded-lg w-48 text-wrap h-fit -right-[52px] top-3.5 ${
							classes ? classes : ""
						}`}
					>
						<label
							className={`whitespace-pre-line text-white font-inter text-xs ${
								textClasses ? textClasses : ""
							}`}
						>
							{text}
						</label>
					</div>
				</div>
			)}
		</div>
	);
};

export default Tooltip;
