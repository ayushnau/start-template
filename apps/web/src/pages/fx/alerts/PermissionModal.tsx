import React, { useEffect } from "react";
import { PrimaryButton } from "components";

const PermissionModal: React.FC<{
	closeModal: Function;
	openNotificationModal: Function;
}> = ({ closeModal, openNotificationModal }) => {
	const handleMessage = async (event: any) => {
		const messageData = JSON.parse(event?.data);

		if (messageData && messageData.type === "notification_info") {
			if (messageData.value === "permission_enabled") {
				closeModal(false);
			}

			if (messageData.value === "permission_disabled") {
				openNotificationModal();
			}
		}
	};

	useEffect(() => {
		window.addEventListener("message", handleMessage, true);

		return () => {
			window.removeEventListener("message", handleMessage, true);
		};
	}, [handleMessage]);

	const handleClicked = () => {
		window?.ReactNativeWebView?.postMessage?.(
			JSON.stringify({
				type: "notification_permission",
			}),
		);
	};

	return (
		<div className="py-6 px-4">
			<div className="flex flex-col">
				<div className="flex items-center justify-center">
					<div className="w-24 h-24 rounded-full bg-spanish-yellow-1 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="56"
							height="56"
							viewBox="0 0 56 56"
							fill="none"
						>
							<g clipPath="url(#clip0_2284_10800)">
								<path
									d="M27.9999 51.3333C30.5666 51.3333 32.6666 49.2332 32.6666 46.6666H23.3332C23.3332 49.2332 25.4332 51.3333 27.9999 51.3333ZM41.9999 37.3333V25.6666C41.9999 18.5033 38.1966 12.5066 31.4999 10.9199V9.33325C31.4999 7.39659 29.9366 5.83325 27.9999 5.83325C26.0632 5.83325 24.4999 7.39659 24.4999 9.33325V10.9199C17.8266 12.5066 13.9999 18.4799 13.9999 25.6666V37.3333L9.33324 41.9999V44.3333H46.6666V41.9999L41.9999 37.3333ZM37.3332 39.6666H18.6666V25.6666C18.6666 19.8799 22.1899 15.1666 27.9999 15.1666C33.8099 15.1666 37.3332 19.8799 37.3332 25.6666V39.6666ZM17.6866 9.51992L14.3499 6.18325C8.74991 10.4533 5.06324 17.0333 4.73657 24.4999H9.40324C9.75324 18.3166 12.9266 12.9033 17.6866 9.51992ZM46.5966 24.4999H51.2632C50.9132 17.0333 47.2266 10.4533 41.6499 6.18325L38.3366 9.51992C43.0499 12.9033 46.2466 18.3166 46.5966 24.4999Z"
									fill="#B17D05"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2284_10800">
									<rect width="56" height="56" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</div>
				</div>

				<div className="text-xl font-bold flex items-center justify-center mt-5">
					Enable notifications
				</div>

				<div className="text-sm font-normal flex items-center justify-center text-mine-shaft-3 ml-6">
					Don’t miss out on important breakthroughs by allowing WiredUp to send
					you timely notifications.
				</div>

				<div className="flex items-center justify-center py-4">
					<PrimaryButton
						onClick={() => handleClicked()}
						buttonText="Continue"
					/>
				</div>
			</div>
		</div>
	);
};

export default PermissionModal;
