import React from "react";

const colorData = [
	{
		background: "bg-spanish-yellow-1",
		text: "text-spanish-yellow-3",
	},
	{
		background: "bg-mountain-meadow-1",
		text: "text-mountain-meadow-3",
	},
	{
		background: "bg-[#E3F4FF]",
		text: "text-[#0099FF]",
	},
	{
		background: "bg-[#F1EEFF]",
		text: "text-[#7B61FF]",
	},
	{
		background: "bg-[#FFEDF2]",
		text: "text-[#E85A82]",
	},
];

interface IntialsWrapperProps {
	name: string;
}

const IntialsWrapper: React.FC<IntialsWrapperProps> = ({ name }) => {
	const initials = name.split(" ");
	const firstWord: any = initials[0];
	let secondWord: any = "";
	if (initials[1]) {
		secondWord = initials[1];
	}

	const currentNumber = Math.floor(Math.random() * 5);
	const bg = colorData[currentNumber].background;
	const text = colorData[currentNumber].text;

	return (
		<div
			className={`text-base font-semibold rounded-full flex items-center justify-center  w-[40px] h-[40px]  ${bg} ${text}`}
		>
			<span>{firstWord.charAt(0).toUpperCase()}</span>
			<span>{secondWord.charAt(0).toUpperCase()}</span>
		</div>
	);
};

export default IntialsWrapper;
