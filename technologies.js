import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const squares = [];

function createSquare(x, y, imageUrl) {
    const squareSize = 100;
    const borderSize = 6; // Adjust the border size as needed

    // Create the border square
    const borderGeometry = new THREE.PlaneGeometry(squareSize + borderSize * 2, squareSize + borderSize * 2);
    const borderMaterial = new THREE.ShaderMaterial({
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
                vec3 color = vec3(0.5, 0.7, 1.0); // Light blue color
                float frequency = 2.0; // Frequency of color change
                float amplitude = 0.5; // Amplitude of color change
                float border = 0.05; // Border width
                float transition = sin(time * 2.0) * 0.5 + 0.5; // Animation transition
                float dist = distance(vUv, vec2(0.5)); // Distance from center
                float alpha = 1.0 - smoothstep(0.5 - border, 0.5, dist); // Border alpha
                vec3 animatedColor = color * (sin((vUv.x + vUv.y + time) * frequency) * amplitude + 1.0); // Animated color based on UV coordinates
                gl_FragColor = vec4(animatedColor, alpha * transition);
            }
        `
    });
    const borderSquare = new THREE.Mesh(borderGeometry, borderMaterial);
    borderSquare.position.set(x, y, -0.1); // Place the border slightly behind the main square
    scene.add(borderSquare);

    // Create the main square
    const geometry = new THREE.PlaneGeometry(squareSize, squareSize);
    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const square = new THREE.Mesh(geometry, material);
    square.position.set(x, y, 0);
    scene.add(square);

    squares.push({ square, borderSquare });
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
    squares.forEach(({ borderSquare }) => {
        borderSquare.material.uniforms.time.value += 0.01;
    });
    renderer.render(scene, camera);
}
animate();
