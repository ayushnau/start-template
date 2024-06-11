import React, { useRef, useState, useEffect, forwardRef } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseFileUpload } from "@locoworks/reusejs-react-file-upload";
import { ReuseButton } from "@locoworks/reusejs-react-button";

export interface FileUploadProps {
	onFileSelect: any;
	setIsLoading?: Function;
	isLoading?: Boolean;
	setTotalSize?: Function;
	setFileName?: Function;
	setIsValidating?: Function;
	setFile?: Function;
	setShowLoadingErrorComponent?: Function;
	ref?: React.Ref<any>;
}
const FileUpload = forwardRef(
	(
		{
			setIsLoading = () => {},
			isLoading = false,
			setTotalSize = () => {},
			setFileName = () => {},
			setIsValidating = () => {},
			setFile = () => {},
			setShowLoadingErrorComponent = () => {},
		}: FileUploadProps,
		ref,
	) => {
		const inputRef = useRef<any>(null);
		const dragAndDropRef = ref;
		const fileInputRef = useRef<any>(null);
		const [running, setRunning] = useState(true);
		const [error, setError] = useState("");

		const handleLoading = (e: any) => {
			setFileName(e[0].name);
			const totalSizeOfFiles = e[0].size;
			setFile(e[0]);

			setTotalSize(totalSizeOfFiles);

			const oneMb = 1024 * 1024;
			const totalMbs = totalSizeOfFiles / oneMb;
			const time = totalMbs * 500;
			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false);
				setIsValidating(true);
			}, time);
		};
		useEffect(() => {
			if (error !== "") {
				setShowLoadingErrorComponent(true);
			}
		}, [error]);

		return (
			<ReuseFileUpload
				setCustomError={setError}
				acceptedFileTypes={[
					// "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					// "application/vnd.ms-excel",
					"text/csv",
				]}
				ref={inputRef}
				dragAndDropRef={dragAndDropRef}
				enableDragAndDrop
				fileSize={5 * 1024 * 1024} //5mb
				allowsMultiple
				handleAfterFileUploadHook={async (e) => {
					handleLoading(e);
				}}
				showChildren
			>
				<PrimaryButton
					onClick={() => {}}
					className="px-4 py-3 text-sm font-semibold leading-[22px]"
					buttonText="Click to Browse"
				/>
			</ReuseFileUpload>
		);
	},
);

export default FileUpload;
