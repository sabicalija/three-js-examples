import * as THREE from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";

rendererWidth = window.innerWidth * 0.7;
rendererHeight = window.innerHeight * 0.6;

width = 1;
height = 1;
depth = 0.2;

const widthSegments = 4;
const heightSegments = 4;
const depthSegments = 1;

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color("gray");

const camera = new THREE.PerspectiveCamera(75, rendererWidth / rendererHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(rendererWidth, rendererHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

const exporter = new STLExporter();
function downloadSTL() {
  const stlString = exporter.parse(cube);
  const blob = new Blob([stlString], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "cube.stl";
  link.href = URL.createObjectURL(blob);
  link.click();
}

document.getElementById("download").addEventListener("click", downloadSTL);
