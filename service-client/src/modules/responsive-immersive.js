// This component is an example of how to separate behavior by device category
// using 8th Wall Engine sessionAttributes
const responsiveImmersive = {
	init() {
		const onAttach = ({ sessionAttributes }) => {
			const camera = document.querySelector("a-camera");
			const s = sessionAttributes;
			if (
				!s.cameraLinkedToViewer &&
				!s.controlsCamera &&
				!s.fillsCameraTexture &&
				!s.supportsHtmlEmbedded &&
				s.supportsHtmlOverlay &&
				!s.usesMediaDevices &&
				!s.usesWebXr
			) {
				// Desktop-specific behavior goes here
				camera.setAttribute("xrextras-attach", {
					target: "character",
					offset: "0 3 3",
				});
				camera.setAttribute("rotation", "-30 0 0");
			}
		};
		const onxrloaded = () => {
			XR8.addCameraPipelineModules([{ name: "responsiveImmersive", onAttach }]);
		};
		window.XR8 ? onxrloaded() : window.addEventListener("xrloaded", onxrloaded);
	},
};

const responsiveImmersiveComponent = {
	name: "responsive-immersive",
	val: responsiveImmersive,
};

export { responsiveImmersiveComponent };
