import React, { useRef } from "react";
import { IIcon, DragAndDrop } from "icons";
import { FileUpload } from "components";
import { twMerge } from "tailwind-merge";

interface AddHedgeBulkUpload {
	isLoading: any;
	setIsLoading: any;
	setTotalSize: any;
	setFileName: any;
	setIsValidating: any;
	setFile: any;
	setShowLoadingErrorComponent: Function;
	onFileSelect: (selectedFile: any) => void;
	loadingErrorComponent: boolean;
	validateErrorComponent: boolean;
}

const AddHedgeBulkUpload: React.FC<AddHedgeBulkUpload> = ({
	setIsLoading = () => {},
	isLoading = false,
	setTotalSize = () => {},
	setFileName = () => {},
	setIsValidating = () => {},
	setFile = () => {},
	onFileSelect = () => {},
	setShowLoadingErrorComponent = () => {},
	loadingErrorComponent = false,
	validateErrorComponent = false,
}) => {
	const dragAndDropRef = useRef<any>(null);

	return (
		<>
			<div
				className={twMerge(
					"px-6 mt-4 rounded-xl ",
					loadingErrorComponent ? "" : "mb-[9px]",
					loadingErrorComponent && validateErrorComponent ? "" : "mb-6",
				)}
			>
				<div
					ref={dragAndDropRef}
					className="rounded-xl border-dashed border border-color-black-3 px-10 py-8 flex flex-col items-center justify-center"
				>
					<div className="">
						<DragAndDrop />
					</div>
					<div className="text-base font-semibold leading-6 -tracking-[0.3px] text-mine-shaft-4">
						Drag and drop file here
					</div>
					<div className="my-1 text-xs text-base leading-[18px] text-color-black-5">
						Supported file format .csv upto 5mb
					</div>
					<div className="flex items-center gap-x-2 my-4 text-xs text-base leading-[22px] text-color-black-5">
						<div className="w-[43px] h-[2px] bg-mine-shaft-2"></div>
						Or
						<div className="w-[43px] h-[2px] bg-mine-shaft-2"></div>
					</div>

					<FileUpload
						setIsLoading={setIsLoading}
						isLoading={isLoading}
						setTotalSize={setTotalSize}
						onFileSelect={onFileSelect}
						setFileName={setFileName}
						setIsValidating={setIsValidating}
						setFile={setFile}
						setShowLoadingErrorComponent={setShowLoadingErrorComponent}
						ref={dragAndDropRef}
					/>
				</div>
			</div>
			<div className="px-6 flex flex-col gap-y-2 pt-2">
				<div>Note:</div>
				<div className="flex items-center gap-x-2">
					<IIcon color="#646464" />
					<div className="text-xs font-normal leading-[18px] text-color-black-6">
						The file should follow the template
					</div>
				</div>
				<div className="flex items-center gap-x-2">
					<IIcon color="#646464" />
					<div className="text-xs font-normal leading-[18px] text-color-black-6 ">
						All mandatory fields must be filled
					</div>
				</div>
				<div className="flex items-start gap-x-2">
					<IIcon color="#646464" />
					<div className="text-xs font-normal leading-[18px] text-color-black-6 flex-1">
						If a certain file doesn’t get uploaded, you can either edit in the
						sheet and re-upload the sheet
					</div>
				</div>
			</div>
		</>
	);
};

export default AddHedgeBulkUpload;
