import { createBrowserRouter } from "react-router-dom";

import { Welcome } from "components";

export default createBrowserRouter([
	{
		path: "/",
		element: <Welcome />,
		errorElement: <div>Error Page</div>,
	},
	{
		path: "/test",
		element: <div>Test route</div>,
	},
	{
		path: "/test/:id",
		element: <div>Test route with id</div>,
	},
]);
