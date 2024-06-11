import React from "react";
import { Routes, Route } from "react-router-dom";
import EefcAccountTab from "./EefcAccountTab";

export interface EefcAccountTabRouterInterface {
	setNavigationTabSwitch: Function;
	eefcCount: number;
}

const EefcAccountTabRouter: React.FC<EefcAccountTabRouterInterface> = ({
	setNavigationTabSwitch,
	eefcCount,
}) => {
	return (
		<Routes>
			<Route
				path="*"
				element={
					<EefcAccountTab
						setNavigationTabSwitch={setNavigationTabSwitch}
						eefcCount={eefcCount}
					/>
				}
			/>
		</Routes>
	);
};

export default EefcAccountTabRouter;
