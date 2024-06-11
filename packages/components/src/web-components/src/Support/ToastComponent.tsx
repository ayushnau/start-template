import React from "react";
import { CheckIcon } from "icons";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { StoreState, clearToast } from "store";
import TickIcon from "icons/TickIcon";
import Error from "icons/Error";
import Warning from "icons/Warning";

export interface ToastComponentInterface {}

const ToastComponent: React.FC<ToastComponentInterface> = ({}) => {
	const { message, showToast, type, className } = useSelector(
		(state: StoreState) => state.toast.toast,
	);

	const dispatch = useDispatch();

	const toastUIConfig: any = {
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
			Icon: CheckIcon,
		},
	};
	const Prefix = toastUIConfig[type]?.Icon;

	React.useEffect(() => {
		setTimeout(() => {
			dispatch(clearToast());
		}, 2000);
	}, [showToast]);

	if (!showToast) {
		return <></>;
	}

	return (
		<div
			className={twMerge(
				"absolute bottom-10 left-1/2 -translate-x-1/2 w-1/2 bg-black text-white rounded-lg px-2 py-2 font-bold flex items-center gap-x-2 z-[9999]",
				className,
			)}
		>
			<Prefix color="#fff" />
			{message}
		</div>
	);
};

export default ToastComponent;
