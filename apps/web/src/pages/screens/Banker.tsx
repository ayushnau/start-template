import React from "react";
import { StatusSlider, BusinessScreen } from "components";
export interface SlideQuoteInterface {
	heading: string;
	phrase: string;
}

export interface BusinessScreenInterface {
	quotesSlide: SlideQuoteInterface;
	slideOption: string;
}

const bankerSlideQoutes: SlideQuoteInterface[] = [
	{
		heading: "Access to a wider customer base",
		phrase: "Grow your business with our global platform",
	},
	{
		heading: "Increase revenue streams",
		phrase:
			"Monetize on WiredUp with sessions, webinars and consultations for businesses",
	},
	{
		heading: "Improve customer engagement ",
		phrase:
			"Instantly respond to assigned queries and deals with our in-app chat",
	},
	{
		heading: "Competitive edge and heightened visibility",
		phrase:
			"Stand out by reaching more potential customersMonitor, manage, quote, compare, and conquer market surprises",
	},
];

const bankerSlide: React.ReactNode[] = [];

bankerSlideQoutes.forEach((element: SlideQuoteInterface, index) => {
	bankerSlide.push(
		<BusinessScreen quotesSlide={element} slideOption={"Banker/ Partner"} />,
	);
});

const Banker = () => {
	return (
		<div className={`bg-white h-full rounded-t-3xl shadow-style-chooser`}>
			<div className="relative h-screen overflow-hidden w-full">
				<StatusSlider
					count={4000}
					sliderArray={bankerSlide}
					progressColor={"bg-black"}
					progressContainerColor={""} // tailwind color only
					progressContainerStyles={`h-2`}
					footer={""}
					loop={false}
				/>
			</div>
		</div>
	);
};

export default Banker;
