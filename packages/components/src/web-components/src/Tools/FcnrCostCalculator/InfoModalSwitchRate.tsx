import React,{useState,useEffect} from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { BackArrowIcon } from "icons";
import { twMerge } from "tailwind-merge";
import { PrimaryButton, PrimaryInput } from "../../../../..";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { SubTitle1, SubTitle2 } from "../../../../Typography";;


const Modal = React.forwardRef(
	({ content, web = false, header, hedge_rate,hedge_value_placeholder,draw_down_placeholder,draw_down_placeholder_header, ...props }: any, ref: any) => {
		const form = useBetaForm({
			hedge_rate_form: hedge_value_placeholder,
			drawdown_rate_form:draw_down_placeholder,
		});
		const handleHedgeUpdate = async () => {
			props.onAction(form.value.hedge_rate_form);
		}
		const handleDrawDownUpdate=async()=>{
			props.onAction(form.value.drawdown_rate_form);
		}
	
		const [disabled, setDisabled] = useState(true);
		useEffect(() => {
			if (
				form.getField("hedge_rate_form") != "" &&
				form.getField("drawdown_rate_form") != ""
			) {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
		}, [form]);
		return (
			<div
				ref={ref}
				className={twMerge(
					"bg-white flex flex-col gap-y-3 transition-all",
					web
						? "w-[500px] max-h-[600px] h-fit rounded-xl"
						: "w-full max-h-[80vh] h-fit rounded-t-xl",
				)}
			>
				<div className="px-6 py-5 border-b w-full h-fit">
					<div
						className="cursor-pointer"
						onClick={() => {
							if (props.setState) {
								props.setState(false);
							}
							props.onAction(false);
						}}
					>
						<div className="flex">
							<BackArrowIcon />
							{header ? <SubTitle1 classes="font-bold pl-2 leading-4">{header}</SubTitle1> : <></>}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-y-6 px-6 pb-6 overflow-y-scroll">
					{hedge_rate === true ? (
						<>
							<SubTitle2 classes="pl-2 text-color-black-6">
								{content[0].title}
							</SubTitle2>
							<PrimaryInput
								onChange={(e) => {
									if (isNaN(e.target.value.replaceAll(",", ""))) {
										alert("Please enter number only");
									}
								}}
								form={form}
								value={form.value.hedge_rate_form}
								field="hedge_rate_form"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Hedge Rate",
								}}
							/>
							<PrimaryButton
								className="disabled:hover:bg-semiLightGray"
								disabled={disabled}
								onClick={() => {
									handleHedgeUpdate();
								}}
								buttonText="Update"
							/>
						</>
					) : (
						<>
							<PrimaryInput
								onChange={(e) => {
									if (isNaN(e.target.value.replaceAll(",", ""))) {
										alert("Please enter number only");
									}
								}}
								form={form}
								value={form.value.drawdown_rate_form}
								field="drawdown_rate_form"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: draw_down_placeholder_header
										? draw_down_placeholder_header
										: "Drawdown Rate",
								}}
							/>
							<PrimaryButton
								className="disabled:hover:bg-semiLightGray"
								disabled={disabled}
								onClick={() => {
									handleDrawDownUpdate();
								}}
								buttonText="Update"
							/>
						</>
					)}
				</div>
			</div>
		);
	},
);

interface showInfoModalProps {
	content: any;
	web?: boolean;
	showState?: Function;
	header?: any;
	hedge_rate: boolean;
	hedge_value_placeholder?: any;
	draw_down_placeholder?:any;
	draw_down_placeholder_header?:any;
}
const InfoModalSwitchRate: (
	props: showInfoModalProps,
) => Promise<void | unknown> = async ({
	content,
	web,
	showState = () => {},
	header,
	hedge_rate,
	hedge_value_placeholder,
	draw_down_placeholder,
	draw_down_placeholder_header,
}: any) => {
	let classes = "absolute bottom-0 w-full modalWrapperclasses";
	if (web) {
		classes = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		modalWrapperClasses: classes,
		component: Modal,
		backdropClasses: twMerge("bg-black bg-opacity-50 ", web ? "z-[9999]" : ""),
		content: content,
		web: web,
		header: header,
		showState: showState,
		hedge_rate: hedge_rate,
		hedge_value_placeholder:hedge_value_placeholder,
		draw_down_placeholder:draw_down_placeholder,
		draw_down_placeholder_header: draw_down_placeholder_header,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result) {
		return result;
	}
};

export default InfoModalSwitchRate;
