import React from "react";
import { twMerge } from "tailwind-merge";

export interface DividerInterface {
	marginTop?: string;
	marginBottom?: string;
	color?: string;
	styles?: string;
}

const Divider: React.FC<DividerInterface> = ({
	marginTop = "",
	marginBottom = "",
	color = "border-mine-shaft-2",
	styles = "w-full border-b",
}) => {
	return <div className={twMerge(styles, marginBottom, marginTop, color)} />;
};

export default Divider;
