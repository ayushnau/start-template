import React from "react";

const Timer: React.FC<{ className: string }> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			className={className}
		>
			<rect width="16" height="16" fill="#F5F5F5" />
			<g id="Forex">
				<path
					d="M-4384 -617C-4384 -618.105 -4383.1 -619 -4382 -619H7768C7769.1 -619 7770 -618.105 7770 -617V1383C7770 1384.1 7769.1 1385 7768 1385H-4382C-4383.1 1385 -4384 1384.1 -4384 1383V-617Z"
					fill="#E5E5E5"
				/>
				<g id="Forex_2" clipPath="url(#clip0_180_1269)">
					<rect
						width="375"
						height="812"
						transform="translate(-20 -446)"
						fill="white"
					/>
					<g id="Frame 47">
						<g id="Frame 27">
							<rect
								width="335"
								height="378"
								transform="translate(0 -362)"
								fill="white"
							/>
							<g id="Frame 48">
								<g id="Frame 54">
									<rect
										width="335"
										height="28"
										transform="translate(0 -12)"
										fill="white"
									/>
									<g id="Timer" clipPath="url(#clip1_180_1269)">
										<path
											id="Vector"
											d="M10 0.666687H6V2.00002H10V0.666687ZM7.33333 9.33335H8.66667V5.33335H7.33333V9.33335ZM12.6867 4.92669L13.6333 3.98002C13.3467 3.64002 13.0333 3.32002 12.6933 3.04002L11.7467 3.98669C10.7133 3.16002 9.41333 2.66669 8 2.66669C4.68667 2.66669 2 5.35335 2 8.66669C2 11.98 4.68 14.6667 8 14.6667C11.32 14.6667 14 11.98 14 8.66669C14 7.25335 13.5067 5.95335 12.6867 4.92669ZM8 13.3334C5.42 13.3334 3.33333 11.2467 3.33333 8.66669C3.33333 6.08669 5.42 4.00002 8 4.00002C10.58 4.00002 12.6667 6.08669 12.6667 8.66669C12.6667 11.2467 10.58 13.3334 8 13.3334Z"
											fill="#717171"
										/>
									</g>
								</g>
							</g>
						</g>
					</g>
				</g>
				<path
					d="M-4382 -618H7768V-620H-4382V-618ZM7769 -617V1383H7771V-617H7769ZM7768 1384H-4382V1386H7768V1384ZM-4383 1383V-617H-4385V1383H-4383ZM-4382 1384C-4382.55 1384 -4383 1383.55 -4383 1383H-4385C-4385 1384.66 -4383.66 1386 -4382 1386V1384ZM7769 1383C7769 1383.55 7768.55 1384 7768 1384V1386C7769.66 1386 7771 1384.66 7771 1383H7769ZM7768 -618C7768.55 -618 7769 -617.552 7769 -617H7771C7771 -618.657 7769.66 -620 7768 -620V-618ZM-4382 -620C-4383.66 -620 -4385 -618.657 -4385 -617H-4383C-4383 -617.552 -4382.55 -618 -4382 -618V-620Z"
					fill="black"
					fillOpacity="0.1"
				/>
			</g>
			<defs>
				<clipPath id="clip0_180_1269">
					<rect
						width="375"
						height="812"
						fill="white"
						transform="translate(-20 -446)"
					/>
				</clipPath>
				<clipPath id="clip1_180_1269">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Timer;
