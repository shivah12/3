import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

document.addEventListener('DOMContentLoaded', () => {
    

    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load('/assets/textures/NormalMap.png');

    const canvas = document.querySelector('.webgl');
    const scene = new THREE.Scene();

    const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        metalness: 0.7,
        roughness: 0.2,
        normalMap: normalTexture,
        color: new THREE.Color()
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x0e1f0, 2);
    pointLight2.position.set(-1.86, 1.33, -0.66);
    pointLight2.intensity = 7;
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xe11212, 0.1);
    pointLight3.position.set(2.13, -1.31, -0.92);
    pointLight3.intensity = 4.28;
    scene.add(pointLight3);

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 0, 2);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Apply linear gradient from teal to black (top to bottom) with reduced teal opacity
    renderer.domElement.style.background = `
        linear-gradient(
            to bottom,
            rgba(0, 128, 128, 0.5) 0%, /* Adjusted opacity for teal */
            rgba(0, 0, 0, 0.8) 100%
        )`;

    document.addEventListener('mousemove', onDocumentMouseMove);
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }

    document.addEventListener('scroll', updateSphere);
    function updateSphere() {
        sphere.position.y = window.scrollY * 0.005;
    }

    const clock = new THREE.Clock();

    const tick = () => {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        const elapsedTime = clock.getElapsedTime();

        sphere.rotation.y = 0.5 * elapsedTime;
        sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);

        renderer.render(scene, camera);

        window.requestAnimationFrame(tick);
    };

    tick();
});
