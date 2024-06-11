import React from "react";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";

export interface AuthCardWrapperInterface {
	children?: React.ReactNode;
	className?: string;
}

const AuthCardWrapper: React.FC<AuthCardWrapperInterface> = ({
	children,
	className,
}) => {
	const { pathname } = useLocation();
	return (
		<div
			className={twMerge(
				" w-[400px] min-h-[425px]  border rounded-xl p-8 rounded-3xl shadow-box flex flex-col",
				pathname === "/success" ? "" : "relative",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default AuthCardWrapper;
