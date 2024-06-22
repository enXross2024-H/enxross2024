interface onXrLoadedParams {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	xrCtrlConfigure?: any[];
}

const onXrLoaded = ({ xrCtrlConfigure = [] }: onXrLoadedParams) => {
	window.XR8.XrController.configure(xrCtrlConfigure);
	console.log("XR8 loaded!");
};

export default onXrLoaded;
