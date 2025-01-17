import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Debug
 * */

const gui = new GUI({width: 300, title: "Nice debug UI", closeFolders: true})
const debugObject = {}

debugObject.color = '#3a6ea6'
debugObject.subdivisions = 2;

window.addEventListener('keydown', (event) => {
    if(event.key === 'h') {
        gui.show(gui._hidden) // toggle debug UI on pressing 'h'
    }
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({color: debugObject.color, wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// gui.add(mesh.position, 'y', -3,3,0.01); // This is another way to ser properties, but the one bellow works better.
gui.add(mesh.position, 'y').name('mesh_y').min(-3).max(3).step(0.01)


// ThreeJS does color optimisation when rendering. If we change the material color directly here, the output on the
// lil-gui interface will not be the actual hex code which is being used in ThreeJS. Have to instead have the value
// outside of ThreeJS
gui
    .addColor(debugObject, 'color')
    .onChange(() =>
    {
        material.color.set(debugObject.color)
    })


// Create lil-gui folder for easier navigation
const animationsFolder = gui.addFolder("Animations");

debugObject.spin = () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2})
}
animationsFolder.add(debugObject, 'spin')

// We cannot change subdivisions on the already created geometry. Instead we have to create new geometry
gui.add(debugObject, 'subdivisions').min(1).max(20).step(1).onFinishChange(subdivisions => {
    mesh.geometry.dispose();
    mesh.geometry =  new THREE.BoxGeometry(1, 1, 1, subdivisions, subdivisions, subdivisions)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()