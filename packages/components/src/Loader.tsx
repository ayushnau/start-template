import React from "react";
import LoadingScreen from "../../../apps/wiredup/src/pages/login/LoadingScreen";

interface LoaderProps {
	isLoading: boolean;
	successComponent: any;
	loadingText?: string;
	loadingClasses?: string;
}

const Loader: React.FC<LoaderProps> = ({
	isLoading,
	successComponent,
	loadingText = "",
	loadingClasses = "",
}) => {
	return (
		<>
			{isLoading ? (
				<LoadingScreen
					loadingText={loadingText}
					loadingClasses={loadingClasses}
				/>
			) : (
				successComponent
			)}
		</>
	);
};
export default Loader;
