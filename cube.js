import * as THREE from 'three';

const container = document.getElementById('about-animation');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 10);
camera.position.set(0, 0, 2);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
console.log('Initial cube position:', cube.position);
cube.position.set(0, 0, 1);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.clear();
    renderer.render(scene, camera);
}


animate();
