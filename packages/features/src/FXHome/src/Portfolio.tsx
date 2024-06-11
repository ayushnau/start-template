import React from "react";
import { FXPortfolioWrapper, PortfolioModalScreenWrapper } from "components";

export interface PortfolioInterface {}

const Portfolio: React.FC<PortfolioInterface> = ({}) => {
	return (
		<PortfolioModalScreenWrapper>
			<FXPortfolioWrapper />
		</PortfolioModalScreenWrapper>
	);
};

export default Portfolio;
