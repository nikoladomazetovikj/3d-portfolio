import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
    './assets/home.gltf',
    function (gltf) {
        // Add the loaded model to the scene
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('Error loading GLTF model:', error);
    }
);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
