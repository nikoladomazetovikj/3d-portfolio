import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a plane geometry for the cards
const geometry = new THREE.PlaneGeometry(1, 1);

// Create a material
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

// Create an array to hold the cards
const cards = [];

// Create 3 cards
for (let i = 0; i < 3; i++) {
    const card = new THREE.Mesh(geometry, material);
    card.position.x = (i - 1) * 3;
    scene.add(card);
    cards.push(card);
}

// Set up mouse hover event
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate cards
    cards.forEach(card => {
        card.rotation.y += 0.01;
    });

    // Check for mouse hover
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cards);
    if (intersects.length > 0) {
        // When hovered, make it bigger
        intersects[0].object.scale.set(1.2, 1.2, 1.2);
    } else {
        // Reset size when not hovered
        cards.forEach(card => {
            card.scale.set(1, 1, 1);
        });
    }

    renderer.render(scene, camera);
}

// Set camera position
camera.position.z = 5;

// Start animation loop
animate();