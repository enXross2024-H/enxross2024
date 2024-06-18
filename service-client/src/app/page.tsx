"use client";

import "aframe";
import { PlaceGroundComponents } from "@/components/PlaceGround";
import aframeRegister from "@/lib/aframeRegister";
import { Entity, Scene } from "aframe-react";
import { useEffect } from "react";

export default function Home() {
	const DISABLE_IMAGE_TARGETS: any[] = [];
	const registeredComponents = new Set<string>();
	useEffect(() => {
		if (DISABLE_IMAGE_TARGETS) {
			const configureImageTargets = () => {
				XR8.XrController.configure({ DISABLE_IMAGE_TARGETS });
			};
			window.XR8
				? configureImageTargets()
				: window.addEventListener("xrloaded", configureImageTargets);
		}
		aframeRegister({
			entities: PlaceGroundComponents,
			registered: registeredComponents,
		});
	}, [DISABLE_IMAGE_TARGETS, registeredComponents]);

	return (
		<>
			<Scene
				tap-place
				landing-page="mediaSrc: https://media.giphy.com/media/UIQc7mECaH5nw0Y03Y/giphy.mp4"
				xrextras-loading
				xrextras-runtime-error
				renderer="antialias: true; colorManagement: true; physicallyCorrectLights: true;"
				xrweb="allowedDevices: any; defaultEnvironmentFloorScale: 0.25"
			>
				<Entity primitive="a-assets">
					{/* <Entity primitive="a-asset-item" id="treeModel" src="./tree.glb" /> */}
				</Entity>

				<Entity primitive="a-camera" position="0 8 0" look-controls>
					<Entity
						primitive="a-cursor"
						cursor={{ fuse: false, rayOrigin: "mouse" }}
						material={{ color: "white", shader: "flat", opacity: 0.75 }}
						geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
						raycaster={{
							objects: ".cantap",
						}}
					/>
				</Entity>

				<Entity
					primitive="a-entity"
					light={{ type: "directional", intensity: 0.8 }}
					position="1 4.3 2.5"
				/>

				<Entity primitive="a-light" type="ambient" intensity="1" />

				<Entity
					id="ground"
					class="cantap"
					geometry={{ primitive: "box" }}
					material={{ color: "#ffffff", transparent: true, opacity: 0.0 }}
					scale="1000 2 1000"
					position="0 -1 0"
				/>
			</Scene>
		</>
	);
}
