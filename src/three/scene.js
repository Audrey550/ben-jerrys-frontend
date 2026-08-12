import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function createScene(container) {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    )

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    )

    container.appendChild(renderer.domElement)

    camera.position.set(0, 1, 5)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(2, 4, 5)
    scene.add(directionalLight)

    // Load ice cream model
    const loader = new GLTFLoader()

    loader.load(
        '/models/ice-cream.glb',
        (gltf) => {
            const iceCream = gltf.scene

            iceCream.scale.set(2, 2, 2)

            scene.add(iceCream)
        },
        undefined,
        (error) => {
            console.error('Error loading ice cream model:', error)
        }
    )

    function animate() {
        requestAnimationFrame(animate)

        renderer.render(scene, camera)
    }

    animate()
}