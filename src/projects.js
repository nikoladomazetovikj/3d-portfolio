import * as THREE from 'three';


var scene1 = new THREE.Scene();


var camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjust aspect ratio to 1
camera1.position.z = 5;


var renderer1 = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Set alpha to true for transparent background
var pr1Div = document.getElementById("pr-1");
renderer1.setSize(pr1Div.offsetWidth, pr1Div.offsetHeight); // Set renderer size based on div size
pr1Div.appendChild(renderer1.domElement);


var geometry1 = new THREE.BufferGeometry();
var vertices1 = new Float32Array([
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    0, 0.5, 0
]);
geometry1.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));


var scale1 = Math.min(pr1Div.offsetWidth, pr1Div.offsetHeight) * 0.1; // Scale down the geometry
geometry1.scale(scale1, scale1, scale1);


var material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });


var triangle1 = new THREE.Mesh(geometry1, material1);


scene1.add(triangle1);


function animate1() {
    requestAnimationFrame(animate1);

    triangle1.rotation.x += 0.01;
    triangle1.rotation.y += 0.01;

    renderer1.render(scene1, camera1);
}

animate1();


var scene2 = new THREE.Scene();


var camera2 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera2.position.z = 5;


var renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
var pr2Div = document.getElementById("pr-2");
renderer2.setSize(pr2Div.offsetWidth, pr2Div.offsetHeight);
pr2Div.appendChild(renderer2.domElement);


var geometry2 = new THREE.BoxGeometry();


var scale2 = Math.min(pr2Div.offsetWidth, pr2Div.offsetHeight) * 0.1;
geometry2.scale(scale2, scale2, scale2);

var material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
var cube2 = new THREE.Mesh(geometry2, material2);
scene2.add(cube2);


function animate2() {
    requestAnimationFrame(animate2);

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    renderer2.render(scene2, camera2);
}

animate2();


var scene3 = new THREE.Scene();


var camera3 = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera3.position.z = 5;


var renderer3 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
var pr3Div = document.getElementById("pr-3");
renderer3.setSize(pr3Div.offsetWidth, pr3Div.offsetHeight);
pr3Div.appendChild(renderer3.domElement);

var geometry3 = new THREE.BoxGeometry(1, 1, 1);


var scale3 = Math.min(pr3Div.offsetWidth, pr3Div.offsetHeight) * 0.05;
geometry3.scale(scale3, scale3, scale3);

var material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
var chart3 = new THREE.Mesh(geometry3, material3);
scene3.add(chart3);

function animate3() {
    requestAnimationFrame(animate3);

    chart3.rotation.x += 0.01;
    chart3.rotation.y += 0.01;

    renderer3.render(scene3, camera3);
}

animate3();
