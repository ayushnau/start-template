import React from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";

interface LoadingProps {
	progress: number;
	fileName: string;
	isLoading: boolean;
	totalSize: number;
	processedFileSize: number;
	setProgress: Function;
}

const Loading: React.FC<LoadingProps> = ({
	progress,
	fileName,
	isLoading = false,
	totalSize,
	processedFileSize,
	setProgress,
}) => {
	return (
		<>
			{" "}
			<label className="text-mine-shaft-4 text-lg font-bold leading-[26px] -tracking-[0.35px] h-[242px]">
				Uploading {progress}%
			</label>
			<label className="text-sm font-normal leading-[22px] text-color-black-5 mb-6">
				{fileName}
			</label>
			<ProgressBar
				progressInterval={60000}
				running={isLoading}
				totalFileSize={totalSize}
				processedFileSize={processedFileSize}
				defaultProgress={0}
				progressContainerClasses=" h-2 flex rounded-full bg-[#D9D9D9]"
				progressClasses="h-full rounded-none bg-cornflower-blue-2 rounded-full "
				progressText={(progress: number) => {
					setProgress(progress);
					return "";
				}}
			/>
		</>
	);
};

export default Loading;
