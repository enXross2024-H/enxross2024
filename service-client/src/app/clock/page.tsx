"use client";

import aframeRegister from "@/lib/aframeRegister";
import onXrLoaded from "@/lib/onXrLoaded";
import { playVpsAnimationComponent } from "@/modules/animation";
import { namedLocationComponent } from "@/modules/named-location";
import { shadowShaderComponent } from "@/modules/shadow-shader";
import { useEffect, useState } from "react";
import sceneHtml from "./scene.html";

export default function Clock() {
	const [appRendered, setAppRendered] = useState(false);
	const DISABLE_IMAGE_TARGETS = [];
	const [registeredComponents, setRegisterdComponents] = useState(
		new Set<string>(),
	);

	const onloaded = () => onXrLoaded({ xrCtrlConfigure: DISABLE_IMAGE_TARGETS });

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typeof window === "undefined") return;
		// Check Location Permissions at beginning of session
		const errorCallback = (error) => {
			if (error.code === error.PERMISSION_DENIED) {
				alert("LOCATION PERMISSIONS DENIED. PLEASE ALLOW AND TRY AGAIN.");
			}
		};
		navigator.geolocation.getCurrentPosition((pos) => {}, errorCallback);
		setAppRendered(true);

		aframeRegister({
			entities: [
				namedLocationComponent,
				playVpsAnimationComponent,
				shadowShaderComponent,
			],
			registered: registeredComponents,
			setter: setRegisterdComponents,
		});

		window.XR8 ? onloaded() : window.addEventListener("xrloaded", onloaded);
	}, [appRendered]);

	return (
		<>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: for 8thwall aframe */}
			{appRendered && <div dangerouslySetInnerHTML={{ __html: sceneHtml }} />}
		</>
	);
}
