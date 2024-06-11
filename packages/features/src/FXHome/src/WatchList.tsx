import {
	FXLayoutWrapper,
	FXWrapper,
	LiveRates,
	WatchListMain,
} from "components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
	return (
		<FXWrapper
			firstSection={
				<div className="w-full h-full ">
					<WatchListMain
						setNavigationTabSwitch={() => console.log("Navigation tab switch")}
						openAlerts={() => console.log("Navigation tab switch")}
						openRateCalc={() => console.log("Navigation tab switch")}
					/>
				</div>
			}
			secondSection={<LiveRates />}
		/>
	);
};

export default WatchList;
