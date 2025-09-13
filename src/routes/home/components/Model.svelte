<script lang="ts">
	import Zzeit from '$lib/models/Zzeit.svelte';
	import { T, useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Vector3, type PerspectiveCamera } from 'three';

	const { renderer } = useThrelte();

	// camera
	let camera: PerspectiveCamera | undefined = $state();
	let camFOV = new Tween(20);
	let camPosX = new Tween(0);
	let camPosY = new Tween(1);
	let camPosZ = new Tween(12);
	let camTargetX = new Tween(0);
	let camTargetY = new Tween(1);
	let camTargetZ = new Tween(0);

	onMount(() => {
		if (camera) {
			camera.lookAt(new Vector3(camTargetX.current, camTargetY.current, camTargetZ.current));
		}
	});

	// directional light props
	let dLightIntensity = new Tween(1);
	let dLightPosX = new Tween(0);
	let dLightPosY = new Tween(0);
	let dLightPosZ = new Tween(-10);

	let scrollPercentage = $state(0);

	function onscroll() {
		let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		scrollPercentage = ~~((winScroll / height) * 100); // "~~" is same as "| 0" or "<<" or "Math.trunc()"

		if (scrollPercentage > 60 && scrollPercentage <= 80) {
			camera?.lookAt(camTargetX.current, camTargetY.current, camTargetZ.current);

			if (camPosX.target === 2) {
				return;
			}

			if (camera) {
				camFOV.target = 15;
				camPosX.target = 2;
				camPosY.target = 1;
				camPosZ.target = -12;
				camTargetX.target = 2;
				camTargetY.target = 1;
				camTargetZ.target = 0;
				camera.lookAt(camTargetX.current, camTargetY.current, camTargetZ.current);
			}

			return;
		}

		if (scrollPercentage > 40 && scrollPercentage <= 60) {
			camera?.lookAt(camTargetX.current, camTargetY.current, camTargetZ.current);

			if (camPosX.target === 9) {
				return;
			}

			if (camera) {
				camFOV.target = 20;
				camPosX.target = 9;
				camPosY.target = 1;
				camPosZ.target = 4;
				camTargetX.target = 0;
				camTargetY.target = 1;
				camTargetZ.target = 4;
			}

			return;
		}

		if (scrollPercentage > 0 && scrollPercentage <= 40) {
			dLightIntensity.target = 5;
			dLightPosY.target = 10;

			camera?.lookAt(camTargetX.current, camTargetY.current, camTargetZ.current);

			if (camPosX.target === 0) {
				return;
			}

			if (camera) {
				camFOV.target = 20;
				camPosX.target = 0;
				camPosY.target = 1;
				camPosZ.target = 12;
				camTargetX.target = 0;
				camTargetY.target = 1;
				camTargetZ.target = 0;
			}
		}
	}

	function onresize() {
		if (camera) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}

		renderer.setSize(window.innerWidth, window.innerHeight);
	}
</script>

<svelte:window {onscroll} {onresize} />

<T.DirectionalLight
	position={[dLightPosX.current, dLightPosY.current, dLightPosZ.current]}
	intensity={dLightIntensity.current}
	castShadow
/>
<T.PerspectiveCamera
	ref={camera}
	oncreate={(ref) => {
		camera = ref;
	}}
	position.x={camPosX.current}
	position.y={camPosY.current}
	position.z={camPosZ.current}
	fov={camFOV.current}
	aspect={window.innerWidth / window.innerHeight}
	near={0.1}
	far={1000}
	makeDefault
/>
<T.Mesh receiveShadow>
	<T.PlaneGeometry width={100} height={100} />
	<T.MeshStandardMaterial color={0x000000} />
</T.Mesh>
<Zzeit castShadow />
