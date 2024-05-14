import * as THREE from 'three';

// Setup your scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Move the camera back along the z-axis
camera.position.z = 5;

// Create a Raycaster and a Vector2 for the mouse position
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Create a particle system
const particles = new THREE.BufferGeometry();
const particleCount = 1000; // Number of particles
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 0] = (Math.random() * 2 - 1) * 10; // x
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 10; // y
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * 10; // z
}
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({ color: 0x88ccff, size: 0.1 });
const particleMesh = new THREE.Points(particles, particleMaterial);
scene.add(particleMesh);

const redParticleMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
const redParticles = new THREE.BufferGeometry();
redParticles.setAttribute('position', new THREE.BufferAttribute(new Float32Array(), 3));
const redParticleMesh = new THREE.Points(redParticles, redParticleMaterial);
scene.add(redParticleMesh);

// Add a click event listener
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
window.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    const intersectionPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    // Get the old positions array
    const oldPositions = redParticleMesh.geometry.attributes.position.array;

    // Create a new positions array with the old and new positions
    const newPositions = new Float32Array(oldPositions.length + 3);
    newPositions.set(oldPositions);
    newPositions[oldPositions.length] = intersectionPoint.x;
    newPositions[oldPositions.length + 1] = intersectionPoint.y;
    newPositions[oldPositions.length + 2] = intersectionPoint.z;

    // Update the position attribute and set needsUpdate to true
    redParticleMesh.geometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
    redParticles.attributes.position.needsUpdate = true;

    console.log('A click event occurred and a new particle was created.');

}, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update particles
    const positions = particleMesh.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01; // simple gravity effect
        if (positions[i + 1] < -1) {
            positions[i + 1] = 1 + Math.random(); // reset to a random position above 1
        }
    }
    particleMesh.geometry.attributes.position.needsUpdate = true;

    const redPositions = redParticleMesh.geometry.attributes.position.array;
    for (let i = 0; i < redPositions.length; i += 3) {
        redPositions[i + 1] -= 0.01; // simple gravity effect
        if (redPositions[i + 1] < -1) {
            redPositions[i + 1] = 1 + Math.random(); // reset to a random position above 1
        }
    }
    redParticleMesh.geometry.attributes.position.needsUpdate = true;


    renderer.render(scene, camera);
}

setInterval(() => {
    const numParticles = particleMesh.geometry.attributes.position.array.length / 3;
    const numRedParticles = redParticleMesh.geometry.attributes.position.array.length / 3;
    console.log(`There are ${numParticles} blue particles and ${numRedParticles} red particles.`);
}, 10000);

animate();
