import React from "react";
import { NavbarHome, Footer } from "components";
import { IIcon } from "icons";

const Faq = () => {
	return (
		<div className="z-10 w-full relative ">
			<NavbarHome />

			<div className="w-full h-[1px] bg-color-black-3"></div>
			<div className="text-base font-normal leading-6 px-5 sm:px-[125px] mt-8">
				<div>
					<h1 className="text-[32px] font-bold -tracking-[1.5px] text-mine-shaft-4 mb-5">
						Frequently Asked Questions
					</h1>

					<p className="font-bold pt-7">Can I delete my WiredUp account?</p>
					<div className="mb-6 mt-3">
						<p className="">
							To close your account, either login to your mobile app and use our
							account deletion flow or please send us an email to{" "}
							<span className="font-bold">support@unoroof.com</span> with the
							format specified below:
						</p>

						<div className="mt-6 mb-6">
							<div className="rounded-2xl border border-solid border-white-400 bg-white-200-white-secondary p-6 pl-4 flex flex-col items-start gap-4 text-gray-600">
								<p className="font-bold -mb-3">Email Subject</p>
								<p>
									Request to close account associated with phone number:{" "}
									<span className="font-bold">{"{Your number}"}</span>
								</p>
								<p className="font-bold -mb-3">Email Body</p>
								<p>Your email should contain the following information:</p>
								<ul className="list-disc ml-6">
									<li>A copy of your valid government ID</li>
									<li>
										A signed letter containing your account details requesting
										for the closure of your WiredUp account.
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="flex items-center mb-2 ">
						<IIcon svgStyles="w-4 h-4" color="black" />
						<p className="font-bold pl-1">Important information</p>
					</div>
					<div className="mb-6">
						<ul className="list-disc ml-6">
							<li className="mb-4">
								Please ensure that you have fully repaid all outstanding dues on
								your account. You will not be able to close your account if you
								have outstanding dues.
							</li>
							<li>
								Closing your account means losing all your data. This action
								cannot be undone.
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Faq;
