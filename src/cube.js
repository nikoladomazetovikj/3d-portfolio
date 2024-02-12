import * as THREE from 'three';

const container = document.getElementById('about-animation');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 10);
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

function createColoredCube(x, y, z, colors) {
    const materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x, y, z);
    return cube;
}

const faceColors = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xffa500, // Orange
    0xffffff  // White
];


const cubes = [];
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const colors = [];
            if (x === -1) colors.push(faceColors[0]); // Left face
            if (x === 1) colors.push(faceColors[1]); // Right face
            if (y === -1) colors.push(faceColors[2]); // Bottom face
            if (y === 1) colors.push(faceColors[3]); // Top face
            if (z === -1) colors.push(faceColors[4]); // Front face
            if (z === 1) colors.push(faceColors[5]); // Back face
            const cube = createColoredCube(x, y, z, colors);
            cubes.push(cube);
            scene.add(cube);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });
    renderer.clear();
    renderer.render(scene, camera);
}

animate();
