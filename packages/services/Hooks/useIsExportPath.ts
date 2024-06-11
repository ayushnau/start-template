import { useLocation } from "react-router-dom";

const useIsExportPath = () => {
	const location = useLocation();
	let isExportPath = null;

	if (location.pathname.includes("export-quote-evaluation")) {
		isExportPath = true;
	} else {
		isExportPath = false;
	}

	return { isExportPath };
};

export { useIsExportPath };
