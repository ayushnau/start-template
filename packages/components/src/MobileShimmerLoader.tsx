import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const MobileShimmerLoader: any = () => {
	return (
		<div className="px-5 pt-[40px]">
			<div className="flex gap-y-[49px] items-center flex-col">
				<div className="flex gap-y-4 flex-col w-full">
					<div className="flex items-center justify-between gap-x-[18px]">
						<Skeleton
							containerClassName="w-full"
							className="bg-backgroundShimmerGradient"
							height={57}
						/>
						<Skeleton
							className="bg-backgroundShimmerGradient"
							circle
							width={56}
							height={56}
						/>
					</div>
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-[85%]"
						height={19}
					/>
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-full"
						height={19}
					/>
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-full"
						height={40}
					/>
				</div>

				<div className="flex items-start flex-col gap-y-4 w-full">
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-full"
						height={57}
					/>
					<Skeleton
						className="text-start bg-backgroundShimmerGradient"
						containerClassName="w-[53%]"
						height={19}
					/>
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-full"
						height={19}
					/>
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-full"
						height={47}
					/>
					<div className="flex items-center gap-x-[21px] w-full">
						<Skeleton
							className="bg-backgroundShimmerGradient"
							containerClassName="w-[50%]"
							height={40}
						/>
						<Skeleton
							className="bg-backgroundShimmerGradient"
							containerClassName="w-[50%]"
							height={40}
						/>
					</div>
				</div>
				<div className="flex flex-col items-start gap-y-4 w-full">
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-full"
						height={57}
					/>
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-[53%]"
						height={19}
					/>
					<Skeleton
						className="bg-backgroundShimmerGradient"
						containerClassName="w-full"
						height={19}
					/>
				</div>
			</div>
		</div>
	);
};

export default MobileShimmerLoader;
