import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0); // Position the light from above
scene.add(directionalLight);

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
    './assets/home.gltf',
    function (gltf) {
        // Add the loaded model to the scene
        scene.add(gltf.scene);

        // Reset the camera to its default position
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);

        // Set up bounding box for the loaded model
        const bbox = new THREE.Box3().setFromObject(gltf.scene);

        // Calculate the center of the bounding box
        const center = new THREE.Vector3();
        bbox.getCenter(center);

        // Calculate the size of the bounding box
        const size = new THREE.Vector3();
        bbox.getSize(size);

        // Calculate distance from the center to camera position
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

        // Adjust camera position and look at the center of the bounding box
        camera.position.set(center.x, center.y, center.z + cameraZ);
        camera.lookAt(center);

        // Optionally, you can scale the model to fit better within the camera's view
        const scaleFactor = 5 / maxDim; // Adjust the scaleFactor as needed
        gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
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
