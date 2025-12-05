<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import {
		CircleGeometry,
		DirectionalLight,
		Mesh,
		MeshStandardMaterial,
		PerspectiveCamera
	} from 'three';
	import Zzeit from './Zzeit.svelte';

	interface Props {
		camFOV: number;
		camPosX: number;
		camPosY: number;
		camPosZ: number;
		dirLightPosX: number;
		dirLightPosY: number;
		dirLightPosZ: number;
		dirLightIntensity: number;
		dirLightColor: string;
		dirLight2PosX: number;
		dirLight2PosY: number;
		dirLight2PosZ: number;
		dirLight2Intensity: number;
		dirLight2Color: string;
		rotationX: number;
		rotationY: number;
		rotationZ: number;
	}

	let {
		camFOV,
		camPosX,
		camPosY,
		camPosZ,
		dirLightPosX,
		dirLightPosY,
		dirLight2PosZ,
		dirLightIntensity,
		dirLightColor,
		dirLight2PosX,
		dirLight2PosY,
		dirLightPosZ,
		dirLight2Intensity,
		dirLight2Color,
		rotationX,
		rotationY,
		rotationZ
	}: Props = $props();

	const { renderer } = useThrelte();

	const camera = new PerspectiveCamera(camFOV, window.innerWidth / window.innerHeight, 1, 1000);

	const dirLight = new DirectionalLight(dirLightColor, 0);
	dirLight.castShadow = true;

	const dirLight2 = new DirectionalLight(dirLight2Color, 0);
	dirLight2.castShadow = true;

	const planeGeometry = new CircleGeometry(10);
	const planeMaterial = new MeshStandardMaterial({ color: '#000000' });
	const plane = new Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotateX(-Math.PI / 2);

	function onresize() {
		if (camera) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}

		renderer.setSize(window.innerWidth, window.innerHeight);
	}
</script>

<svelte:window {onscroll} {onresize} />

<T
	is={dirLight}
	position.x={dirLightPosX}
	position.y={dirLightPosY}
	position.z={dirLightPosZ}
	intensity={dirLightIntensity}
	color={dirLightColor}
/>
<T
	is={dirLight2}
	position.x={dirLight2PosX}
	position.y={dirLight2PosY}
	position.z={dirLight2PosZ}
	intensity={dirLight2Intensity}
	color={dirLight2Color}
/>
<T
	is={camera}
	fov={camFOV}
	position.x={camPosX}
	position.y={camPosY}
	position.z={camPosZ}
	makeDefault
/>
<Zzeit rotation={[rotationX, rotationY, rotationZ]} castShadow receiveShadow />
<T is={plane} />
