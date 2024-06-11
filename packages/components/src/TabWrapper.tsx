import React, { useState, ReactNode, useEffect } from "react";
import { BackArrowIcon } from "icons";
import { twMerge } from "tailwind-merge";
import { UpdatePrompt } from "components";
import moment from "moment";

interface Tab {
	label: string;
	activeTabName: string;
	component: ReactNode;
}

interface TabWrapperProps {
	scrollView?: boolean;
	tabs: Tab[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
	changeTab?: string;
	secondTab?: React.ReactNode;
	handleBack?: () => void;
	headerText?: string;
	web?: boolean;
	time?: any;
	updateAction?: () => void;
	callback?: (tabName?: string) => void;
	enabledScrollView?: boolean;
}

const TABWIDTHOBJECT = {
	summary: { first: "w-full", second: "w-1/2" },
	ledger: { first: "w-full", second: "w-0" },
	trade: { first: "w-full", second: "w-0" },
	hedges: { first: "w-full", second: "w-0" },
	eefc: { first: "w-full", second: "w-0" },
	pcfc: { first: "w-full", second: "w-0" },
	pcre: { first: "w-full", second: "w-0" },
	fcnr: { first: "w-full", second: "w-0" },
	bs: { first: "w-full", second: "w-0" },
};

type SelectedTabKeys = keyof typeof TABWIDTHOBJECT;

const TabWrapper: React.FC<TabWrapperProps> = ({
	tabs,
	activeTab,
	setActiveTab,
	secondTab,
	changeTab,
	handleBack,
	headerText,
	web = false,
	time = moment(new Date()).tz("Asia/Calcutta").format("DD MMM’YY, hh:mmA"),
	updateAction = () => {},
	callback,
	enabledScrollView = true,
}) => {
	useEffect(() => {
		if (changeTab) {
			setActiveTabComponent(
				tabs.find((i) => i.activeTabName === changeTab)?.component ||
					tabs[0].component,
			);
		}
	}, [changeTab]);

	const handleTabChange = (tab: Tab) => {
		setActiveTab(tab.activeTabName);
		setActiveTabComponent(tab.component);
		callback && callback(tab.activeTabName);
	};
	const [activeTabComponent, setActiveTabComponent] = useState(
		tabs.find((i) => i.activeTabName === activeTab)?.component ||
			tabs[0].component,
	);

	return (
		<div className="relative h-full overflow-hidden flex flex-col">
			{headerText && handleBack ? (
				<>
					<div className="pl-5 pt-6" onClick={handleBack}>
						<BackArrowIcon />
					</div>
					<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark px-3 mt-6">
						{headerText}
					</div>
				</>
			) : null}

			<div className="flex justify-between items-center border-mine-shaft-2 border-b-[1px]">
				<div
					className={twMerge(
						`flex items-center py-3 mx-5 ${
							enabledScrollView ? "overflow-x-auto no-scrollbar" : null
						}`,
						web ? "" : "mt-2",
					)}
					style={{ maxWidth: "100%" }}
				>
					{tabs.map((tab) => (
						<div
							key={tab.activeTabName}
							className={`${
								enabledScrollView ? "flex-none h-7" : null
							} relative cursor-pointer text-base font-semibold font-inter leading-[22px] mr-6 ${
								activeTab === tab.activeTabName
									? "text-blackDark after:content-['after content'] after:absolute after:-bottom-3 after:left-0 after:w-full after:bg-mine-shaft-4 after:rounded-t after:h-1"
									: "text-mine-shaft-3"
							}`}
							onClick={() => handleTabChange(tab)}
						>
							{tab.label}
						</div>
					))}
				</div>
				<div className={twMerge(web ? "" : "hidden")}>
					<UpdatePrompt
						className="bg-white my-0 flex items-center"
						showClock
						clockClasses="text-xl"
						updateAction={() => {
							updateAction && updateAction();
						}}
						time={time}
					/>
				</div>
			</div>

			<div className="flex w-full h-full overflow-hidden ">
				<div
					className={twMerge(
						"h-full w-full border-r transition-all",
						web
							? TABWIDTHOBJECT[
									activeTab.toLowerCase() as unknown as SelectedTabKeys
							  ]?.first
							: "",
						activeTab.toLowerCase(),
					)}
				>
					{activeTabComponent}
				</div>
				{web && (
					<div
						className={twMerge(
							"w-1/2 h-full overflow-y-scroll scrollbar-hide",
							TABWIDTHOBJECT[
								activeTab.toLowerCase() as unknown as SelectedTabKeys
							]?.second,
						)}
					>
						{secondTab}
					</div>
				)}
			</div>
		</div>
	);
};

export default TabWrapper;
