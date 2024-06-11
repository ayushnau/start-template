import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { twMerge } from "tailwind-merge";
import {
	ContactUsIcon,
	LogoutIcon,
	ProfileIcon,
	SubscriptionIcon,
	PrivacyPolicyIcon,
	TnCIcon,
} from "icons";
import { PrimaryButton } from "../../..";
import { UserSubscriptionType } from "interfaces";
import moment from "moment";

const AccountsWebModal = React.forwardRef((props: any, ref: any) => {
	const end_date = props?.subscription_details?.end_date;
	const mobile_number = props.userDetails?.mobile_full?.mobile_number;
	const contactUsCallback = props?.contactUsCallback;
	const subscriptionCallback = props?.subscriptionCallback;
	const subscriptionStatus = props?.subscriptionStatus;
	const subscriptionEndDate =
		moment(new Date(end_date))?.format("Do MMM 'YY") || "NA";
	const startFlow = props?.handleStartSubscriptionsFlow;
	const logoutCallback = props?.logoutCallback;

	const BuyButton = () => {
		return (
			<PrimaryButton
				className="h-8 px-4 py-3 w-fit whitespace-nowrap rounded-lg"
				onClick={(event) => {
					event.stopPropagation();
					event.preventDefault();
					startFlow && startFlow();
				}}
				buttonText="Buy Plan"
			/>
		);
	};

	const SubscriptionEndDate = () => {
		return (
			<label className="px-2 py-1 rounded-md whitespace-nowrap bg-mine-shaft-1 font-inter text-xs font-bold leading-4 text-color-black-6">{`Till ${subscriptionEndDate}`}</label>
		);
	};

	const OPTIONSLIST = [
		{ icon: <ProfileIcon />, label: "Profile", subLabel: mobile_number || "" },
		{
			icon: <SubscriptionIcon />,
			label: "Subscription",
			buyButton:
				subscriptionStatus !== "active" ? (
					<BuyButton />
				) : (
					<SubscriptionEndDate />
				),
			action: subscriptionStatus === "active" && subscriptionCallback,
		},
		{ icon: <ContactUsIcon />, label: "Contact Us", action: contactUsCallback },
		{
			icon: <TnCIcon />,
			label: "Terms & Condition",
			action: () => {
				window.open("/terms-and-conditions", "_blank");
			},
		},
		{
			icon: <PrivacyPolicyIcon />,
			label: "Privacy Policy",
			action: () => {
				window.open("/privacy-policy", "_blank");
			},
		},
		{ icon: <LogoutIcon />, label: "Log Out", action: logoutCallback },
	];

	return (
		<div className="w-[375px] h-fit rounded-xl border bg-white shadow-menu px-2 py-2 flex flex-col">
			{OPTIONSLIST.map((ele: any, index: number) => {
				return (
					<React.Fragment key={index}>
						<div
							className={twMerge(
								"flex gap-x-4 rounded-sm hover:bg-mine-shaft-1 px-2",
								index === 0 ? "py-2" : "py-4",
							)}
							onClick={() => {
								if (ele.action) {
									ele.action();
									props.onAction(false);
								}
							}}
						>
							<div className="flex items-center justify-center">{ele.icon}</div>
							<div className="flex flex-col justify-center w-full">
								<label
									className={twMerge(
										"font-inter font-semibold leading-[22px]",
										ele.label === "Log Out"
											? "text-sunset-orange-2"
											: "text-black",
									)}
								>
									{ele.label}
								</label>
								{ele.subLabel && (
									<label className="font-inter text-sm leading-[18px] text-color-black-6">
										{ele.subLabel}
									</label>
								)}
							</div>
							{ele.buyButton && ele.buyButton}
						</div>
						{index < OPTIONSLIST.length - 1 && (
							<div className="border-b border-mine-shaft-2 w-[300px] ml-12 mr-2 my-[2px]" />
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
});

interface showAccountModalProps {
	userDetails: any;
	subscriptionStatus: UserSubscriptionType;
	closeMenu?: () => void;
	contactUsCallback?: () => void;
	subscriptionCallback: () => void;
	handleStartSubscriptionsFlow?: () => void;
	logoutCallback: () => void;
	subscription_details?: any;
}

const showAccountsModal = async ({
	userDetails,
	subscriptionStatus,
	closeMenu,
	contactUsCallback,
	subscriptionCallback,
	handleStartSubscriptionsFlow,
	logoutCallback,
	subscription_details,
}: showAccountModalProps) => {
	await HeadlessModal({
		component: AccountsWebModal,
		backdropClasses: "bg-transparent",
		modalWrapperClasses: "absolute top-[50px] right-4",
		userDetails: userDetails,
		contactUsCallback: contactUsCallback,
		subscriptionCallback: subscriptionCallback,
		handleStartSubscriptionsFlow: handleStartSubscriptionsFlow,
		subscriptionStatus: subscriptionStatus,
		subscription_details: subscription_details,
		logoutCallback: logoutCallback,
		animations: {
			modal: {
				initial: { opacity: 0, x: 400 },
				animate: { opacity: 1, x: 0 },
				exit: { opacity: 0, x: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	closeMenu && closeMenu();
};

export default showAccountsModal;
