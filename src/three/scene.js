import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function createScene(container) {
    // --------------------------------
    // Scene
    // --------------------------------

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf7e9d8)


    // --------------------------------
    // Camera
    // --------------------------------

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    )

    camera.position.set(0, 1, 5)


    // --------------------------------
    // Renderer
    // --------------------------------

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    )

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    )

    renderer.outputColorSpace = THREE.SRGBColorSpace

    container.appendChild(renderer.domElement)


    // --------------------------------
    // Lighting
    // --------------------------------

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        2
    )

    scene.add(ambientLight)


    const directionalLight = new THREE.DirectionalLight(
        0xffffff,
        2
    )

    directionalLight.position.set(2, 4, 5)

    scene.add(directionalLight)


    // --------------------------------
    // Load ice cream model
    // --------------------------------

    const loader = new GLTFLoader()

    let iceCream

    loader.load(
        '/models/ice-cream.glb',

        (gltf) => {
            iceCream = gltf.scene

            iceCream.scale.set(2, 2, 2)

            iceCream.position.set(0, 0, 0)

            scene.add(iceCream)
        },

        undefined,

        (error) => {
            console.error(
                'Error loading ice cream model:',
                error
            )
        }
    )


    // --------------------------------
    // Animation
    // --------------------------------

    const clock = new THREE.Clock()

    function animate() {
        requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        if (iceCream) {

            // Rotate the ice cream
            iceCream.rotation.y += 0.01

            // Gentle floating movement
            iceCream.position.y =
                Math.sin(elapsedTime * 2) * 0.08
        }

        renderer.render(scene, camera)
    }

    animate()


    // --------------------------------
    // Responsive resizing
    // --------------------------------

    function handleResize() {
        const width = container.clientWidth
        const height = container.clientHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        )
    }

    window.addEventListener(
        'resize',
        handleResize
    )
}