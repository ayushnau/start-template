import React from "react";
import { NavbarHome, Footer } from "components";

const RefundPolicy = () => {
	return (
		<div className="z-10 w-full relative ">
			<NavbarHome />

			<div className="w-full h-[1px] bg-color-black-3"></div>
			<div className="text-base font-normal leading-6 px-5 sm:px-[125px] mt-8">
				<div>
					<h1 className="text-[32px] font-bold -tracking-[1.5px] text-mine-shaft-4 mb-5">
						Refund and Cancellation Requests
					</h1>
					<p className="mb-6">
						WiredUp is a S-a-a-S based product with a subscription model. Our
						Website and App do not entertain any cancellation and refund
						requests. Once the payment has been made by the user after selecting
						the subscription period, and they choose to not use the product for
						any reason, there is no provision to cancel the subscription and
						refund any amount. We will not be held liable for any such request.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default RefundPolicy;
