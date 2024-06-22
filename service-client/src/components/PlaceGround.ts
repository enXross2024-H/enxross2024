const TapPlaceComponent = {
	init() {
		const ground = document.getElementById("ground");
		ground?.addEventListener("click", (event) => {
			// Create new entity for the new object
			const newElement = document.createElement("a-entity");

			// The raycaster gives a location of the touch in the scene
			const touchPoint = event.detail.intersection.point;
			newElement.setAttribute("position", touchPoint);

			const randomYRotation = Math.random() * 360;
			newElement.setAttribute("rotation", `0 ${randomYRotation} 0`);

			newElement.setAttribute("visible", "false");
			newElement.setAttribute("scale", "0.02 0.02 0.02");

			newElement.setAttribute(
				"animation-mixer",
				"clip: Animation; loop: repeat",
			);

			newElement.setAttribute("gltf-model", "#ultraman-dance");
			this.el.sceneEl.appendChild(newElement);

			newElement.addEventListener("model-loaded", () => {
				// Once the model is loaded, we are ready to show it popping in using an animation
				newElement.setAttribute("visible", "true");
				newElement.setAttribute("animation", {
					property: "scale",
					to: "7 7 7",
					easing: "easeOutElastic",
					dur: 800,
				});
			});
		});
	},
};

const PlaceGroundComponents = { name: "tap-place", val: TapPlaceComponent };

export { PlaceGroundComponents };
