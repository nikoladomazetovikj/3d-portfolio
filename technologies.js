import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const squares = [];

function createSquare(x, y, svgUrl) {
    const squareSize = 100;
    const geometry = new THREE.PlaneGeometry(squareSize, squareSize);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const square = new THREE.Mesh(geometry, material);
    square.position.set(x, y, 0);
    scene.add(square);

    // Load SVG icon
    const loader = new SVGLoader();
    loader.load(
        svgUrl,
        function (data) {
            const paths = data.paths;
            const group = new THREE.Group();
            group.scale.multiplyScalar(0.1);
            group.position.set(x - squareSize / 2, y - squareSize / 2, 1);
            group.rotation.x = Math.PI;
            group.rotation.z = Math.PI;
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const shapes = path.toShapes(true);
                const geometry = new THREE.ShapeGeometry(shapes);
                const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const mesh = new THREE.Mesh(geometry, material);
                group.add(mesh);
            }
            scene.add(group);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );

    squares.push(square);
}


const offsetX = -300;
const offsetY = 150;
const spacingX = 200;
const spacingY = -200;
let row = 0;
let col = 0;


document.querySelectorAll(' .col-3').forEach((element) => {
    const x = col * spacingX + offsetX;
    const y = row * spacingY + offsetY;
    createSquare(x, y, `./assets/icons/${element.id}.svg`);
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
