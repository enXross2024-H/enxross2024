const mainMenuComponent = {
	init() {
		const menuBtn = document.getElementById("menu");
		const sceneName = this.getAttribute("data-scene");
		this.moveToAr = () => {
			const startAr = new CustomEvent("startar", {
				detail: { name: sceneName },
			});
			window.dispatchEvent(startAr);
		};

		this.el.setAttribute("vps-coaching-overlay", {
			wayspotName: window._startAR ? window._startAR.title : null,
			hintImage: window._startAR ? window._startAR.imageUrl : null,
		});

		menuBtn.addEventListener("click", this.moveToAr);
	},
};

export { mainMenuComponent };

// document.addEventListener('DOMContentLoaded', () => {
//   const entries = document.querySelectorAll('#wayspots-view .entry')

//   entries.forEach((entry) => {
//     entry.addEventListener('click', () => {
//       const sceneName = this.getAttribute('data-scene')
//       if (sceneName) {
//         const event = new CustomEvent('startar', {detail: {name: sceneName}})
//         window.dispatchEvent(event)
//       }
//     })
//   })
// })
