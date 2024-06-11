import React from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { SubTitle2, SubTitle3 } from "../../../Typography";
import { ChevronRight2 } from "icons";
import { clearTradesFilters ,setCurrentSelectedLedgerId} from "store";
import { useDispatch } from "react-redux";

export interface LedgerListItemInterface {
	item: any;
	isSelected?: boolean;
	tradeCount: any;
}

export const LedgerListItem: React.FC<LedgerListItemInterface> = ({
	item,
	isSelected = false,
	tradeCount,
}) => {
	const colorData = [
		{
			background: "bg-spanish-yellow-1",
			text: "text-spanish-yellow-3",
			border: "border-spanish-yellow-3",
			wrapper: twMerge(
				"hover:bg-spanish-yellow-1",
				isSelected ? "group-hover:bg-spanish-yellow-1" : "",
			),
		},
		{
			background: "bg-mountain-meadow-1",
			text: "text-mountain-meadow-3",
			border: "border-mountain-meadow-3",
			wrapper: twMerge(
				"hover:bg-mountain-meadow-1",
				isSelected ? "group-hover:bg-mountain-meadow-1" : "",
			),
		},
		{
			background: "bg-[#E3F4FF]",
			text: "text-[#0099FF]",
			border: "border-[#0099FF]",
			wrapper: twMerge(
				" hover:bg-[#E3F4FF]",
				isSelected ? "group-hover:bg-[#E3F4FF]" : "",
			),
		},
		{
			background: "bg-[#F1EEFF]",
			text: "text-[#7B61FF]",
			border: "border-[#7B61FF]",
			wrapper: twMerge(
				"hover:bg-[#F1EEFF]",
				isSelected ? "group-hover:bg-[#F1EEFF]" : "",
			),
		},
		{
			background: "bg-[#FFEDF2]",
			text: "text-[#E85A82]",
			border: "border-[#E85A82]",
			wrapper: twMerge(
				"hover:bg-[#FFEDF2]",
				isSelected ? "group-hover:bg-[#FFEDF2]" : "",
			),
		},
	];
	const [isMouseHovering, setIsMouseHovering] = React.useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initials = item?.dump?.name?.split(" ") || ["N", "A"];
	const firstWord: any = initials[0];
	let secondWord: any = "";
	if (initials[1]) {
		secondWord = initials[1];
	}

	const currentNumber = Math.floor(Math.random() * 5);
	const bg = colorData[currentNumber].background;
	const text = colorData[currentNumber].text;
	const border = colorData[currentNumber].border;
	const wrapperClasses = colorData[currentNumber].wrapper;

	return (
		<div
			key={item.id}
			id={item.id}
			className={twMerge(
				"flex justify-between gap-x-4 pr-2 cursor-pointer h-[56px] h-fit w-full text-wrap flex items-center rounded-lg transition-all",
				wrapperClasses,
			)}
			onClick={(e: any) => {
				navigate(`/fx-home/portfolio/ledger/${e.currentTarget.id}`);
				dispatch(setCurrentSelectedLedgerId(e.currentTarget.id))
				dispatch(clearTradesFilters());
			}}
			onMouseEnter={() => {
				setIsMouseHovering(true);
			}}
			onMouseLeave={() => {
				setIsMouseHovering(false);
			}}
		>
			<div
				className={twMerge(
					"flex items-center justify-center p-2 rounded-full",
					isSelected ? bg : "",
				)}
			>
				<div
					className={twMerge(
						"text-base font-semibold rounded-full flex items-center justify-center w-9 h-9 transition-all ease-in-out",
						bg,
						text,
						border,
						isSelected ? "bg-white border" : "",
						isMouseHovering ? "bg-white border" : "",
					)}
				>
					<span>{firstWord.charAt(0).toUpperCase()}</span>
					<span>{secondWord.charAt(0).toUpperCase()}</span>
				</div>
			</div>
			<div className="flex flex-col w-full py-2 cursor-pointer hidden group-hover:flex">
				<SubTitle2 classes="font-mine-shaft-4 cursor-pointer">
					{item.dump.name}
				</SubTitle2>
				<SubTitle3 classes="cursor-pointer">
					{isSelected
						? tradeCount + (+tradeCount === 1 ? " Trade" : " Trades")
						: item.active_trade_count +
						  (+item.active_trade_count === 1 ? " Trade" : " Trades")}
				</SubTitle3>
			</div>
			<ChevronRight2 />
		</div>
	);
};
