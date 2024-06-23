const nowPosition = {
	init() {
		this.locationText = document.getElementById("location-text");
		this.currentLocationEntity = document.getElementById("current-location");
		this.mapElement = document.getElementById("map-element"); // マップ要素を取得

		// 地図の範囲を設定します（例: 緯度と経度の範囲）
		this.MAP_LONGITUDE_MIN = 139.5; // マップの最小経度
		this.MAP_LONGITUDE_MAX = 140.5; // マップの最大経度
		this.MAP_LATITUDE_MIN = 35.5; // マップの最小緯度
		this.MAP_LATITUDE_MAX = 36.5; // マップの最大緯度

		// 地図の幅と高さを設定
		this.mapWidth = 20; // マップの幅（a-imageの幅と一致するように設定）
		this.mapHeight = 20; // マップの高さ（a-imageの高さと一致するように設定）
		// this.mapElement.setAttribute('height', `${this.mapHeight}`)
		// this.mapElement.setAttribute('width', `${this.mapWidth}`)

		this.latitude = 0.0;
		this.longitude = 0.0;

		// 地図の座標範囲に基づいて現在地の位置を計算
		this.xPos = 0.0;
		this.yPos = 0.0;

		// ズーム機能の初期化
		this.initialDistance = 0.0;
		this.initialScale = 1.0;
		this.el = window;
		this.el.addEventListener("touchstart", (e) => this.onTouchStart(e), false);
		this.el.addEventListener("touchmove", (e) => this.onTouchMove(e), false);
	},

	// 2本指でタッチした場合の処理
	onTouchStart(e) {
		if (e.touches.length === 2) {
			this.locationText.setAttribute("value", "two");
			this.initialDistance = this.getDistance(e.touches);
			this.initialScale = this.mapElement.object3D.scale.x; // 現在のスケールを取得
			// this.initialScale = this.mapElement.style.transform ? parseFloat(this.mapElement.style.transform.match(/scale\(([^)]+)\)/)[1]) : 1;
		}
	},

	// 2本指を動かした場合の処理
	onTouchMove(e) {
		if (e.touches.length === 2) {
			this.locationText.setAttribute("value", "two-move");
			e.preventDefault(); // 既定の動作を無効化
			const currentDistance = this.getDistance(e.touches);
			const scale =
				this.initialScale * (currentDistance / this.initialDistance);
			this.mapElement.object3D.scale.set(scale, scale, scale); // マップのスケールを設定
			this.currentLocationEntity.object3D.scale.set(scale, scale, scale); // 現在地のスケールを設定
			this.updateCurrentLocation(scale); // スケールに合わせて現在地の位置を更新
		}
	},

	// 指の間の距離を計算
	getDistance(touches) {
		const [touch1, touch2] = touches;
		const dx = touch1.pageX - touch2.pageX;
		const dy = touch1.pageY - touch2.pageY;
		return Math.sqrt(dx * dx + dy * dy);
	},

	// 地図のスケールが変化した際に、現在地を変化後の地図に適応させる
	updateCurrentLocation(scale) {
		// 現在地の位置を再計算
		this.xPos =
			((this.longitude - this.MAP_LONGITUDE_MIN) /
				(this.MAP_LONGITUDE_MAX - this.MAP_LONGITUDE_MIN)) *
				this.mapWidth -
			this.mapWidth / 2;
		this.yPos =
			((this.latitude - this.MAP_LATITUDE_MIN) /
				(this.MAP_LATITUDE_MAX - this.MAP_LATITUDE_MIN)) *
				this.mapHeight -
			this.mapHeight / 2;

		// スケールに合わせて位置を調整
		this.currentLocationEntity.setAttribute(
			"position",
			`${this.xPos * scale} ${this.yPos * scale} -10`,
		);
	},

	update() {
		if (navigator.geolocation) {
			console.log("Geolocation is supported.");

			// 位置情報の変化を監視
			navigator.geolocation.watchPosition(
				(position) => {
					console.log("Position obtained:", position);

					this.latitude = position.coords.latitude;
					this.longitude = position.coords.longitude;

					// 地図の座標範囲に基づいて現在地の位置を計算
					this.xPos =
						((this.longitude - this.MAP_LONGITUDE_MIN) /
							(this.MAP_LONGITUDE_MAX - this.MAP_LONGITUDE_MIN)) *
							this.mapWidth -
						this.mapWidth / 2;
					this.yPos =
						((this.latitude - this.MAP_LATITUDE_MIN) /
							(this.MAP_LATITUDE_MAX - this.MAP_LATITUDE_MIN)) *
							this.mapHeight -
						this.mapHeight / 2;

					// 現在地の位置を更新
					this.currentLocationEntity.setAttribute(
						"position",
						`${this.xPos} ${this.yPos} -10`,
					); // マーカーの位置をマップと同じ平面上に設定

					// 位置情報をテキストで表示
					this.locationText.setAttribute(
						"value",
						`xPos: ${this.xPos.toFixed(6)}, yPos: ${this.yPos.toFixed(6)}`,
					);
					console.log(
						"Location updated:",
						`Latitude: ${this.latitude.toFixed(6)}, Longitude: ${this.longitude.toFixed(6)}`,
					);
				},
				(error) => {
					console.error("Geolocation error:", error);
					this.locationText.setAttribute("value", `Error: ${error.message}`);
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 27000,
				},
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
			this.locationText.setAttribute("value", "Geolocation not supported");
		}
	},
};

const nowPositionComponent = {
	name: "now-position",
	val: nowPosition,
};

export { nowPositionComponent };

/*
const nowPosition = {
  init() {
    this.locationText = document.getElementById('location-text')
    this.currentLocationEntity = document.getElementById('current-location')

    // 地図の範囲を設定します（例: 緯度と経度の範囲）
    // this.MAP_LONGITUDE_MIN = 35.48573762272706; // マップの最小経度
    // this.MAP_LONGITUDE_MAX = 35.48573762272746; // マップの最大経度
    // this.MAP_LATITUDE_MIN = 139.64890891255152; // マップの最小緯度
    // this.MAP_LATITUDE_MAX = 139.64890891255192; // マップの最大緯度

    this.MAP_LONGITUDE_MIN = 139; // マップの最小経度
    this.MAP_LONGITUDE_MAX = 140; // マップの最大経度
    this.MAP_LATITUDE_MIN = 35; // マップの最小緯度
    this.MAP_LATITUDE_MAX = 36; // マップの最大緯度

    this.MAP_LONGITUDE_MIN = 139.5; // マップの最小経度
    this.MAP_LONGITUDE_MAX = 140.5; // マップの最大経度
    this.MAP_LATITUDE_MIN = 35.5; // マップの最小緯度
    this.MAP_LATITUDE_MAX = 36.5; // マップの最大緯度



    // 地図の幅と高さを設定
    this.mapWidth = 20; // マップの幅（a-imageの幅と一致するように設定）
    this.mapHeight = 20; // マップの高さ（a-imageの高さと一致するように設定）

    this.latitude = 0.0;
    this.longitude = 0.0;

    // 地図の座標範囲に基づいて現在地の位置を計算
    this.xPos = 0.0;
    this.yPos = 0.0;
  },

  update() {
    if (navigator.geolocation) {
      console.log('Geolocation is supported.');

      // 位置情報の変化を監視
      navigator.geolocation.watchPosition((position) => {
        console.log('Position obtained:', position);

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        // 地図の座標範囲に基づいて現在地の位置を計算
        this.xPos = (this.longitude - this.MAP_LONGITUDE_MIN) / (this.MAP_LONGITUDE_MAX - this.MAP_LONGITUDE_MIN) * this.mapWidth - this.mapWidth / 2;
        this.yPos = (this.latitude - this.MAP_LATITUDE_MIN) / (this.MAP_LATITUDE_MAX - this.MAP_LATITUDE_MIN) * this.mapHeight - this.mapHeight / 2;

        // 現在地の位置を更新
        this.currentLocationEntity.setAttribute('position', `${this.xPos} ${this.yPos} -10`); // マーカーの位置をマップと同じ平面上に設定

        // 位置情報をテキストで表示
        // this.locationText.setAttribute('value', `Latitude: ${this.latitude.toFixed(6)}, Longitude: ${this.longitude.toFixed(6)}, xPos: ${this.xPos.toFixed(6)}, zPos: ${this.zPos.toFixed(6)}`);
        this.locationText.setAttribute('value', `xPos: ${this.xPos.toFixed(6)}, yPos: ${this.yPos.toFixed(6)}`);
        console.log('Location updated:', `Latitude: ${this.latitude.toFixed(6)}, Longitude: ${this.longitude.toFixed(6)}`);
      }, (error) => {
        console.error('Geolocation error:', error);
        this.locationText.setAttribute('value', `Error: ${error.message}`);
      }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 27000
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.locationText.setAttribute('value', 'Geolocation not supported');
    }
    // this.locationText.setAttribute('value', `Latitude: , Longitude: }`);
  },
}
export {nowPosition}
*/
