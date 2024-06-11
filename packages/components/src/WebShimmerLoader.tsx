import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const backgroundStyle = {
	background:
		"linear-gradient(83deg, #F3F3F3 32.65%, #F3F3F3 37.75%, #F3F3F3 40.89%, #EEE 58.72%)",
};

const ShimmerComponents = [
	<div className="border-md flex flex-col p-4 w-full h-[25.4%] gap-y-4 bg-white rounded-md">
		<div className="flex items-center w-full gap-x-[19px] h-[42%]">
			<Skeleton
				style={backgroundStyle}
				containerClassName="w-full h-full"
				className="h-full bg-backgroundShimmerGradient"
			/>
			<Skeleton style={backgroundStyle} circle width={56} height={56} />
		</div>
		<Skeleton
			style={backgroundStyle}
			containerClassName="w-[77%]  h-[14%]"
			className="h-full bg-backgroundShimmerGradient"
		/>
		<Skeleton
			style={backgroundStyle}
			containerClassName="w-full  h-[14%]"
			className="h-ful bg-backgroundShimmerGradient"
		/>
		<Skeleton
			style={backgroundStyle}
			containerClassName="w-full  h-[29.6%]"
			className="h-full bg-backgroundShimmerGradient"
		/>
	</div>,
	<div className="rounded-md flex flex-col p-4 gap-y-4 bg-white h-full">
		<Skeleton
			style={backgroundStyle}
			containerClassName="w-full h-[31%]"
			className="h-full bg-backgroundShimmerGradient"
		/>
		<Skeleton
			style={backgroundStyle}
			containerClassName="w-[53%] h-[31%]"
			className="h-full bg-backgroundShimmerGradient"
		/>
		<Skeleton
			style={backgroundStyle}
			containerClassName="w-full h-[31%]"
			className="h-full bg-backgroundShimmerGradient"
		/>
		<Skeleton
			style={backgroundStyle}
			containerClassName="w-full h-[26.1%]"
			className="h-full bg-backgroundShimmerGradient"
		/>
		<div className="flex items-center gap-x-4 h-[22.2%]">
			<Skeleton
				style={backgroundStyle}
				containerClassName="w-full h-full"
				className="h-full bg-backgroundShimmerGradient"
			/>
			<Skeleton
				style={backgroundStyle}
				containerClassName="w-full h-full"
				className="h-full bg-backgroundShimmerGradient"
			/>
		</div>
	</div>,
];

const WebShimmerLoader: any = () => {
	return (
		<div className="w-[100vw] min-h-[100vh] fixed inset-0 isolate z-10000  px-4 py-5 flex flex-nowrap gap-x-4 bg-[#F2F2F4] overflow-hidden ">
			<div
				className="flex-1 flex flex-col gap-y-4 flex-grow-1 overflow-hidden h-full"
				style={{ flexGrow: 1 }}
			>
				{ShimmerComponents[0]}
				<div className="flex flex-col items-center p-4 w-full gap-y-[19px] w-full h-[75%] rounded-md bg-white">
					<Skeleton
						containerClassName="w-full h-[0.09%]"
						className="bg-backgroundShimmerGradient h-full"
					/>
					{Array(6)
						.fill(null)
						.map((_, index) => {
							return (
								<div
									key={index}
									className="flex item-center gap-x-[19px] w-full h-[12.6%]"
								>
									<Skeleton
										style={backgroundStyle}
										circle
										width={60}
										height={60}
										containerClassName="h-full"
										className="bg-backgroundShimmerGradient h-full"
									/>

									<div className="flex flex-col items-center gap-y-3 w-full">
										<Skeleton
											style={backgroundStyle}
											containerClassName="w-full h-5/11"
											className="h-full bg-backgroundShimmerGradient"
										/>
										<Skeleton
											style={backgroundStyle}
											containerClassName="w-full h-6/11"
											className="h-full bg-backgroundShimmerGradient"
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<div style={{ flexGrow: 1.08 }} className="flex-1 flex flex-col gap-y-4 ">
				{ShimmerComponents[0]}
				<div className="rounded-md flex gap-y-4 flex-col items-center w-full bg-white p-4 h-[58%]">
					<div className="w-full flex gap-x-[21px] h-full">
						<div className="flex flex-col items-center gap-y-4 w-full h-full">
							<Skeleton
								containerClassName="w-full h-[39%]"
								className="h-full bg-backgroundShimmerGradient"
							/>
							<Skeleton
								containerClassName="w-full h-[13%]"
								className="h-full bg-backgroundShimmerGradient"
							/>
						</div>
						<Skeleton
							width={64}
							containerClassName="h-full"
							className="h-full bg-backgroundShimmerGradient"
						/>
					</div>
					<Skeleton
						width={64}
						containerClassName="h-[0.05%]"
						className="h-full bg-backgroundShimmerGradient"
					/>
					{Array(5)
						.fill(null)
						.map((_, index) => {
							return (
								<Skeleton
									key={index}
									containerClassName="w-full h-[11%]"
									className="h-full bg-backgroundShimmerGradient"
								/>
							);
						})}
				</div>
				<div className="rounded-md flex flex-col p-4 gap-y-4 bg-white h-[18%]">
					<Skeleton
						style={backgroundStyle}
						containerClassName="w-full h-[24%]"
						className="h-full bg-backgroundShimmerGradient"
					/>
					<Skeleton
						style={backgroundStyle}
						containerClassName="w-full h-[52%]"
						className="h-full bg-backgroundShimmerGradient"
					/>
					<div className="flex items-center gap-x-4 h-1/4">
						<Skeleton
							style={backgroundStyle}
							containerClassName="w-full h-full"
							className="h-full bg-backgroundShimmerGradient"
						/>
						<Skeleton
							style={backgroundStyle}
							containerClassName="w-full h-full"
							className="h-full bg-backgroundShimmerGradient"
						/>
					</div>
				</div>
			</div>
			<div style={{ flexGrow: 1 }} className="flex-1 flex flex-col gap-y-4 ">
				{ShimmerComponents[1]}
				{ShimmerComponents[1]}
				{ShimmerComponents[1]}
			</div>
		</div>
	);
};

export default WebShimmerLoader;
