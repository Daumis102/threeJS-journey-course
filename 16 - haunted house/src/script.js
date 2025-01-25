import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {Timer} from "three/addons";

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new three.Scene()


/*
* Textures
* */

const textureLoader = new three.TextureLoader()
const floorAlphaTexture = textureLoader.load("floor/alpha.jpg")
const floorColorTexture = textureLoader.load("floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg")
floorColorTexture.colorSpace = three.SRGBColorSpace
const floorARMTexture = textureLoader.load("floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg")
const floorNormalTexture = textureLoader.load("floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg")
const floorDisplacementTexture = textureLoader.load("floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg")
floorColorTexture.repeat.set(8, 8)
floorColorTexture.wrapS = three.RepeatWrapping
floorColorTexture.wrapT = three.RepeatWrapping

floorARMTexture.repeat.set(8, 8)
floorARMTexture.wrapS = three.RepeatWrapping
floorARMTexture.wrapT = three.RepeatWrapping

floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = three.RepeatWrapping
floorNormalTexture.wrapT = three.RepeatWrapping

floorDisplacementTexture.repeat.set(8, 8)
floorDisplacementTexture.wrapS = three.RepeatWrapping
floorDisplacementTexture.wrapT = three.RepeatWrapping

const wallColorTexture = textureLoader.load("wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg")
wallColorTexture.colorSpace = three.SRGBColorSpace
const wallARMTexture = textureLoader.load("wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg")
const wallNormalTexture = textureLoader.load("wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg")

wallColorTexture.wrapS = three.RepeatWrapping
wallColorTexture.wrapT = three.RepeatWrapping

wallARMTexture.wrapS = three.RepeatWrapping
wallARMTexture.wrapT = three.RepeatWrapping

wallNormalTexture.wrapS = three.RepeatWrapping
wallNormalTexture.wrapT = three.RepeatWrapping

const roofColorTexture = textureLoader.load("roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg")
roofColorTexture.colorSpace = three.SRGBColorSpace
const roofARMTexture = textureLoader.load("roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg")
const roofNormalTexture = textureLoader.load("roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg")

roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = three.RepeatWrapping
roofARMTexture.wrapS = three.RepeatWrapping
roofNormalTexture.wrapS = three.RepeatWrapping

const bushColorTexture = textureLoader.load("bush/leaves_forest_ground/leaves_forest_ground_diff_1k.jpg")
bushColorTexture.colorSpace = three.SRGBColorSpace
const bushARMTexture = textureLoader.load("bush/leaves_forest_ground/leaves_forest_ground_arm_1k.jpg")
const bushNormalTexture = textureLoader.load("bush/leaves_forest_ground/leaves_forest_ground_nor_gl_1k.jpg")
bushColorTexture.repeat.set(2,1)
bushARMTexture.repeat.set(2,1)
bushNormalTexture.repeat.set(2,1)

bushColorTexture.srapS = three.RepeatWrapping
bushARMTexture.srapS = three.RepeatWrapping
bushNormalTexture.srapS = three.RepeatWrapping

const graveColorTexture = textureLoader.load("grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg")
graveColorTexture.colorSpace = three.SRGBColorSpace
const graveARMTexture = textureLoader.load("grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg")
const graveNormalTexture = textureLoader.load("grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg")

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);


const doorColorTexture = textureLoader.load("door/color.jpg")
doorColorTexture.colorSpace = three.SRGBColorSpace
const doorAlphaTexture = textureLoader.load("door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("door/height.jpg")
const doorNormalTexture = textureLoader.load("door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("door/roughness.jpg")

/**
 * House
 */

// floor
const floor = new three.Mesh(new three.PlaneGeometry(20, 20, 100, 100), new three.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    transparent: true,
    aoMap: floorARMTexture,
    rougnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.191
}))
gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')
floor.rotation.x = -Math.PI / 2
scene.add(floor);

const house = new three.Group()
scene.add(house);

// Walls
const walls = new three.Mesh(
    new three.BoxGeometry(4, 2.5, 4),
    new three.MeshStandardMaterial({
        map: wallColorTexture,
        aoMapp: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y += 2.5 / 2 // because height is 2.5, but the origin of the geometry is middle of the box, making the box go under ground if we don't do this
house.add(walls);

// roof
const roof = new three.Mesh(
    new three.ConeGeometry(3.5, 1.5, 4),
    new three.MeshStandardMaterial({
        map: roofColorTexture,
        aoMapp: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = 2.5 + 0.75 // size of house + half the height of the roof itself, since origin is in the middle
roof.rotation.y = Math.PI / 4
house.add(roof);

//door
const door = new three.Mesh(
    new three.PlaneGeometry(2.2, 2.2, 100, 100),
    new three.MeshStandardMaterial({
        alphaMap: doorAlphaTexture,
        map: doorColorTexture,
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,
        rougnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: - 0.04,
    })
)
door.position.y += 2.2 / 2
door.position.z = 2 + 0.01 // prevent z-fighting
house.add(door)

// bushes
const bushGeometry = new three.SphereGeometry(1, 16, 16)
const bushMaterial = new three.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMapp: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})


const bush1 = new three.Mesh(bushGeometry, bushMaterial)
bush1.position.set(0.8, 0.2, 2.2)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.rotation.x = - 0.75
house.add(bush1)

const bush2 = new three.Mesh(bushGeometry, bushMaterial)
bush2.position.set(1.4, 0.1, 2.1)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.rotation.x = - 0.75
house.add(bush2)

const bush3 = new three.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = - 0.75
house.add(bush3)

const bush4 = new three.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = - 0.75
house.add(bush4)

// graves
const graveGeometry = new three.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new three.MeshStandardMaterial({
    map: graveColorTexture,
    aoMapp: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})

const graves = new three.Group()
scene.add(graves)

for (let i = 0; i < 30; i++) {
    const grave = new three.Mesh(graveGeometry, graveMaterial)
    const angle = Math.random() * Math.PI * 2 // random angle from 0 to 360 degrees
    const radius = 3 + Math.random() * 7
    grave.position.x = Math.cos(angle) * radius
    grave.position.z = Math.sin(angle) * radius
    grave.position.y = Math.random() * 0.8 / 2

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new three.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new three.DirectionalLight('#86cdff', 1 )
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new three.PointLight('#ff7d46', 5 )
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)


// Ghost lights

const ghost1 = new three.PointLight('#8800ff', 6)
const ghost2 = new three.PointLight('#ff0088', 6)
const ghost3 = new three.PointLight('#ff0000', 6)
scene.add(ghost1,ghost2,ghost3)
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
const camera = new three.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new three.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(2.34 * ghost1Angle) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = elapsedTime * -0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(2.34 * ghost2Angle) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 5
    ghost3.position.z = Math.sin(ghost3Angle) * 5
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(2.34 * ghost3Angle) * Math.sin(ghost3Angle * 3.45)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()