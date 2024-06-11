import React from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { CurrencyPairFlags } from "components";
import EditIcon from "icons/EditIcon";
import RightSideIcon from "icons/RightSideIcon";
import { ButtonBidAndAsk, PrimaryButton } from "components";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import DropdownListIcon from "icons/DropdownListIcon";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon, ArrowIcon } from "icons";

interface RateCalculatorFormProps {
	form: any;
	setShowInfoContent: Function;
	handleTypeSelect: Function;
	applyInputClickStyle: boolean;
	setShowDateSlide: Function;
	dateShown: string;
	handleCalculateRate: Function;
	CalculateRateBtnColor: string;
	setShowResult: Function;
	setShowSelectCurrencyPair: Function;
	setApplyInputClickStyle: Function;
	setShowHelperText: Function;
	showHelperText: boolean;
	setNavigationTabSwitch?: Function;
}

const RateCalculatorForm: React.FC<RateCalculatorFormProps> = ({
	form,
	setShowInfoContent,
	handleTypeSelect,
	applyInputClickStyle,
	setShowDateSlide,
	dateShown,
	handleCalculateRate,
	CalculateRateBtnColor,
	setShowResult,
	setShowSelectCurrencyPair,
	setApplyInputClickStyle,
	setShowHelperText,
	showHelperText,
	setNavigationTabSwitch,
}) => {
	return (
		<div className="">
			<ReuseInputGroup
				onClick={() => {
					setShowResult(false);
					setShowSelectCurrencyPair(true);
				}}
				onChange={() => {
					// console.log("handleChange");
				}}
				wrapperClasses="w-full rounded-xl mt-4"
				className={`${
					form.getField("pair") ? "pl-[52px]" : "pl-4"
				} pr-4 py-3  text-mine-shaft-4 text-base font-normal rounded-xl border-[1px] h-[56px] border-[#D9D9D9] `}
				placeholder={
					!form.getField("pair")
						? "Select currency pair e.g: USD/INR"
						: undefined
				}
				prefix={
					<span className="absolute left-4 top-1/2 -translate-y-1/2">
						{form.getField("pair") && (
							<div className="flex flex-row items-center justify-center">
								<div className="pr-3">
									<CurrencyPairFlags flagpair={form.getField("pair")} />
								</div>
								{`${form.getField("pair").split("/")[0]}`}
								<ArrowIcon className="mx-1" />
								{`${form.getField("pair").split("/")[1]} `}
							</div>
						)}
					</span>
				}
				suffix={
					form.getField("pair") ? (
						<div
							onClick={() => {
								setShowResult(false);
								setShowSelectCurrencyPair(true);
							}}
						>
							<EditIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
						</div>
					) : (
						<button
							onClick={() => {
								setShowResult(false);
								setShowSelectCurrencyPair(true);
							}}
							className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 "
						>
							<RightSideIcon />
						</button>
					)
				}
			/>
			<ReuseInputGroup
				wrapperClasses="w-full rounded-xl  mt-4 h-[56px] py-0"
				value={form.getField("pair") && form.getField("amount")}
				onChange={(e: any) => {
					if (!isNaN(e.target.value)) {
						form.setField("amount", e.target.value);
					} else {
						alert("please enter the valid number");
					}
				}}
				onClick={() => {
					if (!form.getField("pair")) {
						alert("Please select the currency flag first");
					} else {
						setApplyInputClickStyle(true);
						setShowHelperText(true);
						setNavigationTabSwitch && setNavigationTabSwitch(false);
					}
				}}
				inputMode="decimal"
				helperText={
					showHelperText
						? getCurrencySymbol(form.getField("pair").split("/")[0])
						: ""
				}
				helperStyles={
					showHelperText
						? "absolute bottom-2 left-4 font-normal text-base text-mine-shaft-3"
						: ""
				}
				className={`  ${
					applyInputClickStyle ? "py-0 pt-4 pr-3 pl-8 " : "py-2 px-4"
				} text-blackDark text-base font-normal h-[56px] bg-[#F3F3F3] appearance-none rounded-xl border-0 shadow-sm   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black`}
				placeholder={`Enter amount ${
					form.getField("pair").split("/")[0]
						? `(${form.getField("pair").split("/")[0]})`
						: ""
				}`}
				prefix={
					applyInputClickStyle && (
						<>
							<div className="absolute top-2 left-4 h-6 text-xs font-normal text-">
								Enter Amount {`(`}
								{form.getField("pair").split("/")[0]}
								{`)`}
							</div>
						</>
					)
				}
				suffix={
					<button className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex">
						<span
							onClick={() => setShowInfoContent(true)}
							className="cursor-pointer text-[24px] text-mine-shaft-3 pr-1"
						>
							<IIcon
								color={"#717171"}
								// pathStyles={"scale-110 bg-red-300"}
								// svgStyles={"span h-2 bg-red-200"}
							/>
						</span>
					</button>
				}
			/>
			{form.errors.get("amount") ? (
				<div className="flex flex-row items-center pt-2 ">
					<img
						className="w-[14.67px] h-[14.67px] top-[0.67px] left-[0.67px]"
						src="https://wiredup-staging.imgix.net/eef90e8a-56de-4797-b18b-6782ed95d88d?auto=compress,format"
					/>
					<label className="w-full text-red-600 text-sm text-[14px] pl-2">
						Please enter the amount
					</label>
				</div>
			) : (
				""
			)}
			<div className="flex items-center justify-between mt-4">
				<ButtonBidAndAsk
					onClickAsk={() => handleTypeSelect("ask")}
					onClickBid={() => handleTypeSelect("bid")}
					classNameAsk={`flex items-center rounded-full font-normal text-xs  ml-[6px] ${
						form.getField("type") === "ask"
							? "bg-mine-shaft-4 text-white hover:bg-mine-shaft-4 hover:text-white"
							: "bg-white text-mine-shaft-4 hover:bg-white hover:text-mine-shaft-4 border border-mine-shaft-2"
					}`}
					classNameBid={`flex items-center rounded-full  font-normal text-xs ${
						form.getField("type") === "bid"
							? "bg-mine-shaft-4 text-white hover:bg-mine-shaft-4 hover:text-white"
							: "bg-white text-mine-shaft-4 hover:bg-white hover:text-mine-shaft-4 border border-mine-shaft-2"
					}`}
				/>
				<ReuseButton
					buttonSuffix={
						<span className="ml-[6px]">
							<DropdownListIcon />
						</span>
					}
					onClick={() => setShowDateSlide(true)}
					className={`flex items-center rounded-full text-blackDark bg-[#F3F3F3] hover:bg-[#F3F3F3]`}
				>
					{dateShown}
				</ReuseButton>
			</div>

			<PrimaryButton
				onClick={() => handleCalculateRate()}
				buttonText="Calculate Rate"
				className={`mt-4 text-textColorGray 
    ${
			CalculateRateBtnColor == "mine-shaft-2"
				? " hover:bg-mine-shaft-2  bg-mine-shaft-2"
				: "bg-cornflower-blue-2 hover:bg-cornflower-blue-2 text-white"
		}
   `}
			/>
		</div>
	);
};

export default RateCalculatorForm;
