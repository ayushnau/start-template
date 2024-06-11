import React from "react";
import {
	AuthCardWrapper,
	AuthWrapper,
	Slider,
	LoginContent,
	OTPContent,
	SetUpPassword,
	EnterPasswordContent,
	LoadingContent,
	SuccessContent,
} from "components";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

const businessSlideQoutes = [
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

const BUSINESSSLIDES = businessSlideQoutes.map((ele, index: number) => {
	return (
		<div key={index} className="flex flex-col items-center justify-center">
			<h1 className="font-inter text-[40px] font-bold -tracking-[1.5px] text-mine-shaft-4">
				{ele.heading}
			</h1>
			<h1 className="font-inter self-stretch text-base leading-6 text-mine-shaft-3">
				{ele.phrase}
			</h1>
		</div>
	);
});

const Auth = () => {
	const location = useLocation();

	return (
		<AuthWrapper>
			{location.pathname !== "/success" && (
				<div className="w-[400px] h-[425px] hidden md:block">
					<Slider
						count={2000}
						sliderArray={BUSINESSSLIDES}
						progressColor={"bg-black"}
						progressContainerColor={""} // tailwind colour only
						progressContainerStyles={`h-2`}
						footer={""}
						loop={true}
					/>
				</div>
			)}
			<AuthCardWrapper>
				<Routes>
					<Route path="/" element={<LoginContent />} />
					<Route path="/login" element={<LoginContent />} />
					<Route path="/otp" element={<OTPContent />} />
					<Route path="/set-password" element={<SetUpPassword />} />
					<Route path="/enter-password" element={<EnterPasswordContent />} />
					<Route path="/loading" element={<LoadingContent />} />
					<Route path="/success" element={<SuccessContent />} />
				</Routes>
			</AuthCardWrapper>
		</AuthWrapper>
	);
};

export default Auth;
