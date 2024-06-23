import * as THREE from "three";

const shootThanks = {
	init() {
		const camera = document.getElementById("camera");

		this.el.sceneEl.addEventListener("touchstart", (event) => {
			// Create element to be thrown, setting position, scale, and model
			const heart = document.createElement("a-entity");
			heart.setAttribute("position", camera.object3D.position);
			heart.setAttribute("scale", "5 5 5");
			heart.setAttribute("gltf-model", "#heartModel");
			heart.setAttribute("animation-mixer", {
				clip: "pulsating",
				loop: "repeat",
			});

			heart.setAttribute("rotation", { x: 0, y: 0, z: 0 });

			// Set velocity, rotated with camera direction
			const velocity = new THREE.Vector3(0, 10, -15);
			velocity.applyQuaternion(camera.object3D.quaternion);
			heart.setAttribute("velocity", velocity);

			// Add physics body
			heart.setAttribute("body", {
				type: "dynamic",
				sphereRadius: 0.5,
				shape: "sphere",
			});

			heart.setAttribute("shadow", {
				receive: false,
			});

			// Add heart to scene
			this.el.sceneEl.appendChild(heart);

			// The stoppedHeart is created at the same time as the thrown heart so
			// there is time to load the model before it hits the ground
			const stoppedHeartBase = document.createElement("a-entity");
			stoppedHeartBase.setAttribute("visible", "false");

			// The stoppedHeart consists of a model wrapped in an empty
			// parent so we can apply the correct scaling animation
			const stoppedHeart = document.createElement("a-entity");
			stoppedHeart.setAttribute("gltf-model", "#heartModel");
			stoppedHeart.setAttribute("scale", "5 5 5");
			stoppedHeartBase.appendChild(stoppedHeart);

			this.el.sceneEl.appendChild(stoppedHeartBase);

			let didCollide = false;
			heart.addEventListener("collide", (e) => {
				// Only want to do the stoppedHeart once, and with the ground only
				if (didCollide || e.detail.body.el.id !== "ground") {
					return;
				}
				didCollide = true;

				// Copy positioning of thrown heart to stoppedHeart
				stoppedHeartBase.object3D.position.copy(heart.object3D.position);
				stoppedHeart.object3D.rotation.copy(heart.object3D.rotation);

				stoppedHeartBase.object3D.visible = true;

				heart.setAttribute("visible", "false");

				// We can't remove the thrown heart until the physics step is over
				setTimeout(() => {
					heart.parentNode.removeChild(heart);
				}, 0);

				// After 2.5 seconds, shrink the splat away and delete it
				setTimeout(() => {
					stoppedHeartBase.setAttribute("animation__scale", {
						property: "scale",
						from: "1 1 1",
						to: "0.000001 0.000001 0.000001",
						dur: 1500,
						easing: "easeInQuad",
					});
					setTimeout(
						() => stoppedHeartBase.parentNode.removeChild(stoppedHeartBase),
						1500,
					);
				}, 2500);
			});
		});
	},
};

const shootThanksComponent = {
	name: "shoot-thanks",
	val: shootThanks,
};

export { shootThanksComponent };
