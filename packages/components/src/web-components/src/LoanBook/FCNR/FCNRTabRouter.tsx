import React from "react";
import { Routes, Route } from "react-router-dom";
import PCRELocalTab from "./FCNRTab";

export interface FCNRTabRouterInterface {
	setNavigationTabSwitch: Function;
}

const FCNRTabRouter: React.FC<FCNRTabRouterInterface> = ({
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

export default FCNRTabRouter;
