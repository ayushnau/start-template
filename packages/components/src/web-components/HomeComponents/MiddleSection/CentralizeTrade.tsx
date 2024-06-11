import React, { useEffect, useRef, useState } from "react";
import ImageDescriptionComp from "../ImageDescriptionComp";
import HeadingDescriptionComp from "../../../global/HeadingDescriptionComp";
import CheckedDescription from "../CheckedDescription";
import BarCodeIcon from "../BarCodeIcon";
import { twMerge } from "tailwind-merge";
import { FxRateCalculate } from "icons";

const data = [
	"Manage Export Sales, Import Purchases, Receivables, and Payables with real-time market rates",
	"Record Your Hedges for Contracted or Anticipated Exposures",
	"Seamlessly connect Hedges to your Trades",
	"Effortlessly record and track Hedge utilisation and cancellation details",
	"Daily Evaluation of Hedge Pick-Ups vs. Cash Transactions at your fingertips",
];

const DescriptionComp = () => {
	return (
		<>
			{data.map((value: any, index: number) => {
				return <CheckedDescription key={value + index} description={value} />;
			})}
		</>
	);
};
const CentralizeTrade = ({ ref }: any) => {
	const targetElementRef = useRef(null);
	const [qrCodeShown, setQrCodeShown] = useState<boolean>(false);
	const [showQrCode, setShowQrCode] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const targetElement: any = targetElementRef.current;
			if (targetElement) {
				const rect = targetElement.getBoundingClientRect();
				const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

				if (isInViewport && !qrCodeShown) {
					setQrCodeShown(true);
					setShowQrCode(true);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [qrCodeShown]);

	return (
		<div id="centralize" className="mx-5">
			<div
				ref={targetElementRef}
				className=" max-w-[1030px]  mx-auto z-100 md:py-8 py-0"
			>
				<div
					className={twMerge(
						"fixed bottom-4 left-4 shadow-boxShadow2 rounded-2xl z-[200]",
						showQrCode ? "" : "hidden",
					)}
				>
					<BarCodeIcon setShowQrCode={setShowQrCode} showQrCode={showQrCode} />
				</div>
				<ImageDescriptionComp
					imageClassName="md:w-auto w-full"
					image={
						<div className="sm:h-[493px] w-full sm:w-auto">
							<img
								className="object-contain h-full w-full"
								src="/icons/sectionimage/centralize.png"
								alt=""
							/>
						</div>
					}
					isImageRight={true}
					className="flex-col-reverse md:flex-row-reverse items-start"
					children={
						<HeadingDescriptionComp
							headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5px] leading-[34px] md:leading-[120%] mb-0"
							heading="Centralize Your Trades and Hedges: Plan, Record, Monitor – All in One Place!"
							childrenClassName="flex flex-col mt-5 gap-y-5"
							children={<DescriptionComp />}
						/>
					}
				/>
			</div>
		</div>
	);
};

export default CentralizeTrade;
