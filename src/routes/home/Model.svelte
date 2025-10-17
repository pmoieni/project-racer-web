<script lang="ts" module>
	import Zzeit from '$lib/models/Zzeit.svelte';
	import { T, useThrelte } from '@threlte/core';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { DoubleSide, type PerspectiveCamera } from 'three';

	const { renderer } = useThrelte();

	export interface AnimConfig {
		dirLight: {
			position: { x: number; y: number; z: number };
			intensity: number;
		};
		camera: {
			fov: number;
			position: { x: number; y: number; z: number };
			lookAt?: { x: number; y: number; z: number };
		};
		model: {
			rotation: { x: number; y: number; z: number };
		};
		duration: number;
		isStoppable: boolean;
	}

	// camera
	let camera: PerspectiveCamera | undefined = $state();
	let camFOV = new Tween(20);
	let camPosX = new Tween(0);
	let camPosY = new Tween(1);
	let camPosZ = new Tween(12);
	let rotateX = new Tween(0);
	let rotateY = new Tween(0);
	let rotateZ = new Tween(0);

	// directional light props
	let dLightIntensity = new Tween(0);
	let dLightPosX = new Tween(0);
	let dLightPosY = new Tween(0);
	let dLightPosZ = new Tween(-10);

	export async function applyState(config: AnimConfig) {
		const dLight = config.dirLight;
		const cam = config.camera;
		const model = config.model;

		const options = { duration: config.duration, easing: cubicOut };

		await Promise.all([
			dLightPosX.set(dLight.position.x, { ...options }),
			dLightPosY.set(dLight.position.y, { ...options }),
			dLightPosZ.set(dLight.position.z, { ...options }),
			dLightIntensity.set(dLight.intensity, { ...options }),
			camFOV.set(cam.fov, { ...options }),
			camPosX.set(cam.position.x, { ...options }),
			camPosY.set(cam.position.y, { ...options }),
			camPosZ.set(cam.position.z, { ...options }),
			rotateX.set(model.rotation.x, { ...options }),
			rotateY.set(model.rotation.y, { ...options }),
			rotateZ.set(model.rotation.z, { ...options })
		]);

		if (camera && cam.lookAt) camera.lookAt(cam.lookAt.x, cam.lookAt.y, cam.lookAt.z);
	}

	export interface AnimNode {
		config: AnimConfig;
		next: AnimNode | null;
		prev: AnimNode | null;
	}

	export class AnimController {
		private animHead: AnimNode | null = null;

		constructor() {}

		getLastNode(node: AnimNode): AnimNode {
			return node.next ? this.getLastNode(node.next) : node;
		}

		insertNode(config: AnimConfig) {
			let node: AnimNode = { config, next: null, prev: null };

			if (!this.animHead) {
				this.animHead = node;
				return;
			}

			const lastNode = this.getLastNode(this.animHead);
			node.prev = lastNode;
			lastNode.next = node;
		}

		insertNodeAtStart(config: AnimConfig) {
			let node: AnimNode = { config, next: null, prev: null };

			if (!this.animHead) {
				this.animHead = node;
				return;
			}

			this.animHead.prev = node;
			node.next = this.animHead;
			this.animHead = node;
		}

		deleteNode(node: AnimNode) {
			if (!node.prev) {
				this.animHead = node.next;
				return;
			}

			const prevNode = node.prev;
			prevNode.next = node.next;
		}

		private async apply(node: AnimNode) {
			const config = node.config;
			await applyState(config);
		}

		async animate(node: AnimNode | null, reverse?: boolean): Promise<AnimNode | null> {
			if (!this.animHead) {
				return null;
			}

			let innerNode = node ? node : this.animHead;

			await this.apply(innerNode);

			if (innerNode.config.isStoppable) {
				return innerNode;
			}

			return reverse ? this.animate(innerNode.prev) : this.animate(innerNode.next);
		}
	}

	function onresize() {
		if (camera) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	/*
	onMount(async () => {
		const animation = new AnimController();
		steps.forEach((step) => animation.insertNode(step));

		await animation.animate(null);
	});
    */
</script>

<svelte:window {onscroll} {onresize} />

<T.DirectionalLight
	position={[dLightPosX.current, dLightPosY.current, dLightPosZ.current]}
	intensity={dLightIntensity.current}
	castShadow
/>
<T.PerspectiveCamera
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
<Zzeit rotation={[rotateX.current, rotateY.current, rotateZ.current]} castShadow />
<T.Mesh receiveShadow rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[100, 100]} />
	<T.MeshStandardMaterial side={DoubleSide} color="white" />
</T.Mesh>
