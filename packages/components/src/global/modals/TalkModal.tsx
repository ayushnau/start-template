import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { BackArrowIcon, GreenCheck } from "icons";
import { PrimaryInput, PrimaryButton, SecondaryButton } from "components";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { contactUs } from "services";
import { UserValidation as User } from "services";
import { SubTitle3 } from "../../Typography";

const Modal = React.forwardRef((props: any, ref: any) => {
	const [showThanksBanner, setShowThanksBanner] = useState(false);
	const [validated, setValidated] = useState(false);
	const buyNowCallback = props?.buyNowCallback;

	const subscriptionData = props?.subscriptionData?.full;
	const form = useBetaForm({
		full_name: subscriptionData?.full_name || "",
		company_name: subscriptionData?.company_name || "",
		email: subscriptionData?.email_id || "",
		mobile_number: subscriptionData?.mobile_number || "",
		type: buyNowCallback ? "payment_enquiry" : "call_request",
		user_uuid: props.user_uuid || "",
	});

	useEffect(() => {
		const isValid = User.safeParse(form.value);
		if (isValid.success) {
			setValidated(true);
		} else {
			setValidated(false);
		}
	}, [form.value]);

	const handleContactFormSubmit = async () => {
		try {
			buyNowCallback && buyNowCallback(form.value);
			const response = await contactUs(form.value);
			if (response) {
				setShowThanksBanner(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return showThanksBanner ? (
		<div className="w-full sm:w-[505px] border  bg-white sm:rounded-b-xl rounded-t-xl px-[85px] py-[78px]  flex flex-col items-center ">
			<GreenCheck />
			<div className="text-[25px] text-center font-bold leading-[34px] -tracking-[0.5px] mt-2 mb-1 text-black">
				Thanks for reaching out!
			</div>
			<p className="text-sm text-center font-normal leading-[22px] mb-6 text-mine-shaft-3">
				One of our executive will get back to you in next 48 hours
			</p>
			<SecondaryButton
				className="border text-mine-shaft-4 border-mine-shaft-4 "
				buttonText="Close"
				onClick={() => {
					props.onAction(false);
				}}
			/>
		</div>
	) : (
		<div className="w-full sm:w-[505px] border  bg-white sm:rounded-b-xl rounded-t-xl pb-[60px] sm:pb-[0]">
			<div className="border-b">
				<div className="px-6 py-5 flex items-center text-base font-bold leading-6 -tracking-[0.3px]">
					<div
						onClick={() => props.onAction(false)}
						className="mr-[10px] cursor-pointer"
					>
						<BackArrowIcon />
					</div>
					<div>Talk to us</div>
				</div>
			</div>
			<div className="flex flex-col p-6 gap-y-4">
				<PrimaryInput
					classNames="leading-[22px] "
					value={form.value.full_name !== "" ? form.value.full_name : ""}
					form={form}
					field={"full_name"}
					fieldType={"string"}
					placeholder={{
						main: "Full name",
					}}
				/>
				<PrimaryInput
					classNames="leading-[22px] "
					value={form.value.company_name !== "" ? form.value.company_name : ""}
					form={form}
					field={"company_name"}
					fieldType={"string"}
					placeholder={{
						main: "Company name",
					}}
				/>
				<PrimaryInput
					classNames="leading-[22px] "
					value={form.value.email !== "" ? form.value.email : ""}
					form={form}
					field={"email"}
					fieldType={"string"}
					placeholder={{
						main: "Email ID",
					}}
				/>
				<PrimaryInput
					classNames="leading-[22px] "
					value={
						form.value.mobile_number !== "" ? form.value.mobile_number : ""
					}
					form={form}
					field={"mobile_number"}
					fieldType={"string"}
					inputMode="decimal"
					numberOnly
					placeholder={{
						main: "Phone Number",
					}}
				/>
				<SubTitle3 classes="text-gray-400">
					Wiredup collects information solely for communication purposes. We
					adhere strictly to a policy of non-disclosure, ensuring that your
					information remains confidential and is not shared with any third
					party.
				</SubTitle3>
				<PrimaryButton
					disabled={!validated}
					buttonText="Submit"
					onClick={() => {
						handleContactFormSubmit();
					}}
				/>
			</div>
		</div>
	);
});

interface TalkToUsModalInterface {
	user_uuid?: string;
	mobile_number?: string;
	buyNowCallback?: (form_values: any) => void;
	subscriptionData?: any;
}

const TalkModal = async ({
	user_uuid,
	mobile_number,
	buyNowCallback,
	subscriptionData = {},
}: TalkToUsModalInterface) => {
	await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit ",
		user_uuid: user_uuid,
		mobile_number: mobile_number,
		subscriptionData: subscriptionData,
		buyNowCallback: buyNowCallback,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
};

export default TalkModal;
