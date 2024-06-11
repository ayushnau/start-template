import React, { useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { GainIcon, HandleIcon, RiskIcon } from "icons";
import { PrimaryButton, UnderlineButton } from "../../..";
import CurrencyPairBadge from "./CurrencyPairBadge";
import FilterBadge from "./FilterBadge";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { removeTrailingCommas } from "utils";
import FilterBadgePair from "./FilterBadgePair";
import moment from "moment";
import { twMerge } from "tailwind-merge";

interface FilterModalInterface {
	callbackApply?: (result: any) => void;
	callbackNo?: () => void;
	makeModalFull?: boolean;
	filterFormValues?: any;
	dateList?: any;
	web?: boolean;
}

interface ModalInterface {
	filterFormValues: any;
	monthList: any;
	onAction: (v: boolean) => void;
	dateList: any;
	web?: boolean;
}

const FilterModal = React.forwardRef((props: ModalInterface, ref: any) => {
	const dateList = props.dateList;

	const [empty, setEmpty] = useState<any>(false);

	const form = useBetaForm({
		maturity_months: props.filterFormValues.maturity_months,
	});

	const addOrRemoveMaturityMonth = (month: string) => {
		if (form.value.maturity_months.includes(month)) {
			form.setField(
				"maturity_months",
				removeTrailingCommas(
					form.value.maturity_months
						.split(",")
						.filter((ele: string) => ele !== month)
						.join(","),
				),
			);
		} else {
			form.setField(
				"maturity_months",
				removeTrailingCommas(
					form.value.maturity_months.split(",").concat(month).join(","),
				),
			);
		}
	};

	const web = props?.web || false;

	return (
		<div
			ref={ref}
			className={twMerge(
				"bottom-0 bg-white flex flex-col items-center pt-3 transition-all  h-fit ",
				web ? "w-full rounded-xl" : "w-screen rounded-t-xl max-h-[96vh]",
			)}
		>
			{!web && (
				<div
					className={"w-fit h-fit cursor-pointer "}
					onClick={() => {
						props.onAction(false);
					}}
				>
					<HandleIcon />
				</div>
			)}
			<div className="w-full flex flex-col items-start justify-start pt-3 gap-y-2">
				<div
					id="filters_heading"
					className="flex flex-1 justify-between items-center px-5 py-2 border-b w-full"
				>
					<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
						Filter
					</label>
					<label
						className="font-inter font-semibold leading-[22px] py-3 text-blackDark hover:bg-transparent underline "
						onClick={() => {
							setEmpty(new Date());
							form.setField("trade_type", "");
							form.setField("currency_pairs", "");
							form.setField("maturity_months", "");
							form.setField("risk_or_gain", "");
							form.setField("risk_coverage", "");
						}}
					>
						Clear
					</label>
				</div>
				<div className="flex flex-col px-5 py-2 gap-y-5">
					<div id="maturity_months_section" className="">
						<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
							Trade maturity month
						</label>
						<div className="flex flex-wrap gap-x-2 gap-y-2 py-2 w-full">
							{dateList.map((date: any, index: number) => {
								return (
									<FilterBadge
										reset={empty}
										active={form.value.maturity_months.includes(date.label)}
										onClickCallback={() => {
											addOrRemoveMaturityMonth(date.label);
										}}
										key={date.label + index}
									>{`${moment(date.label)
										.startOf("month")
										.format("MMM")} '${moment(date.label).format("YY")}   (${
										date.count
									})`}</FilterBadge>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-x-4 w-full px-5 py-3 shadow-boxShadow">
				<PrimaryButton
					buttonText={"Cancel"}
					className="bg-white text-blackDark hover:bg-transparent border border-blackDark rounded-xl"
					onClick={() => {
						props.onAction(false);
					}}
				/>
				<PrimaryButton
					buttonText={"Apply"}
					onClick={() => {
						props.onAction(form.value);
					}}
				/>
			</div>
		</div>
	);
});

const showFilterModalLinkableHedges = async ({
	makeModalFull,
	callbackApply,
	callbackNo,
	dateList,
	filterFormValues,
	web = false,
}: FilterModalInterface) => {
	let classes = "absolute bottom-0 w-full modalWrapperclasses";
	if (web) {
		classes = "w-[505px] h-[600px]";
	}
	const result = await HeadlessModal({
		component: FilterModal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		fillValues: {
			makeModalFull: makeModalFull,
		},
		web: web,
		modalWrapperClasses: classes,
		filterFormValues: filterFormValues,
		dateList: dateList,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result && callbackApply) {
		callbackApply(result);
	} else {
		callbackNo && callbackNo();
	}
};

export default showFilterModalLinkableHedges;
