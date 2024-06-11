import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";

import AddHedgeBulkUpload from "./AddHedgeBulkUpload";
import Validate from "../Validate";
import Loading from "../Loading";
import Success from "../Success";
import { BackArrowIcon, DownloadFormat } from "icons";
import showHedgeListModal from "./showHedgeListModal";
import { twMerge } from "tailwind-merge";
import {
	convertCsvToJson,
	convertCsvFileToCsv,
	validateBulkUploadHedges,
} from "services";

const Modal = React.forwardRef((props: any, ref: any) => {
	const handleFileSelect = (selectedFile: any) => {};
	const [isLoading, setIsLoading] = useState(false);
	const [totalSize, setTotalSize] = useState(0);
	const [processedFileSize, setProcessedFileSize] = useState(0);
	const [progress, setProgress] = useState(0);
	const [fileName, setFileName] = useState("");
	const [isValidating, setIsValidating] = useState(false);
	const [isSuccess, setIsSuccess] = useState(props.showSuccess);
	const [file, setFile] = useState<any>(null);
	const [recordSize, setRecordSize] = useState(props.hedgesNumber);
	const [data, setData] = useState<any>([]);
	const [errors, setErrors] = useState<any>({});
	const [hedgeListShown, setHedgeListShown] = useState(false);
	const [validateErrorComponent, showValidateErrorComponent] = useState(false);
	const [loadingErrorComponent, setShowLoadingErrorComponent] = useState(false);
	const reloadCallback = props?.reloadCallback;

	const handleShowBulkUploadModal = async () => {
		props.onAction(false);

		await showHedgeListModal({
			data,
			reloadCallback: reloadCallback,
			errors: errors,
		});
	};

	const handleCallValidate = async () => {
		if (file !== null) {
			const headers = [
				"hedge_type",
				"maturity_date",
				"currency_pair",
				"hedge_amount",
				"hedged_rates",
				"bank_name",
				"bank_ref",
				"hedge_basis",
			];

			let jsonData: any = [];
			try {
				let csv: any = "";
				if (file.type === "text/csv") {
					try {
						csv = await convertCsvFileToCsv(file);
					} catch (error) {
						setIsValidating(true);
					}
				}
				jsonData = await convertCsvToJson(csv, headers, true);
				const payload = {
					hedges_list: jsonData,
				};
				const response: any = await validateBulkUploadHedges(payload);
				if (
					response.success === true &&
					response.data &&
					response.data?.length > 0
				) {
					setIsValidating(false);
					setData(response.data);
				}
			} catch (error: any) {
				console.log("Error encountered is :: ", error);
				const data = error?.response?.data;
				const errors = data?.errors;
				if (errors && Object.keys(errors)?.length > 0) {
					setIsValidating(false);
					setData(jsonData);
					setErrors(errors);
				} else {
					setIsValidating(false);
					showValidateErrorComponent(true);
				}
			}
		}
	};

	useEffect(() => {
		if (data.length > 0 && !isValidating) {
			setHedgeListShown(true);
			handleShowBulkUploadModal();
		}
	}, [data, isValidating]);

	useEffect(() => {
		if (isValidating) {
			handleCallValidate();
		}
	}, [isValidating]);

	useEffect(() => {
		let response;
		if (isLoading && processedFileSize <= totalSize) {
			response = setTimeout(() => {
				setProcessedFileSize((prev) => prev + 1024 * 1024);
			}, 500);
		}
		// return clearInterval(response);
	}, [isLoading, processedFileSize]);

	return (
		<div
			className={"w-full   pb-6 sm:w-[505px]   relative bg-white  rounded-xl"}
		>
			<>
				<div className="flex items-center justify-between py-5 px-6 border-b border-mine-shaft-2">
					<div className="flex items-center justify-start gap-x-[10px]">
						<div
							className="cursor-pointer"
							onClick={() => {
								props.onAction(false);
							}}
						>
							<BackArrowIcon />
						</div>
						<div className="text-base font-bold leading-6 -tracking-[0.3px] text-mine-shaft-4 ">
							Bulk Upload
						</div>
					</div>
					<div className="flex items-center gap-x-2">
						<div className="cursor-pointer">
							<DownloadFormat />
						</div>
						<a
							target="_blank"
							onClick={() => {
								fetch("/bulk_upload_hedges_format.csv")
									.then((resp) => {
										return resp.blob();
									})
									.then((blob) => {
										const url = window.URL.createObjectURL(blob);
										const a = document.createElement("a");
										a.style.display = "none";
										a.href = url;
										a.download = "bulk_upload_hedges_format.csv";
										document.body.appendChild(a);
										a.click();
										window.URL.revokeObjectURL(url);
										document.body.removeChild(a);
									});
							}}
						>
							<div className="text-sm font-semibold leading-[22px] text-cornflower-blue-2 ">
								Download Format
							</div>
						</a>
					</div>
				</div>
				<div className="px-6 pt-2 mt-2 -mb-2">
					{validateErrorComponent ? (
						<div className="px-[6px] py-[5px] bg-sunset-orange-1 text-sunset-orange-3 rounded-md">
							<p>
								Sorry! We could not process the uploaded file. This could be
								because of one of the following reasons:
							</p>
							<ul className="">
								<li>1. Incorrect format of the document.</li>
								<li>2. Mandatory fields that are left empty.</li>
								<li>3. Poor or an unstable internet connection.</li>
							</ul>
							<p>
								Please download the right format provided, ensure all the fields
								are filled as per the requirement, and try again.
							</p>
						</div>
					) : (
						<></>
					)}
					{loadingErrorComponent ? (
						<div className="px-[6px] py-[5px] bg-sunset-orange-1 text-sunset-orange-3 rounded-md">
							<p>Uploading failed! Please try again.</p>
						</div>
					) : (
						<></>
					)}
				</div>
				{isLoading || isValidating || isSuccess ? (
					<>
						<div
							className={twMerge(
								"px-6 pt-6 pb-4 flex flex-col flex-1 h-full text-center w-[505px] ",
							)}
						>
							<div className="p-8 h-full flex flex-col items-center justify-center gap-y-6 max-h-[242px]">
								{isSuccess ? (
									<Success
										type="hedges"
										recordSize={recordSize}
										closeModal={() => {
											props.onAction(false);
										}}
										successCallback={reloadCallback}
									/>
								) : (
									<></>
								)}
								{isValidating ? (
									<Validate type="hedges" recordSize={recordSize} />
								) : (
									<></>
								)}
								{isLoading ? (
									<Loading
										progress={progress}
										fileName={fileName}
										isLoading={isLoading}
										setProgress={setProgress}
										totalSize={totalSize}
										processedFileSize={processedFileSize}
									/>
								) : (
									<></>
								)}
							</div>
						</div>
					</>
				) : (
					<AddHedgeBulkUpload
						setIsLoading={setIsLoading}
						isLoading={false}
						setTotalSize={setTotalSize}
						setFileName={setFileName}
						setIsValidating={setIsValidating}
						setFile={setFile}
						onFileSelect={handleFileSelect}
						setShowLoadingErrorComponent={setShowLoadingErrorComponent}
						validateErrorComponent={validateErrorComponent}
						loadingErrorComponent={loadingErrorComponent}
					/>
				)}
			</>
		</div>
	);
});

interface showHedgeBulkUploadModalProps {
	showSuccess?: boolean;
	hedgesNumber?: Number;
	ledgerId?: number | string;
	reloadCallback?: any;
}

const showHedgeBulkUploadModal = async ({
	showSuccess = false,
	hedgesNumber = 0,
	ledgerId = 0,
	reloadCallback,
}: showHedgeBulkUploadModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		showSuccess: showSuccess,
		hedgesNumber: hedgesNumber,
		ledgerId: ledgerId,
		reloadCallback: reloadCallback,
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit",
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	return result;
};

export default showHedgeBulkUploadModal;
