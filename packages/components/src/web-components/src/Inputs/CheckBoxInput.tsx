import React from "react";

export interface CheckBoxInputInterface {
	id: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	defaultSelected?: boolean;
	text?: string;
	disabled?: boolean;
}

const CheckBoxInput: React.FC<CheckBoxInputInterface> = ({
	id,
	onChange,
	defaultSelected = false,
	text = "",
	disabled = false,
}) => {
	const style: any = {
		"--tw-ring-offset-width": `0px`,
	};
	return (
		<div className="flex flex-row gap-x-2">
			<input
				type="checkbox"
				className="h-6 w-6 rounded-md cursor-pointer border-2 border-mine-shaft-2 checked:bg-black hover:checked:bg-black hover:bg-white focus:checked:bg-black focus:bg-white ring-0 focus:ring-0"
				id={id}
				name={id}
				value={id}
				onChange={onChange}
				style={style}
				checked={defaultSelected}
				disabled={disabled}
			/>
			{text ? (
				<div
					className={`font-inter font-xs ${
						disabled ? "cursor-not-allowed" : ""
					}`}
				>
					{text}
				</div>
			) : null}
		</div>
	);
};

export default CheckBoxInput;
