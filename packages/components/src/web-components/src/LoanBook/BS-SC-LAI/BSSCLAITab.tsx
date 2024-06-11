import React, { useState } from "react";
import { Loader, EmptyLedgersSection } from "components";

import { EmptyHedgesIcon } from "icons";

import "moment-timezone";
import ComingSoonSection from "../ComingSoonSection";

export interface BSSCLAITabInterface {
	setNavigationTabSwitch: Function;
}

const BSSCLAITab: React.FC<BSSCLAITabInterface> = (setNavigationTabSwitch) => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");

	return (
		<Loader
			loadingText={loadingText}
			isLoading={isLoading}
			successComponent={
				<>
					<div className="h-[calc(100vh)] flex items-center justify-center">
						<div className="w-1/2">
							<ComingSoonSection />
						</div>
						<div className="border-l h-full" />
						<div className="w-1/2">
							<EmptyLedgersSection
								altIcon={<EmptyHedgesIcon />}
								altText="For working capital requirements of Exporters, loans can be extended by way of Pre Shipment Credit in Foreign Currency (PCFC)/ Post Shipment Credit in Foreign Currency (PSFC)."
							/>
						</div>
					</div>
				</>
			}
		/>
	);
};

export default BSSCLAITab;
