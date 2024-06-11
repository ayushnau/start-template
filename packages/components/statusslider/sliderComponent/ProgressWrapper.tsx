import React, { useContext } from "react";
import { ProgressWrapperInterface } from "./interfaces";

const ProgressWrapper = (props: ProgressWrapperInterface) => {
	return (
		<div
			key={"overlay" + props.index}
			className={`flex h-2 rounded-[10px] mx-1 mt-16 grow z-10 overflow-hidden
      ${props.progressContainerStyles}
       ${
					props.progressContainerColor
						? props.progressContainerColor
						: "bg-[#D3D3D3]"
				}`}
			style={{ ...styles.progress }}
		>
			{props.children}
		</div>
	);
};

const styles = {
	progress: {
		maxWidth: "100%",
	},
};

export default ProgressWrapper;
