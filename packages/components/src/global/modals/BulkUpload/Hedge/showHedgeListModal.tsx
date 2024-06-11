import React, { useEffect, useState } from "react";
import { BackArrowIcon } from "icons";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BulkUploadHedgeList from "./BulkUploadHedgeList";
import { PrimaryButton } from "components";
import ConfirmationModal from "../ConfirmationModal";
import { bulkUpload, bulkUploadHedges } from "services";
import showHedgeBulkUploadModal from "./showHedgeBulkUploadModal";

const Modal = (props: any) => {
	const { onAction, disableOutsideClick, setDisableOutsideClick } = props;
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const reloadCallback = props?.reloadCallback;

	const errors = props.errors;
	const errors_exist = Object.keys(errors).length > 0;

	const headerList = [
		"#",
		"Hedge type",
		"Currency pair",
		"Maturity date",
		"Hedge Amount",
		"Hedge Rate",
		"Bank Name",
		"Bank Reference",
		"Hedge Basis",
	];

	const headerKeys = [
		"hedge_type",
		"currency_pair",
		"maturity_date",
		"hedge_amount",
		"hedged_rates",
		"bank_name",
		"bank_ref",
		"hedge_basis",
	];

	const stylesDataArray = [
		"w-[55px] max-w-[55px]",
		"w-[67px] max-w-[67px]",
		"w-[82px] max-w-[82px]",
		"w-[110px] max-w-[110px]",
		"w-[130px] max-w-[130px]",
		"w-[64px] max-w-[64px]",
		"w-[134px] max-w-[134px]",
		"w-[134px] max-w-[134px]",
		"w-[168px] max-w-[168px]",
	];

	const handleCallBulkUploadModal = async (hedgeCount: any) => {
		await showHedgeBulkUploadModal({
			showSuccess: true,
			hedgesNumber: hedgeCount,
			reloadCallback: reloadCallback,
		});
	};

	const handleSaveBulkHedgeUpload = async () => {
		const payload = { hedges_list: props?.data };
		try {
			setIsLoading(true);
			const response: any = await bulkUploadHedges(payload);
			if (response.success) {
				handleCallBulkUploadModal(response?.hedgesSaved);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={
				"relative bg-white rounded-xl h-[628px] w-screen max-w-[1140px] overflow-scroll"
			}
		>
			<ConfirmationModal
				setOpen={setOpen}
				open={open}
				closeTradeListModal={props.onAction}
				type={"HEDGES"}
			/>
			{isLoading ? (
				<div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
					<div className="relative  flex h-20 w-20 justify-center items-center rounded-full border-4 border-white border-t-gray-600 opacity-100 animate-spin"></div>
				</div>
			) : (
				<></>
			)}
			<div>
				<div className="flex items-center justify-between py-5 px-6 border-b border-mine-shaft-2">
					<div className="flex items-center justify-start gap-x-[10px]">
						<div onClick={() => setOpen(true)} className="cursor-pointer">
							<BackArrowIcon />
						</div>
						<label className="text-base font-bold leading-6 -tracking-[0.3px] text-mine-shaft-4 ">
							{props?.data?.length} hedges found
						</label>
					</div>
				</div>
			</div>
			<div className="px-12 h-[493px]  w-[1140px] overflow-scroll">
				<BulkUploadHedgeList
					data={props?.data}
					headerList={headerList}
					stylesDataArray={stylesDataArray}
					headerKeys={headerKeys}
					errors={props.errors}
				/>
			</div>
			<div className="flex items-center justify-center py-3 rounded-xl text-base font-semibold leading-6 shadow-boxShadow">
				<PrimaryButton
					className="w-fit"
					onClick={async (e) => {
						if (!errors_exist) {
							await handleSaveBulkHedgeUpload();
							props.onAction(false);
						} else {
							setOpen(true);
						}
					}}
					buttonText={
						errors_exist ? "Edit and Re-Upload" : "Confirm and Import"
					}
				/>
			</div>
		</div>
	);
};

interface showHedgeListModalProps {
	callbackYes?: () => void;
	callbackNo?: () => void;
	data: any;
	ledgerId?: string | number;
	reloadCallback?: any;
	errors?: any;
}

const showHedgeListModal = async ({
	data,
	callbackYes,
	callbackNo,
	ledgerId,
	reloadCallback,
	errors = [],
}: showHedgeListModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		data: data,
		errors: errors,
		reloadCallback: reloadCallback,
		ledgerId: ledgerId,
		modalWrapperClasses:
			"self-end sm:self-auto w-full sm:w-fit   flex items-center justify-center",
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result && callbackYes) {
		callbackYes();
	} else {
		callbackNo && callbackNo();
	}
};
export default showHedgeListModal;
