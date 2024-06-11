import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { WiredUpLogo, NavbarCrossIcon, ChevronDown2 } from "icons";
import {
	PrimaryButton,
	SecondaryButton,
	showStartFreeTrailModal,
} from "components";

const Modal = React.forwardRef((props: any, ref: any) => {
	const [showDropDown, setShowDropDown] = React.useState(false);

	return (
		<div className="w-full bg-white  flex items-center flex-col rounded-b-xl max-h-[100vh] overflow-y-scroll ">
			<div className="px-4 py-5 flex items-center justify-between  w-full">
				<div className="flex items-center justify-between ">
					<div>
						<WiredUpLogo />
					</div>
					<div className="font-[22.131px] font-bold leading-[31.869px] -tracking-[0.443px] font-mine-shaft-4 ml-[4.9px] ">
						WiredUp
					</div>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => {
						props.onAction(false);
					}}
				>
					<NavbarCrossIcon />
				</div>
			</div>
			<div className="  w-full">
				<ul className="items-start    flex flex-col ">
					<div className="w-full px-4 hover:bg-gray-200 cursor-pointer">
						<a href="#main">
							<li className="text-black  py-4  w-full whitespace-nowrap font-sm font-semibold leading-[22px]">
								Home
							</li>
						</a>
						<div className="w-full h-[1px] bg-mine-shaft-2"></div>
					</div>
					<div className="w-full px-4 hover:bg-gray-200 cursor-pointer">
						<a href="#centralize">
							<li
								onClick={() => {
									setShowDropDown((prev: any) => !prev);
								}}
								className="flex w-full py-4  rounded-xl items-center  text-black whitespace-nowrap font-sm font-semibold leading-[22px] relative group"
							>
								Solutions
							</li>
						</a>
						<div className="w-full h-[1px] bg-mine-shaft-2"></div>
					</div>

					<div className="w-full px-4 hover:bg-gray-200 cursor-pointer">
						<a href="#pricing">
							<li className="text-black  py-4  w-full whitespace-nowrap font-sm font-semibold leading-[22px]">
								Pricing
							</li>
						</a>
						<div className="w-full h-[1px] bg-mine-shaft-2"></div>
					</div>
					<div className="w-full   px-4 hover:bg-gray-200 cursor-pointer">
						<a href="#help">
							<li className="text-black  py-4  w-full whitespace-nowrap font-sm font-semibold leading-[22px]">
								WiredUp Connect
							</li>
						</a>
						<div className="w-full h-[1px] bg-mine-shaft-2"></div>
					</div>
					<div className="w-full   px-4 hover:bg-gray-200 cursor-pointer">
						<a href="#training">
							<li className="text-black  py-4  w-full whitespace-nowrap font-sm font-semibold leading-[22px]">
								WiredUp Academy
							</li>
						</a>
						<div className="w-full h-[1px] bg-mine-shaft-2"></div>
					</div>
					<div className="w-full   px-4 hover:bg-gray-200 cursor-pointer">
						<a href="#training">
							<li className="text-black  py-4  w-full whitespace-nowrap font-sm font-semibold leading-[22px]">
								Contact Us
							</li>
						</a>
						<div className="w-full h-[1px] bg-mine-shaft-2"></div>
					</div>
				</ul>
			</div>
			<div className="md:flex items-center w-full px-4 py-[30px] flex flex-col gap-y-3">
				<SecondaryButton
					className="px-4 py-3 text-base font-semibold leading-6 border border-mine-shaft-4"
					buttonText="Login"
					onClick={() => {
						window.open("/login", "_blank");
						props.onAction(false);
					}}
				/>
				<PrimaryButton
					className="px-4 py-3 text-base font-semibold leading-6 "
					buttonText="Start FREE Trial"
					onClick={() => {
						window.open("/login", "_blank");
						props.onAction(false);
					}}
				/>
			</div>
		</div>
	);
});

interface showNavbarModalProps {
	callbackYes?: () => void;
	callbackNo?: () => void;
	navigate?: Function;
}

const showNavbarModal = async ({
	callbackYes,
	callbackNo,
	navigate,
}: showNavbarModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: "self-start  w-full",
		navigate: navigate,
		animations: {
			modal: {
				initial: { opacity: 0, y: -400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -400 },
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

export default showNavbarModal;
