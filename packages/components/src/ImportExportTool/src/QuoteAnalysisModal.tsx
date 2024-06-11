import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { BackArrowIcon, HandleIcon } from "icons";
import { twMerge } from "tailwind-merge";
import Heading1 from "../../web-components/src/Headings/Heading1";
import QuoteAnalysisRowElement from "./QuoteAnalysisRowElement";

export interface QuoteAnalysisModalInterface {
	web?: boolean;
}

const QuoteAnalysisModal = React.forwardRef(
	(
		{ content, quote_currency, base_currency, web = false, ...props }: any,
		ref: any,
	) => {
		return (
			<div
				ref={ref}
				className={twMerge(
					"max-h-[600px] h-fit bg-white  flex flex-col gap-y-3 transition-all",
					web ? "rounded-xl" : "rounded-t-xl w-full",
				)}
			>
				<div className="px-5 py-5 border-b w-full h-fit">
					<div
						className="cursor-pointer mx-auto w-fit"
						onClick={() => {
							props.onAction(false);
						}}
					>
						<HandleIcon />
					</div>
					<Heading1 label="Quote Analysis" className="text-[25px] mt-2" />
					<div className="mt-4 flex flex-col ">
						<div className="grid grid-cols-5 border-b border-mine-shaft-2 py-2">
							<label className="font-inter text-mine-shaft-3 text-xs ">
								Month
							</label>
							<label className="font-inter text-mine-shaft-3 text-xs col-span-2">
								Amount
							</label>
							<label className="font-inter text-mine-shaft-3 text-xs col-span-2">
								Profit/Loss
							</label>
						</div>
					</div>
					{content?.map((row: any, index: number) => {
						return (
							<QuoteAnalysisRowElement
								key={index}
								month={row?.date}
								amount={row?.amount}
								amount_currency={base_currency}
								pnl={row.pnl}
								pnl_currency={quote_currency}
							/>
						);
					})}
				</div>
			</div>
		);
	},
);

const showQuoteAnalysisModal = async ({
	content,
	quote_currency,
	base_currency,
	web = false,
}: any) => {
	let classes = "absolute bottom-0 w-full";
	if (web) {
		classes = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		component: QuoteAnalysisModal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		modalWrapperClasses: classes,
		content: content,
		quote_currency: quote_currency,
		base_currency: base_currency,
		web: web,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
};

export default showQuoteAnalysisModal;
