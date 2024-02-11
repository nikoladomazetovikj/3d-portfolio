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

    // Create outline geometry
    const outlineGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const halfSize = squareSize / 2;
    vertices.push(-halfSize, halfSize, 0); // Top-left corner
    vertices.push(halfSize, halfSize, 0); // Top-right corner
    vertices.push(halfSize, -halfSize, 0); // Bottom-right corner
    vertices.push(-halfSize, -halfSize, 0); // Bottom-left corner
    vertices.push(-halfSize, halfSize, 0); // Closing the loop
    outlineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Create outline with custom shader for animated border
    const outlineMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 }
        },
        vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
        fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
            vec3 color = vec3(0.5, 0.7, 1.0); // Light blue color for border
            float border = 5.0; // Border width (in pixels), increased for better visibility
            float transition = sin(time * 2.0) * 0.5 + 0.5; // Animation transition
            float alpha = 1.0 - smoothstep(0.5 - border, 0.5, abs(vUv.x - 0.5)); // Border alpha
            alpha *= 1.0 - smoothstep(0.5 - border, 0.5, abs(vUv.y - 0.5)); // Additional alpha check for y-axis
            gl_FragColor = vec4(color, alpha * transition);
        }
    `
    });





    const outline = new THREE.Line(outlineGeometry, outlineMaterial);
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
    squares.forEach(({ outline }) => {
        outline.material.uniforms.time.value += 0.10;
    });
    renderer.render(scene, camera);
}
animate();
