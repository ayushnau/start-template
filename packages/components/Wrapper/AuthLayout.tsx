import React from "react";

const Layout: React.FC<React.ReactNode> = (children) => {
	return <div className="overflow-hidden">{children}</div>;
};

export default Layout;
