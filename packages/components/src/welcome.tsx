import React from "react";
import { Link } from "react-router-dom";

const Welcome: React.FC<{}> = () => {
	return (
		<>
			<div className="h-full">
				<Link to="test">
					<h1 className="text-blue-500 text-3xl underline text-center">Body</h1>
				</Link>

				<p className="text-center font-bold">
					start building your new webapp test
				</p>
			</div>
			{/* <div className="w-screen h-screen bg-red-300"></div>  */}
		</>
	);
};

export default Welcome;
