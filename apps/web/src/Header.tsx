import React, { FC } from "react";
import WiredUpLogo from "./icons/WiredUpLogo";

const Header: FC = (props) => {
	// console.log(window.location, "location is");

	return (
		<div>
			{window.location.pathname !== "/" ? (
				<div className="h-32 flex items-center pl-8 ">
					<WiredUpLogo className="h-[36px] w-[150px]" />
				</div>
			) : (
				<div className="flex h-fit w-fit justify-center items-center my-custom-class">
					<WiredUpLogo className="h-[61px] w-[208px]" />
				</div>
			)}
		</div>
	);
};

export default Header;
