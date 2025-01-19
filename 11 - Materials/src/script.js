import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import  {RGBELoader} from "three/addons";

const gui = new GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
 * Load textures
 */

const loadingmanager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingmanager);

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;



/**
 * Add objects
 */

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()

// material.map = doorColorTexture;
// material.color = new THREE.Color('red')

// make object transparent
// material.transparent = true;
// material.opacity = 0.2;

// make objects visible from both sides (from inside to the outside)
// material.side = THREE.DoubleSide

// MeshNormalMaterial - changes based from where the camera is looking from
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true;

//MeshMatcapmaterial - high performance material for tricking into thinking that there is a light source
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;


// Mesh Depth Material -- the further away the material is, the darker it gets (creates depth)
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial -- high performing material that needs light.
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial -- high performance, good quality material that needs light and shows fake reflections.
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color("red");

// MeshToonMaterial -- cartoon looks
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
//     const material = new THREE.MeshStandardMaterial();
//     material.metalness = 1
//     material.roughness = 1
// material.map = doorColorTexture;
//     material.aoMap = doorAmbientOcclusionTexture;
//     material.displacementMap = doorHeightTexture;
//     material.displacementScale = 0.03;
//     material.roughnessMap = doorRoughnessTexture;
//     material.metalnessMap = doorMetalnessTexture;
//     material.normalMap = doorNormalTexture;
//     material.normalScale.set(0.5, 0.5)
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

//MeshPhysicalMaterial - even more realistic than MeshStandard material and with more controls:
const material = new THREE.MeshPhysicalMaterial();
// material.metalness = 1
// material.roughness = 1
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.03;
material.roughnessMap = doorRoughnessTexture;
material.metalnessMap = doorMetalnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5)
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// New controls here:
// material.clearCoat = 1;
// material.clearcoatRoughness = 0;
// gui.add(material, 'clearcoat').min(0).max(1).step(0.01);
// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.001)

// material.sheen = 1;
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1);

// gui.add(material, 'sheen').min(0).max(1).step(0.01);
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.01);
// gui.addColor(material, 'sheenColor').min(0).max(1).step(0.01);


// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]
//
// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)



const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64,64), material)
sphere.position.x = -3

const plane = new THREE.Mesh( new THREE.PlaneGeometry(1, 1, 100, 100), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2,64, 128), material)
torus.position.x = 3

scene.add(torus, plane, sphere)

/*
* Light
* */

// const ambientLight = new THREE.AmbientLight('white', 1)
// scene.add(ambientLight)
//
// const pointLight = new THREE.PointLight('white', 30)
// scene.add(pointLight)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4

/*
* Environment map
* */

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (map)=>{
    map.mapping = THREE.EquirectangularReflectionMapping
    scene.background = map
    scene.environment = map
})


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = - 0.15 * elapsedTime;
    plane.rotation.x =  -0.15 * elapsedTime;
    torus.rotation.x = - 0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()