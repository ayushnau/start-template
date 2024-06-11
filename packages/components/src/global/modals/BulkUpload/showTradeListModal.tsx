import React, { useEffect, useState } from "react";
import { BackArrowIcon } from "icons";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BulkUploadTradeList from "./BulkUploadTradeList";
import { PrimaryButton, showBulkUploadModal } from "components";
import ConfirmationModal from "./ConfirmationModal";
import { bulkUpload } from "services";
import { useParams } from "react-router-dom";

const Modal = (props: any) => {
	const { onAction, disableOutsideClick, setDisableOutsideClick } = props;
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const errors = props.errors;
	const errors_exist = Object.keys(errors).length > 0;

	const headerList = [
		"Serial No.",
		"Trade type",
		"Currency pair",
		"Receivable/Payable date",
		"Invoice value",
		"Benchmark rate",
		"Bank Name",
		"Invoice number (optional)",
		"Counterparty name (optional)",
	];
	const headerKeys = [
		"trade_type",
		"currency_pair",
		"maturity_date",
		"trade_amount",
		"benchmark_rate",
		"bank_name",
		"cp_invoice_number",
		"cp_name",
	];

	const stylesDataArray = [
		"w-[55px] max-w-[55px]",
		"w-[62px] max-w-[62px]",
		"w-[77px] max-w-[77px]",
		"w-[140px] max-w-[140px]",
		"w-[74px] max-w-[74px]",
		"w-[90px] max-w-[90px]",
		"w-[90px] max-w-[90px]",
		"w-[134px] max-w-[134px]",
		"w-[168px] max-w-[168px]",
	];

	const reloadCallback = props?.reloadCallback;

	const handleCallBulkUploadModal = async (tradesCount: any) => {
		const response = await showBulkUploadModal({
			showSuccess: true,
			tradesNumber: tradesCount,
			reloadCallback: reloadCallback,
		});
	};
	const handleSaveBulkTradeUpload = async () => {
		const payload = { trades_list: props?.data, ledger_id: props.ledgerId };

		try {
			setIsLoading(true);
			const response: any = await bulkUpload(payload);
			if (response.success) {
				handleCallBulkUploadModal(response?.tradesSaved);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={
				"relative bg-white rounded-xl h-[628px] w-screen max-w-[1060px] overflow-scroll"
			}
		>
			<ConfirmationModal
				setOpen={setOpen}
				open={open}
				closeTradeListModal={props.onAction}
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
							{props?.data?.length} Trades found
						</label>
					</div>
				</div>
			</div>
			<div className="px-10 h-[493px]  w-[1060px] overflow-scroll">
				<BulkUploadTradeList
					data={props?.data}
					errors={props.errors}
					headerList={headerList}
					stylesDataArray={stylesDataArray}
					headerKeys={headerKeys}
				/>
			</div>
			<div className="flex items-center justify-center py-3 rounded-xl text-base font-semibold leading-6 shadow-boxShadow">
				<PrimaryButton
					className="w-fit"
					onClick={async (e) => {
						if (!errors_exist) {
							await handleSaveBulkTradeUpload();
						}
						props.onAction(false);
					}}
					buttonText={
						errors_exist ? "Edit and Re-Upload" : "Confirm and Import"
					}
				/>
			</div>
		</div>
	);
};

interface showTradeListModalProps {
	data: any;
	ledgerId?: string | number;
	reloadCallback?: any;
	errors: any;
}

const showTradeListModal = async ({
	data,
	ledgerId,
	reloadCallback,
	errors = [],
}: showTradeListModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		data: data,
		errors: errors,
		ledgerId: ledgerId,
		modalWrapperClasses:
			"self-end sm:self-auto w-full sm:w-fit   flex items-center justify-center",
		reloadCallback: reloadCallback,
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

export default showTradeListModal;
