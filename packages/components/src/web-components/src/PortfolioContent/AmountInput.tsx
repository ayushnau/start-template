import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { PrimaryInput } from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { SubTitle3 } from "../../../Typography";
import { Warning, WarningIcon } from "icons";
import { TriangleIcon } from "icons";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
export interface AmountInputInterface {
	form?: any;
	reset?: any;
	hedgeDetails?: any;
	firstElement?: any;
	isLinkedElement?: any;
	isModalActive?: any;
	tradeDetails?: any;
	eefcDetails?: any;
	pcfcDetails?: any;
	errorStates?: any;
}

const AmountInput: React.FC<AmountInputInterface> = ({
	form,
	reset,
	hedgeDetails,
	firstElement,
	isLinkedElement = true,
	isModalActive,
	tradeDetails,
	eefcDetails,
	pcfcDetails,
	errorStates = ["The amount cant be Greater than available/remaining amount"],
}) => {
	const inputForm = useBetaForm({
		amount: "",
	});
	const params = useParams();
	const { eefcId } = params;
	const eefcListvalue = useSelector((state: any) => {
		if (eefcId) return state.portfolioEEFCsList.eefcList[eefcId];
	});
	useEffect(() => {
		if (reset) {
			inputForm.setField("amount", "");
			resetRef.current = true;
		}
	}, [reset]);
	const handleSetError = (isError: boolean, type: any) => {
		if (isError) {
			const errorObject =
				type === "linkAmountError"
					? {
							amount:
								"Amount to be used cannot be greater than the available  amount",
					  }
					: type === "unhedgedAmountError"
					? {
							amount:
								"Unlinked hedge can't be used for remaining trade, as linked hedge is not used fully.",
					  }
					: {
							amount: type,
					  };
			inputForm.setErrors(errorObject);
			form.setErrors(errorObject);
		} else {
			inputForm.forgetErrors();
			form.forgetErrors();
		}
	};
	const validateAmount = () => {
		if (isLinkedElement) {
			if (
				+inputForm.value.amount > +hedgeDetails?.link_amount &&
				+inputForm.value.amount > 0
			) {
				handleSetError(true, "linkAmountError");
			} else {
				handleSetError(false, "linkAmountError");
			}
		} else {
			if (
				+inputForm.value.amount > +eefcDetails?.remaining_amount ||
				+inputForm.value.amount > +hedgeDetails?.unlinked_amount ||
				+inputForm.value.amount > +tradeDetails?.remaining_amount ||
				+inputForm.value.amount > +pcfcDetails?.remaining_amount
			) {
				handleSetError(true, errorStates[0]);
			} else if (
				+inputForm.value.amount > +hedgeDetails?.unlinked_amount &&
				+inputForm.value.amount > 0
			) {
				handleSetError(true, "linkAmountError");
			} else if (+inputForm.value.amount > +tradeDetails?.unhedged_amount) {
				handleSetError(true, "unhedgedAmountError");
			} else {
				handleSetError(false, "linkAmountError");
			}
		}
	};
	useEffect(() => {
		validateAmount();
		form.setField("amount", inputForm.value.amount);
	}, [inputForm.value]);

	const resetRef = useRef<any>(false);
	return (
		<div key={"input"} className="relative">
			{inputForm?.errors?.errors?.amount ? (
				<div
					className={twMerge(
						"absolute -right-[53px] bg-bean-red-dark p-2 gap-x-2 rounded-lg text-white flex items-start z-50 h-fit",
						firstElement
							? "top-12"
							: "-translate-y-[calc(100%+14px)]  top-[0px] ",
					)}
				>
					<WarningIcon className=" " color="#fff" />
					<SubTitle3 classes=" flex items-center justify-center text-white w-[213px] whitespace-normal">
						{inputForm?.errors?.errors?.amount}
					</SubTitle3>
					<div
						className={twMerge(
							"absolute  right-[110px]",
							firstElement ? "rotate-[180deg] -top-[9px]" : "-bottom-[9px]",
						)}
					>
						<TriangleIcon />
					</div>
				</div>
			) : null}

			<PrimaryInput
				resetRef={resetRef}
				wrapperClasses="w-[130px] h-8 border-red-200 rounded-lg "
				classNames={twMerge(
					"rounded-lg focus:ring-2 text-sm font-normal leading-[22px] bg-color-black-1",
				)}
				form={inputForm}
				value={""}
				prefix={getCurrencySymbol(form?.value.amount_currency)}
				prefixBottomClasses={twMerge("bottom-1")}
				overrideClassnames="px-4 focus:pl-8 focus:pr-3"
				field="amount"
				fieldType={"number"}
				inputMode="decimal"
				placeholder="Amount"
				disabled={isModalActive}
				numberOnly
			/>
		</div>
	);
};

export default AmountInput;
