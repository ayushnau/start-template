import React, { useEffect } from "react";
import TickIcon from "icons/TickIcon";
import Error from "icons/Error";
import Warning from "icons/Warning";

interface ToastComponentProps {
	message: string;
	type: string;
	Icon?: any;
	closeToastCallback: Function;
	showToast: boolean;
	className: string;
}

const toastUIConfig = {
	error: {
		backgroundColor: "bg-sunset-orange-3",
		textColor: "text-white",
		Icon: Error,
	},
	success: {
		backgroundColor: "bg-mountain-meadow-3",
		textColor: "text-white",
		Icon: TickIcon,
	},
	warning: {
		backgroundColor: "bg-bgYellow",
		textColor: "text-white",
		Icon: Warning,
	},
	neutral: {
		backgroundColor: "bg-blackDark",
		textColor: "text-white",
		Icon: TickIcon,
	},
};

const ToastComponent: React.FC<ToastComponentProps> = ({
	message,
	type,
	Icon,
	showToast,
	className,
	closeToastCallback,
}) => {
	const toastType = type as keyof typeof toastUIConfig;
	const typeObj = toastUIConfig[toastType];

	let PrefixIcon;
	if (Icon) {
		PrefixIcon = Icon;
	} else {
		PrefixIcon = typeObj?.Icon;
	}
	useEffect(() => {
		let timeoutId: any;
		if (showToast) {
			timeoutId = setTimeout(() => {
				closeToastCallback();
			}, 2000);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [showToast, message]);

	return (
		<div>
			<div
				className={`${typeObj?.backgroundColor} ${typeObj?.textColor} text-sm px-4 py-3 rounded-lg h-[40px] font-semibold flex items-center ${className}`}
			>
				{<PrefixIcon />}

				<h1 className="ml-3">{message}</h1>
			</div>
		</div>
	);
};

export default ToastComponent;
