import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const squares = [];

function createSquare(x, y, imageUrl) {
    const squareSize = 100;

    // Create the square
    const geometry = new THREE.PlaneGeometry(squareSize, squareSize);
    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const square = new THREE.Mesh(geometry, material);
    square.position.set(x, y, 0);
    scene.add(square);

    // Create outline
    const edges = new THREE.EdgesGeometry(geometry);
    const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ffff }));
    outline.position.set(x, y, 0);
    scene.add(outline);

    squares.push({ square, outline });
}

const offsetX = -300;
const offsetY = 150;
const spacingX = 200;
const spacingY = -200;
let row = 0;
let col = 0;

document.querySelectorAll('.row .col-3').forEach((element) => {
    const x = col * spacingX + offsetX;
    const y = row * spacingY + offsetY;
    createSquare(x, y, `./assets/icons/${element.id}.png`);
    col++;
    if (col === 4) {
        col = 0;
        row++;
    }
});

camera.position.set(0, 0, 500);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
