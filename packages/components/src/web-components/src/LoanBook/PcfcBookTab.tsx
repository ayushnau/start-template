import React, { useState } from "react";
import { Loader, AddItemPrompt, EmptyLedgersSection } from "components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPortfolioModal } from "store";
import LoansListHeader from "../PCFC/PcfcLoanHome";
import { NoItemIcon, EmptyHedgesIcon } from "icons";
import LoanTertiaryRouter from "./LoanTertiaryRouter";

interface LoanBookProps {
	setNavigationTabSwitch: Function;
}

const LoanBookTab: React.FC<LoanBookProps> = ({ setNavigationTabSwitch }) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loansAvailable, setLoansAvailable] = useState(true);
	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					{!loansAvailable ? (
						<div className="h-[calc(100vh)] flex items-center justify-center">
							<div className="w-1/2">
								<AddItemPrompt
									iconImageUrl={""}
									iconImage={<NoItemIcon />}
									heading={"No PCFC/PSFC loan added"}
									subHeading={"Add your first loan now!"}
									buttonText="+ Add loan"
									onButtonClick={() => {
										navigate(`add-loan`);
										dispatch(
											setPortfolioModal({
												displayModalScreen: true,
												modalScreen: "add-loan",
											}),
										);
									}}
								/>
							</div>
							<div className="border-l h-full" />
							<div className="w-1/2">
								<EmptyLedgersSection
									altIcon={<EmptyHedgesIcon />}
									altText="PCFC (Pre-Shipment Credit in Foreign Currency) and PSFC (Post-Shipment Credit in Foreign Currency) are export finance facilities provided by banks to finance the working capital requirements before and after shipment of goods, respectively. PCFC finances pre-export costs, while PSFC bridges the gap between shipment and payment receipt."
								/>
							</div>
						</div>
					) : (
						<></>
					)}
				</>
			}
		/>
	);
};
export default LoanBookTab;
