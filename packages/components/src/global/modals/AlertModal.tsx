import React, { useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "./BottomWrapper";
import { SomethingWentWrong, NoInternetConnection, PageNotFound } from "icons";
import { twMerge } from "tailwind-merge";
import { PrimaryButton } from "components";
import { webStore } from "store";
import { clearAlertName } from "store/alertSlice";

// TODO: Refactor Later and use object mapping instead of array. Thi implementation is incorrect.

const TIMER = 60;

function isMobile() {
	const regex =
		/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return regex.test(navigator.userAgent);
}

const Timer = () => {
	const [time, setTime] = React.useState<number>(TIMER);
	const timerRef = React.useRef<any>(null);

	React.useEffect(() => {
		timerRef.current = setInterval(() => {
			setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
		}, 1000);

		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	return (
		<label>{`Looks like we are getting unexpectely high traffic from your system. Please refresh ${
			time > 0 ? `in ${time} secs` : ""
		}`}</label>
	);
};

const Modal = React.forwardRef((props: any, ref: any) => {
	const web = !isMobile();
	const [buttonActive, setButtonActive] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setButtonActive(true);
		}, TIMER * 1000);

		const handleBeforeUnload = (event: any) => {
			event.preventDefault();
			webStore.dispatch(clearAlertName());
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	const currentActive = webStore.getState().alertSlice.alertName;
	const [modalInfo, setModalInfo] = useState([
		{
			image: <NoInternetConnection />,
			color: "bg-sunset-orange-1",
			heading: "No Internet connection",
			description:
				"Looks like there is some network issue. Please check your connection and try again.",
			buttonText: "Reload",
			name: "NoInternetConnection",
			callback: () => {
				webStore.dispatch(clearAlertName());
				window.location.reload();
			},
		},
		{
			image: <SomethingWentWrong />,
			color: "bg-spanish-yellow-1",
			heading: "Something went wrong",
			description:
				"Oops, something seems to be wrong. Don’t worry we are working on it.",
			buttonText: "Try Again",
			name: "SomethingWentWrong",
			callback: () => {
				webStore.dispatch(clearAlertName());
				window.location.reload();
			},
		},
		{
			image: <PageNotFound />,
			color: "bg-mine-shaft-1",
			heading: "Page not found",
			description:
				"The Page you are looking for does not exist. It may be either moved or deleted.",
			buttonText: "Close",
			name: "PageNotFound",
			callback: () => {
				props.onAction(false);
			},
		},
		{
			image: <SomethingWentWrong />,
			color: "bg-sunset-orange-1",
			heading: "Server Busy!",
			description: <Timer />,
			buttonText: "Reload",
			name: "429ERROR",
			callback: () => {
				webStore.dispatch(clearAlertName());
				window.location.reload();
			},
		},
	]);

	return (
		<div className="max-w-[500px]">
			<BottomWrapper
				className={"py-8"}
				web={web}
				wrapperClass={twMerge("pb-0")}
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				hideTopIcons
				children={modalInfo.map((value, index) => {
					if (currentActive == value.name) {
						return (
							<div className="px-4 " key={index}>
								<div className="flex py-6 flex-col gap-y-4 items-center justify-center">
									<div className="w-[128px] h-[128px]  flex items-center justify-center">
										<div
											className={twMerge(
												"rounded-full h-[102px] w-[102px] flex items-center justify-center",
												value.color,
											)}
										>
											{value.image}
										</div>
									</div>
									<div className="flex flex-col items-center justify-center gap-y-1">
										<div className="text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
											{value.heading}
										</div>
										<div className="text-sm font-normal text-center leading-[22px] text-mine-shaft-3">
											{value.description}
										</div>
									</div>
								</div>
								<div>
									<PrimaryButton
										onClick={() => {
											value.callback();
										}}
										disabled={!buttonActive}
										buttonText={
											buttonActive ? value.buttonText : "Please Wait.."
										}
									/>
								</div>
							</div>
						);
					}
					return;
				})}
				ref={ref}
			/>
		</div>
	);
});

interface AlertModalProps {}

const AlertModal = async ({}: AlertModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[9999]",
		disableOutsideClick: true,
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit max-w-1/3",
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});

	webStore.dispatch(clearAlertName());
};

export default AlertModal;
