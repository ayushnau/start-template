import React from "react";
import { Routes, Route } from "react-router-dom";
import PCRELocalTab from "./BSSCLAITab";

export interface PCRELocalTabRouterInterface {
	setNavigationTabSwitch: Function;
}

const BSSCLAITabRouter: React.FC<PCRELocalTabRouterInterface> = ({
	setNavigationTabSwitch,
}) => {
	return (
		<Routes>
			<Route
				path="*"
				element={
					<PCRELocalTab setNavigationTabSwitch={setNavigationTabSwitch} />
				}
			/>
		</Routes>
	);
};

export default BSSCLAITabRouter;
