const summaryTabSetter = (value: string) => {
	localStorage.setItem("exportImportTabIndex", value);
};

const summaryTabGetter = () => {
	return JSON.stringify(localStorage.getItem("exportImportTabIndex"));
};

const summaryTabCleaner = () => {
	localStorage.removeItem("exportImportTabIndex");
};

export { summaryTabSetter, summaryTabGetter, summaryTabCleaner };
