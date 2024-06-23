const playVpsAnimation = {
	init() {
		const overlayHidden = () => {
			this.el.setAttribute("animation-mixer", {
				clip: "*",
				loop: "repeat",
				crossFadeDuration: 0.4,
			});
		};

		const overlayVisible = () => {
			this.el.setAttribute("animation-mixer");
		};

		window.XR8.addCameraPipelineModule({
			name: "vps-coaching-overlay-listen",
			listeners: [
				{ event: "vps-coaching-overlay.hide", process: overlayHidden },
				{ event: "vps-coaching-overlay.show", process: overlayVisible },
			],
		});
	},
};

const playVpsAnimationComponent = {
	name: "play-vps-animation",
	val: playVpsAnimation,
};

export { playVpsAnimationComponent };
