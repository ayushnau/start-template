import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { BackArrowIcon } from "icons";
import { PrimaryButton, PrimaryInput } from "../../../..";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { SubTitle3 } from "../../../Typography";

const StartFreeTrailModal = React.forwardRef(
	({ callback, mobile, ...props }: any, ref: any) => {
		const form = useBetaForm({
			full_name: "",
			company_name: "",
			email_id: "",
		});

		const FormConstraints = z.object({
			email_id: z.string({ required_error: "Email ID is required" }).email(),
		});

		const validate = () => {
			FormConstraints.parse(form.value);
		};

		const activateButton = () => {
			if (
				form.value.full_name !== "" &&
				form.value.company_name !== "" &&
				form.value.email_id !== ""
			) {
				return true;
			} else false;
		};

		return (
			<div
				ref={ref}
				className={twMerge(
					"bg-white flex flex-col gap-y-3 transition-all pb-5 overflow-hidden",
					mobile
						? "w-[100vw] h-[378px] rounded-t-xl"
						: "w-[505px] h-[378px] rounded-xl",
				)}
			>
				<div className="flex items-center px-6 py-4 border-b border-mine-shaft-2 gap-x-3">
					<div onClick={() => props.onAction()}>
						<BackArrowIcon className="cursor-pointer" />
					</div>
					<label className="font-inter font-bold text-lg leading-6 -tracking-[0.3px]">
						Start 7-day FREE trial!
					</label>
				</div>
				<div className="flex flex-col justify-between h-full px-6 gap-y-4">
					<div className="flex flex-col gap-y-4">
						<PrimaryInput
							form={form}
							field="full_name"
							placeholder={{
								main: "Full Name",
							}}
						/>
						<PrimaryInput
							form={form}
							field="company_name"
							placeholder={{
								main: "Company Name",
							}}
						/>
						<div>
							<PrimaryInput
								form={form}
								field="email_id"
								placeholder={{
									main: "Email ID",
								}}
								errorMsg={form.errors.get("email_id")}
							/>
						</div>
					</div>
					<SubTitle3 classes="text-gray-400">
						Wiredup collects information solely for communication purposes. We
						adhere strictly to a policy of non-disclosure, ensuring that your
						information remains confidential and is not shared with any third
						party.
					</SubTitle3>
					<PrimaryButton
						className="absolute w-[90%] bottom-6"
						disabled={!activateButton()}
						buttonText="Submit"
						onClick={async () => {
							try {
								validate();
								callback && callback(form.value);
								props.onAction(true);
							} catch (error: any) {
								form.setErrors({
									email_id: "Invalid email! Please enter a valid email",
								});
							}
						}}
					/>
				</div>
			</div>
		);
	},
);

const showStartFreeTrailModal = async ({ callback, mobile = false }: any) => {
	let classes = "w-[505px] h-fit";
	if (mobile) {
		classes = "absolute bottom-0 w-full modalWrapperclasses";
	}
	const result = await HeadlessModal({
		component: StartFreeTrailModal,
		modalWrapperClasses: classes,
		backdropClasses: "bg-black bg-opacity-50",
		mobile: mobile,
		callback: callback,
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

export default showStartFreeTrailModal;
