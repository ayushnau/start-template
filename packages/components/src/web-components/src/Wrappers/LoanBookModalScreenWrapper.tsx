import React from "react";
import { twMerge } from "tailwind-merge";
import {LoanBookSecondaryRouter} from "components"
import { useModalNavigation } from "services";

export interface LoanBookModalScreenWrapperInterface {
	children: React.ReactNode;
}

const LoanBookModalScreenWrapper: React.FC<
	LoanBookModalScreenWrapperInterface
> = ({ children }) => {
	const { displayModalScreen, closeModalScreen } = useModalNavigation();

	return (
		<div className="w-full ">
			<div
				className={twMerge(
					"fixed z-[999] top-0 left-0 w-[100vw] h-[100vh] pointer-event-none flex ",
					displayModalScreen
						? "opacity-100 pointer-events-auto transition-opacity duration-300 ease-in-out"
						: "opacity-0 pointer-events-none hidden",
				)}
			>
				<div className="h-screen w-[525px] min-w-[525px] bg-white opacity-100 order-last">
					<LoanBookSecondaryRouter />
				</div>
				<div
					className="h-screen w-full bg-black opacity-50 cursor-pointer"
					onClick={(e) => {
						e.stopPropagation();
						closeModalScreen();
					}}
				/>
			</div>
			{children}
		</div>
	);
};

export default LoanBookModalScreenWrapper;
