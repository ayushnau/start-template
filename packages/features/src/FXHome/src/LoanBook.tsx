import React from "react";
import { LoanBookWrapper, LoanBookModalScreenWrapper } from "components";

export interface PortfolioInterface {}
const LoanBook: React.FC<PortfolioInterface> = ({}) => {
	return (
		<LoanBookModalScreenWrapper>
			<LoanBookWrapper/>
		</LoanBookModalScreenWrapper>
	);
};
export default LoanBook;