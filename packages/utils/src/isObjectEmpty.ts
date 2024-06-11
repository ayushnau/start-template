const isObjectEmpty = (obj: Record<string, unknown>): boolean =>
	obj ? Object?.keys(obj).length === 0 : true;

export { isObjectEmpty };
