<script lang="ts">
	import { AnimController, type AnimConfig, type AnimNode } from '$lib/animation';
	import Zzeit from '$lib/models/Zzeit.svelte';
	import { T, useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { DoubleSide, type PerspectiveCamera } from 'three';

	interface Props {
		animState: 'next' | 'prev';
	}

	const { animState }: Props = $props();

	const { renderer } = useThrelte();

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

	interface StepProps {
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
	}

	const steps: AnimConfig<StepProps>[] = [
		// lights on
		{
			props: {
				dirLight: {
					position: { x: 0, y: 10, z: -10 },
					intensity: 0
				},
				camera: {
					fov: 20,
					position: { x: 0, y: 1, z: 12 },
					lookAt: { x: 0, y: 1, z: 0 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 2000
			},
			isStoppable: false
		},
		// lights stay on
		{
			props: {
				dirLight: {
					position: { x: 0, y: 10, z: -10 },
					intensity: 1
				},
				camera: {
					fov: 20,
					position: { x: 0, y: 1, z: 12 },
					lookAt: { x: 0, y: 1, z: 0 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 2000
			},
			isStoppable: true
		},
		// lights off
		{
			props: {
				dirLight: {
					position: { x: 0, y: 10, z: -10 },
					intensity: 0
				},
				camera: {
					fov: 20,
					position: { x: 0, y: 1, z: 12 }
					// lookAt: { x: 2, y: 0, z: 0 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 1500
			},
			isStoppable: false
		},
		// rotate slightly towards headlights with increased fov
		{
			props: {
				dirLight: {
					position: { x: -10, y: 5, z: 3 },
					intensity: 0
				},
				camera: {
					fov: 20,
					position: { x: 4, y: 1, z: 10 },
					lookAt: { x: -2, y: 1, z: 2 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 500
			},
			isStoppable: false
		},
		// lights on and rotate towards headlights
		{
			props: {
				dirLight: {
					position: { x: 10, y: 10, z: 3 },
					intensity: 5
				},
				camera: {
					fov: 20,
					position: { x: 5, y: 1, z: 10 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 2500
			},
			isStoppable: true
		},
		// rotate more while turning the lights off
		{
			props: {
				dirLight: {
					position: { x: -10, y: 5, z: 3 },
					intensity: 0
				},
				camera: {
					fov: 20,
					position: { x: 5, y: 1, z: 8 },
					lookAt: { x: 5, y: 1, z: 10 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 1500
			},
			isStoppable: false
		},
		// move towards rear lights
		{
			props: {
				dirLight: {
					position: { x: 5, y: 10, z: 3 },
					intensity: 8
				},
				camera: {
					fov: 20,
					position: { x: 0, y: 1.5, z: -12 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 4000
			},
			isStoppable: true
		},
		// slowly turn lights off
		{
			props: {
				dirLight: {
					position: { x: 0, y: 5, z: 5 },
					intensity: 0
				},
				camera: {
					fov: 15,
					position: { x: 0, y: 1.5, z: -12 },
					lookAt: { x: 0, y: 1, z: 0 }
				},
				model: {
					rotation: { x: 0, y: 0, z: 0 }
				},
				duration: 2500
			},
			isStoppable: false
		}
	];

	export const applyState = async (config: AnimConfig<StepProps>) => {
		const dLight = config.props.dirLight;
		const cam = config.props.camera;
		const model = config.props.model;

		const options = { duration: config.props.duration, easing: cubicOut };

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
	};

	function onresize() {
		if (camera) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	let animController: AnimController<StepProps> | null = null;
	let stoppedAt: AnimNode<StepProps> | null = null;

	async function next() {
		if (animController) stoppedAt = await animController.animate(stoppedAt, true);
	}

	async function prev() {
		if (animController) stoppedAt = await animController.animate(stoppedAt, true);
	}

	$effect(() => {
		switch (animState) {
			case 'next':
				next();
				break;
			case 'prev':
				prev();
				break;
		}
	});

	onMount(() => {
		animController = new AnimController<StepProps>(applyState);
		steps.forEach((step) => animController!.insertNode(step));
	});
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
