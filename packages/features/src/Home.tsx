import React from "react";
import {
	NavbarHome,
	MainSection,
	VisionComponent,
	CentralizeTrade,
	LiveCurrency,
	FeatureTools,
	Help,
	PricingSection,
	Training,
	ChallengesSolution,
	Footer,
	Reports,
	About,
} from "components";

const Home = () => {
	return (
		<div className="z-10 relative">
			<NavbarHome />
			<div className="flex flex-col gap-y-10 md:gap-y-[35px]  relative">
				<div>
					<MainSection />
					<VisionComponent />
				</div>
				<CentralizeTrade />
				<LiveCurrency />
				<Reports />
				<FeatureTools />
				<Help />
				<PricingSection />
				<Training />
				<ChallengesSolution />
				{/* <News /> */}
				<About />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
