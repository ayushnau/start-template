import React from "react";
import { Routes, Route } from "react-router-dom";
import HedgesTab from "./HedgesTab";
import HedgesSummary from "./HedgesSummary";

export interface HedgesTabRouterInterface {
	setNavigationTabSwitch: Function;
	hedgesCount: number;
}

const HedgesTabRouter: React.FC<HedgesTabRouterInterface> = ({
	setNavigationTabSwitch,
	hedgesCount,
}) => {
	return (
		<Routes>
			<Route
				path="*"
				element={
					<HedgesTab
						setNavigationTabSwitch={setNavigationTabSwitch}
						hedgesCount={hedgesCount}
					/>
				}
			/>
			<Route path="/summary/*" element={<HedgesSummary />} />
		</Routes>
	);
};

export default HedgesTabRouter;
