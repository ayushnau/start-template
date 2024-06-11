import React from "react";
import { StatusSlider, BusinessScreen } from "components";
import { SlideQuoteInterface } from "./Banker";
import { useDispatch } from "react-redux";
import { setRegistrationForm } from "store";

const businessSlideQoutes: SlideQuoteInterface[] = [
	{
		heading: "Your all-in-one solution for Forex risk management",
		phrase:
			"Plan, record, monitor your daily FX activities seamlessly and effectively.",
	},
	{
		heading: "Centralize Your Trades and Hedges",
		phrase:
			"Manage export sales, import purchases, receivables, and payables with real-time market rates!",
	},
	{
		heading: "Live Currency Rates 24/7*",
		phrase:
			"Access real-time traded currency rates from global brokers, financial data providers, and central banks. *on active market days",
	},
	{
		heading: "Best-in-class FX Treasury Tools",
		phrase:
			"Unlock a range of features such as cash vs. hedge pickup, live rate, swap and rollover calculators, and more. Empower profits and minimize risks!",
	},
	{
		heading: "Expand cross border business, never miss a deal",
		phrase:
			"Leverage our tailored features, including the import and export cost analyser, borrowing cost comparer, etc., to assess deal viability and generate quotes.",
	},
	{
		heading: "Get instant help from our FX and compliance experts",
		phrase:
			"Instant assistance for Forex Risk Management, FEMA, regulatory compliance, market views, and more from our 20+ years experienced team.",
	},
	{
		heading: "Flexible and dynamic invoice discounting tool",
		phrase:
			"Maximise returns on surplus cash or unutilised bank lines for vendor discounting.",
	},
];

const businessSlide: React.ReactNode[] = [];

businessSlideQoutes.forEach((element: SlideQuoteInterface, index: number) => {
	businessSlide.push(
		<BusinessScreen quotesSlide={element} slideOption={"Business"} />,
	);
});

const Business = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(setRegistrationForm({ user_type: "business" }));
	}, []);

	return (
		<div className={`bg-white h-full rounded-t-3xl shadow-style-chooser`}>
			<div className="relative h-screen overflow-hidden w-full">
				<StatusSlider
					count={4000}
					sliderArray={businessSlide}
					progressColor={"bg-black"}
					progressContainerColor={""} // tailwind colour only
					progressContainerStyles={`h-2`}
					footer={""}
					loop={false}
				/>
			</div>
		</div>
	);
};

export default Business;
