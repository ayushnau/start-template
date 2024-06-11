import React from "react";
import { WarningIcon } from "icons";
interface HedgeWarningBannerProps {
	icon?: any;
	childComponent: React.ReactNode;
	className?: string;
	childWrapperClassNames?: string;
}

const HedgeWarningBanner: React.FC<HedgeWarningBannerProps> = ({
	icon = WarningIcon,
	childComponent,
	className = "",
	childWrapperClassNames = "",
}) => {
	const PrefixIcon = icon;
	return (
		<div
			className={`flex items-start justify-start px-5 py-4 gap-x-3 bg-bean-red-light ${className}`}
		>
			<div className="mt-1">
				<PrefixIcon />
			</div>
			<div className={childWrapperClassNames}>{childComponent}</div>
		</div>
	);
};

export default HedgeWarningBanner;
