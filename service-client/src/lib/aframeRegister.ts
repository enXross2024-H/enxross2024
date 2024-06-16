import type { INamedObject } from "@/types/aframe";

// biome-ignore lint/suspicious/noExplicitAny: any is needed for A-Frame in 8th wall
declare let AFRAME: any; /**
 *
 * @param entities A-Frame entities (components or primitives) to register
 * @param registered Set of already registered entities
 * @description Helper function to make sure that aframe components are only registered once, since they can't be cleanly unregistered.
 */
const aframeRegister = ({
	entities,
	registered,
}: { entities: INamedObject[]; registered: Set<string> }) => {
	for (const { name, val } of entities) {
		if (registered.has(name)) {
			return;
		}
		registered.add(name);
		AFRAME.registerComponent(name, val);
	}
};

export default aframeRegister;
