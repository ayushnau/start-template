import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
	TnCIcon,
	SubscriptionIcon,
	ContactUsIcon,
	ProfileIcon,
	PrivacyPolicyIcon,
	LogoutIcon,
	InviteIcon,
	DeleteAccount,
} from "icons";
import { PrimaryButton, showFreeTrialSelectedModal } from "components";
import {
	useSubscriptionFlowHook,
	createUserSubscription,
	updateUserSubscription,
	deleteUser,
} from "services";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	clearUserForm,
	clearUserSubscriptionData,
	clearWebHomeScreen,
	clearAllUserData,
	StoreState,
} from "store";
import { showDeleteConfirmationModal } from "components";
import { getMobileOperatingSystem, isObjectEmpty } from "utils";

export interface AccountInterface {
	setNavigationTabSwitch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Account: React.FC<AccountInterface> = ({ setNavigationTabSwitch }) => {
	const { subscriptionStatus, startSubscriptionFlow } = useSubscriptionFlowHook(
		{ mobile: true },
	);
	const ref = React.useRef<boolean | null>(null);
	const env = import.meta.env.VITE_ENVIRONMENT || process.env.VITE_ENVIRONMENT;
	const userDetails = useSelector((state: any) => state?.user);
	const user_uuid = userDetails?.form?.userid;
	const subscriptionDetails = userDetails?.subscriptionData;

	const mobile_number =
		userDetails?.userDetails?.mobile_full?.mobile_number || "";
	const subscriptionEndDate = userDetails?.subscriptionData?.end_date || "NA";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const MessageString =
		"I’m inviting you to use WiredUp, a simple and secure payments app by Google. Please download app using below link:";

	const tempLogoutAction = async () => {
		dispatch(clearWebHomeScreen());
		dispatch(clearAllUserData());
		handleUserLogout();
	};

	const currentState = useSelector((state: StoreState) => {
		return state;
	});

	const startFreeTrailCallback = async (values: any) => {
		const payload = {
			user_uuid: user_uuid,
			plan_name: "trial",
			status: "active",
			data: {
				trial_period: "7 days",
				plan_duration: "7 days",
				plan_cost: "Free",
				...values,
			},
		};
		const response = await createUserSubscription(payload);
		if (response) {
			const closed = await showFreeTrialSelectedModal({});
			if (closed) {
				window.location.reload();
			}
		}
	};

	const showDeleteModal = async () => {
		await showDeleteConfirmationModal({
			title: "Delete Account?",
			description: "Are You Sure You Want to Delete the Account.",
			callbackYes: handleDeleteUser,
			makeModalFull: false,
		});
	};
	const showLogoutModal = async () => {
		await showDeleteConfirmationModal({
			title: "Are you sure you want to logout?",
			callbackYes: tempLogoutAction,
			makeModalFull: false,
		});
	};

	const handleDeleteUser = async () => {
		const response: any = await deleteUser();
		if (response.status === 200) tempLogoutAction();
	};

	const buyNowUpdateOrCreateSubscriptionCallback = async (form_values: any) => {
		if (isObjectEmpty(subscriptionDetails)) {
			const create_new_payload: any = {
				user_uuid: user_uuid,
				plan_name: "trial",
				status: "inactive",
				data: {
					trial_period: "0 days",
				},
			};
			if (form_values?.email) {
				create_new_payload["data"]["email_id"] = form_values.email;
			}
			if (form_values?.company_name) {
				create_new_payload["data"]["company_name"] = form_values.company_name;
			}
			if (form_values?.mobile_number) {
				create_new_payload["data"]["mobile_number"] = form_values.mobile_number;
			}
			const create_new_response = await createUserSubscription(
				create_new_payload,
			);
		} else {
			const subscription_uuid = subscriptionDetails?.uuid;
			const update_payload: any = {
				user_uuid: user_uuid,
				plan_name: "trial",
				status: "inactive",
				data: {
					trial_period: "0 days",
				},
			};
			if (form_values?.email) {
				update_payload["data"]["email_id"] = form_values.email;
			}
			if (form_values?.company_name) {
				update_payload["data"]["company_name"] = form_values.company_name;
			}
			if (form_values?.mobile_number) {
				update_payload["data"]["mobile_number"] = form_values.mobile_number;
			}
			const update_response = await updateUserSubscription(
				subscription_uuid,
				update_payload,
			);
		}
	};

	// todo : This Component is not working when using directly.Need to find the fix for this.
	const BuyButton = () => {
		return (
			<PrimaryButton
				className="h-8 px-4 py-3 w-fit whitespace-nowrap rounded-lg"
				onClick={(event) => {
					event.stopPropagation();
					startSubscriptionFlow(
						async (values) => {
							await startFreeTrailCallback(values);
						},
						async (values: any) => {
							await buyNowUpdateOrCreateSubscriptionCallback(values);
						},
					);
				}}
				buttonText="Buy Plan"
			/>
		);
	};

	const contactNavigation = () => {
		navigate("contact-us");
	};

	const subscriptionNavigation = () => {
		navigate("subscription");
	};

	const SubscriptionEndDate = () => {
		return (
			<label className="px-2 py-1 rounded-md whitespace-nowrap bg-mine-shaft-1 font-inter text-xs font-bold leading-4 text-color-black-6">{`Till ${subscriptionEndDate}`}</label>
		);
	};

	const handleUserLogout = () => {
		if (window?.ReactNativeWebView) {
			window?.ReactNativeWebView?.postMessage?.(
				JSON.stringify({
					type: "logout",
				}),
			);
		}
	};

	const handleShareClick = () => {
		if (window?.ReactNativeWebView) {
			window?.ReactNativeWebView?.postMessage?.(
				JSON.stringify({ type: "share", message: MessageString }),
			);
		}
	};

	const user_agent_string = getMobileOperatingSystem();

	const OPTIONSLIST = [
		{
			icon: <ProfileIcon />,
			label: "My Account",
			subLabel: mobile_number || "",
		},
		{
			icon: <SubscriptionIcon />,
			label: "Subscription",
			action: subscriptionStatus === "active" ? subscriptionNavigation : null,
			buyButton:
				subscriptionStatus !== "active" ? (
					<PrimaryButton
						className="h-8 px-4 py-3 w-fit whitespace-nowrap rounded-lg"
						onClick={(event) => {
							event.stopPropagation();
							startSubscriptionFlow(
								async (values) => {
									await startFreeTrailCallback(values);
								},
								async (values: any) => {
									await buyNowUpdateOrCreateSubscriptionCallback(values);
								},
							);
						}}
						buttonText="Buy Plan 2"
					/>
				) : (
					<SubscriptionEndDate />
				),
		},
		{
			icon: <InviteIcon />,
			label: "Invite friends",
			action: handleShareClick,
		},
		{
			icon: <ContactUsIcon />,
			label: "Contact Us",
			action: contactNavigation,
		},
		{
			icon: <TnCIcon />,
			label: "Terms & Condition",
			action: () => navigate("/terms-and-conditions"),
		},
		{
			icon: <PrivacyPolicyIcon />,
			label: "Privacy Policy",
			action: () => navigate("/privacy-policy"),
		},
		{
			icon: <DeleteAccount />,
			label: "Delete Account",
			action: showDeleteModal,
		},
		{ icon: <LogoutIcon />, label: "Log Out", action: showLogoutModal },
	];

	return (
		<div>
			<div className="w-full flex px-4 py-2 items-center border-mine-shaft-2">
				{/* <div
          className="cursor-pointer"
          onClick={() => {
            handleBack();
          }}
        >
          <BackArrowIcon />
        </div> */}
				<label className="ml-4 font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
					Profile
				</label>
			</div>

			<div className="px-5 mt-2">
				{OPTIONSLIST.map((ele: any, index: number) => {
					return (
						<React.Fragment key={index}>
							<div
								className={twMerge(
									"flex rounded-xl gap-x-4 px-2",
									index === 0 ? "py-2" : "py-4",
								)}
								onClick={() => {
									if (ele.action) {
										ele.action();
									}
								}}
							>
								<div className="flex items-center justify-center">
									{ele.icon}
								</div>
								<div
									className={twMerge(
										"flex flex-col justify-center w-full",
										ele.subLabel ? "flex-row justify-between" : "",
									)}
								>
									<label
										className={twMerge(
											"font-inter font-semibold leading-[22px]",
											ele.label === "Log Out" || ele.label == "Delete Account"
												? "text-sunset-orange-2"
												: "text-black",
										)}
									>
										{ele.label}
									</label>
									{ele.subLabel && (
										<label className="font-inter text-sm font-normal leading-[22px] text-color-black-6 ">
											{ele.subLabel}
										</label>
									)}
								</div>
								{ele.buyButton && ele.buyButton}
							</div>
							{index < OPTIONSLIST.length - 1 && (
								<div className="border-b border-mine-shaft-2 w-[calc(100% - 56px)] ml-12 mr-2 my-[2px]" />
							)}
						</React.Fragment>
					);
				})}
				{env === "staging" ? (
					<div className="flex flex-col gapy-2">
						<label className="text-sm">{user_agent_string}</label>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Account;
