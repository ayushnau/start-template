import React, { useState } from "react";
import { ChevronDown, ChevronUp, EllipseIcon, CloseIcon } from "icons";
import { PcfcQuestions } from "utils";
import { useModalNavigation } from "services";

const LoanPcfcQuestions = () => {
	const data = PcfcQuestions;
	const [expandedIndex, setExpandedIndex] = useState(-1);

	const toggleAnswer = (index: any) => {
		setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const { closeModalScreen, fullNavigation, switchModalScreen } =
		useModalNavigation();

	return (
		<>
			<div className="relative  bg-white flex flex-col h-full overflow-y-hidden">
				{/*Header section goes here */}
				<div className="flex flex-row items-center gap-x-2 py-[10px] pl-6">
					<div
						onClick={() => {
							closeModalScreen();
						}}
					>
						<CloseIcon />
					</div>
					<div className="font-bold font-inter text-base">
						Frequently Asked Questions - PCFC/PSFC loan
					</div>
				</div>
				<div className="border-b border-b-semiLightGray" />

				<div className="px-6 py-2">
					{data.map((item, index) => (
						<div key={index} className="mb-4">
							<div
								className="flex justify-between items-center cursor-pointer"
								onClick={() => toggleAnswer(index)}
							>
								<div className="flex items-center">
									<div className="relative flex items-center">
										<EllipseIcon className="mr-2" />
										<span className="text-sm font-semibold absolute top-1/2 left-[40%] transform -translate-x-1/2 -translate-y-1/2">
											{index + 1}
										</span>
									</div>
									<h3 className="pl-2 font-base font-inter">{item.question}</h3>
								</div>
								{expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
							</div>
							{expandedIndex === index && (
								<div className="mt-2 text-sm px-12 text-color-black-6">
									<p>{item.answer}</p>
								</div>
							)}

							<div className="border-b border-b-semiLightGray mx-12 pt-2" />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default LoanPcfcQuestions;
