interface XR8 {
	version(): string;
	XrController: XR8.XrController;
}

declare const XR8: XR8;

interface Window {
	XR8: XR8;
}
