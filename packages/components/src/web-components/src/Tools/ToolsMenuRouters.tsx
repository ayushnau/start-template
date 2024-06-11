import React from "react";
import { Routes, Route } from "react-router-dom";
import ToolsMenu from "./ToolsMenu";

export interface ToolsMenuRouterInterface {}

const ToolsMenuRouter: React.FC<ToolsMenuRouterInterface> = ({}) => {
	return (
		<Routes>
			<Route path="/*" element={<ToolsMenu web />} />
		</Routes>
	);
};

export default ToolsMenuRouter;
