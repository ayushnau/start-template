import React from "react";
import PrimaryButton from "../../global/buttons/PrimaryButton";
import { User, ChevronDown2, WiredUpLogo, Hamburger } from "icons";
import {
	showNavbarModal,
	SecondaryButton,
	showStartFreeTrailModal,
} from "components";
import { useNavigate } from "react-router-dom";

const NavbarHome = () => {
	const navigate = useNavigate();
	const handleNavbarModalOpen = async () => {
		await showNavbarModal({
			navigate: navigate,
		});
	};

	return (
		<div id="nav" className="mx-5 py-6 relative">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-start text-sm">
					<div className="cursor-pointer" onClick={() => navigate("/")}>
						<WiredUpLogo />
					</div>
					<div
						onClick={() => navigate("/")}
						className="text-[22.131px] font-bold leading-[31.869px]  cursor-pointer -tracking-[0.443px] font-mine-shaft-4 ml-[4.9px] "
					>
						WiredUp
					</div>
					<div>
						<ul className="md:flex items-center ml-12 gap-x-5 xl:gap-x-12  hidden">
							<a href="#centralize">
								<li className="flex items-center gap-x-[3px] text-black whitespace-nowrap font-normal font-semibold leading-[22px] relative group">
									Solutions
								</li>
							</a>
							<a href="#pricing">
								<li className="text-black whitespace-nowrap font-normal font-semibold leading-[22px]">
									Pricing
								</li>
							</a>
							<a href="#help">
								<li className="text-black whitespace-nowrap font-normal font-semibold leading-[22px]">
									WiredUp Connect
								</li>
							</a>
							<a href="#training">
								<li className="text-black whitespace-nowrap font-normal font-semibold leading-[22px]">
									WiredUp Academy
								</li>
							</a>
						</ul>
					</div>
				</div>
				<div className="md:flex hidden items-center ">
					<SecondaryButton
						onClick={() => {
							window.open("/login", "_blank");
						}}
						buttonText="Login"
						className="mr-4 lg:mr-8 cursor-pointer p-0 border-none text-sm font-semibold leading-[22px] text-mine-shaft-4 hover:bg-transparent hover:text-cornflower-blue-2 hover:outline-0"
					/>

					<PrimaryButton
						className="px-4 py-3 text-sm bg-cornflower-blue-2 rounded-lg lg:flex hidden text-white mr-5 whitespace-nowrap font-semibold leading-[22px] h-8 "
						buttonText="Start FREE Trial"
						onClick={() => {
							window.open("/login", "_blank");
						}}
					/>
				</div>
				<div
					onClick={() => handleNavbarModalOpen()}
					className="md:hidden block"
				>
					<Hamburger />
				</div>
			</div>
		</div>
	);
};

export default NavbarHome;
