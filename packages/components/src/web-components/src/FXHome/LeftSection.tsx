import React from "react";
import { HomeLiveRates, ToolsSection } from "../../../..";
import Socketio from "socket.io-client";

export interface LeftSectionInterface {
	showSubscriptionsModal?: any;
}

const LeftSection: React.FC<LeftSectionInterface> = ({
	showSubscriptionsModal,
}) => {
	const URL =
		import.meta.env.VITE_PUBLIC_API_URL || process.env.VITE_PUBLIC_API_URL;

	const socketConnection = Socketio(URL, {
		path: "/backend-socket",
		transports: ["websocket"],
		autoConnect: false,
	});

	return (
		<div className="flex flex-col gap-y-4">
			<HomeLiveRates
				socketConnection={socketConnection}
				web
				showSubscriptionsModal={showSubscriptionsModal}
			/>
			<ToolsSection showSubscriptionsModal={showSubscriptionsModal} web />
		</div>
	);
};

export default LeftSection;
