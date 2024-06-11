import React, { useState } from "react";
import { BackArrowIcon, ToolTipDownwardArrow, UploadIcon } from "icons";
import { SettingIcon } from "icons";
import { twMerge } from "tailwind-merge";

export interface HeaderPropsInterface {
	className?: string;
	displayTitle: string | React.ReactElement;
	showBackArrow?: boolean;
	showEditIcon?: boolean;
	editAction?: Function;
	displaySubTitle?: any;
	backAction?: Function;
	showDelete?: boolean;
	deleteAction?: Function;
	showEditText?: boolean;
	displayTitleStyles?: string;
	displaySubTitleStyles?: string;
	subtitleWrapper?: string;
	showUploadIcon?: boolean;
	uploadCallback?: () => void;
	headerCustomComponent?: React.ReactNode | React.ReactNode[];
	showPlainText?: boolean;
	SuffixPlaintext?: string;
}

const Header: React.FC<HeaderPropsInterface> = ({
	className,
	displayTitle,
	showBackArrow = true,
	showEditIcon = true,
	editAction = () => {},
	displaySubTitle,
	backAction,
	showDelete,
	deleteAction,
	showEditText,
	displayTitleStyles = "",
	displaySubTitleStyles = "",
	subtitleWrapper = "",
	showUploadIcon = false,
	uploadCallback,
	headerCustomComponent,
	showPlainText,
	SuffixPlaintext,
}) => {
	const [showDialog, setShowDialog] = useState(false);
	const divRef = React.useRef<any>();

	const handleOutsideClick = () => {
		!showDialog && setShowDialog(false);
	};

	React.useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (divRef.current && !divRef.current.contains(event.target)) {
				handleOutsideClick();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			key="HeaderComponent"
			className={
				className ? className : "flex items-center justify-between px-4 pb-4"
			}
		>
			{showBackArrow ? (
				<div
					className="cursor-pointer"
					onClick={() => {
						backAction && backAction();
					}}
				>
					<BackArrowIcon />
				</div>
			) : null}
			{displaySubTitle ? (
				<div
					className={twMerge(
						"flex flex-col justify-start w-full ml-4",
						subtitleWrapper,
					)}
				>
					<span
						className={twMerge(
							"text-base font-bold text-mine-shaft-4 font-inter w-full",
							displayTitleStyles,
						)}
					>
						{displayTitle}
					</span>
					<span
						className={twMerge(
							"text-sm w-full text-mine-shaft-3",
							displaySubTitleStyles,
						)}
					>
						{displaySubTitle}
					</span>
				</div>
			) : (
				<span
					className={twMerge(
						"text-xl font-inter font-bold w-full ml-4",
						displayTitleStyles,
					)}
				>
					{displayTitle}
				</span>
			)}
			{headerCustomComponent && headerCustomComponent}
			{showUploadIcon && (
				<div className="w-fit h-fit px-4 group">
					<div className="absolute top-7 right-[21px] hidden group-hover:block rounded-md py-2 px-4 text-xs font-normal leading-4 bg-mine-shaft-4 text-white">
						<div className="relative">
							<div className="absolute -bottom-[17px] right-6">
								<ToolTipDownwardArrow />
							</div>
							BulkUpload
						</div>
					</div>
					<div
						className="cursor-pointer "
						onClick={async (e) => {
							e.preventDefault();
							uploadCallback && uploadCallback();
						}}
					>
						<UploadIcon />
					</div>
				</div>
			)}
			{showEditIcon && (
				<div
					ref={divRef}
					onClick={() => {
						handleOutsideClick();
						setShowDialog(!showDialog);
					}}
					className="relative  cursor-pointer"
				>
					<SettingIcon />
					<div
						className={`px-4 py-2 shadow-boxShadow absolute top-[30px] right-0 z-10 rounded-xl w-[193px] h-[94px] bg-white ${
							showDialog ? "block" : "hidden"
						} `}
					>
						<div
							onClick={() => {
								if (editAction) editAction();
								setShowDialog(false);
							}}
							className="p-2 text-sm leading-[22px] text-black border-b border-dotted border-[#DDDDDD] cursor-pointer"
						>
							Edit
						</div>

						<div
							onClick={() => {
								if (deleteAction) deleteAction();
								setShowDialog(false);
							}}
							className="p-2 text-sm text-red-core cursor-pointer leading-[22px]"
						>
							Delete
						</div>
					</div>
				</div>
			)}
			{showEditText && (
				<div className="flex justify-center items-center">
					<span
						className="text-sm font-semibold underline self-baseline cursor-pointer text-mine-shaft-4"
						onClick={(e) => {
							e.preventDefault();
							editAction();
						}}
					>
						Edit
					</span>
				</div>
			)}
			{showPlainText && (
				<div className="flex justify-center items-center w-1/3">
					<span
						className=" text-sm font-normal text-mine-shaft-3 px-2"
						onClick={(e) => {
							e.preventDefault();
							editAction();
						}}
					>
						{SuffixPlaintext}
					</span>
				</div>
			)}
			{showDelete && deleteAction && (
				<div className="flex justify-center items-center">
					<span
						className="text-sm font-semibold underline self-baseline cursor-pointer text-sunset-orange-3"
						onClick={(e) => {
							e.preventDefault();
							deleteAction();
						}}
					>
						Delete
					</span>
				</div>
			)}
		</div>
	);
};

export default Header;
