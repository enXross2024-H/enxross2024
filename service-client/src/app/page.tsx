"use client";

import aframeRegister from "@/lib/aframeRegister";
import onXrLoaded from "@/lib/onXrLoaded";
import { characterMoveComponent } from "@/modules/character-movement";
import { navMeshComponent } from "@/modules/nav-mesh";
import { nowPositionComponent } from "@/modules/now-position";
import { responsiveImmersiveComponent } from "@/modules/responsive-immersive";
import { useEffect, useState } from "react";
import sceneHtml from "./scene.html";

export default function Home() {
	const [appRendered, setAppRendered] = useState(false);
	const DISABLE_IMAGE_TARGETS = [];
	const [registeredComponents, setRegisterdComponents] = useState(
		new Set<string>(),
	);

	const onloaded = () => onXrLoaded({ xrCtrlConfigure: DISABLE_IMAGE_TARGETS });

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typeof window === "undefined") return;
		setAppRendered(true);

		aframeRegister({
			entities: [
				characterMoveComponent,
				navMeshComponent,
				nowPositionComponent,
				responsiveImmersiveComponent,
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
