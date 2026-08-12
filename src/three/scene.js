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
    let iceCreamScoop
    let sprinkles

    let targetScoopColor = new THREE.Color(0xfff1c7)
    let targetSprinklesColor = new THREE.Color(0xffffff)


    loader.load(
        '/models/ice-cream.glb',

        (gltf) => {
            iceCream = gltf.scene

            iceCream.traverse((child) => {

                if (child.isMesh) {

                    if (child.name === 'IceCream_3_3') {
                        iceCreamScoop = child
                    }

                    if (child.name === 'IceCream_3_2') {
                        sprinkles = child
                    }
                }
            })

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
    // Customization
    // --------------------------------

    function setFlavour(flavour) {

        const flavourColors = {
            vanilla: 0xfff1c7,
            chocolate: 0x6b3e26,
            strawberry: 0xf58fa8
        }

        const color = flavourColors[flavour]

        if (color) {
            targetScoopColor.set(color)
        }
    }


    function setTopping(topping) {

        const toppingColors = {
            rainbow: 0xffffff,
            chocolate: 0x5a321f,
            blue: 0x4da6ff
        }

        const color = toppingColors[topping]

        if (color) {
            targetSprinklesColor.set(color)
        }
    }


    // --------------------------------
    // Hover interaction
    // --------------------------------

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    let isHovering = false

    let targetRotationX = 0
    let targetRotationZ = 0

    container.addEventListener('pointermove', (event) => {

        const rect =
            renderer.domElement.getBoundingClientRect()

        mouse.x =
            ((event.clientX - rect.left) / rect.width) * 2 - 1

        mouse.y =
            -((event.clientY - rect.top) / rect.height) * 2 + 1

        raycaster.setFromCamera(mouse, camera)

        if (iceCream) {

            const intersects =
                raycaster.intersectObject(
                    iceCream,
                    true
                )

            isHovering = intersects.length > 0

            if (isHovering) {

                targetRotationX =
                    mouse.y * 0.15

                targetRotationZ =
                    -mouse.x * 0.15
            }
        }
    })


    container.addEventListener('pointerleave', () => {

        isHovering = false

        targetRotationX = 0
        targetRotationZ = 0
    })


    // --------------------------------
    // Animation
    // --------------------------------

    const clock = new THREE.Clock()

    function animate() {

        requestAnimationFrame(animate)

        const elapsedTime =
            clock.getElapsedTime()

        if (iceCream) {

            // --------------------------------
            // Smooth colour transitions
            // --------------------------------

            if (iceCreamScoop) {
                iceCreamScoop.material.color.lerp(
                    targetScoopColor,
                    0.08
                )
            }

            if (sprinkles) {
                sprinkles.material.color.lerp(
                    targetSprinklesColor,
                    0.08
                )
            }           

            // --------------------------------
            // Rotation
            // --------------------------------

            iceCream.rotation.y += 0.01


            // --------------------------------
            // Gentle floating movement
            // --------------------------------

            iceCream.position.y =
                Math.sin(elapsedTime * 2) * 0.08


            // --------------------------------
            // Hover scale
            // --------------------------------

            const targetScale =
                isHovering ? 2.15 : 2

            iceCream.scale.x +=
                (targetScale - iceCream.scale.x) * 0.1

            iceCream.scale.y +=
                (targetScale - iceCream.scale.y) * 0.1

            iceCream.scale.z +=
                (targetScale - iceCream.scale.z) * 0.1


            // --------------------------------
            // Hover tilt
            // --------------------------------

            iceCream.rotation.x +=
                (targetRotationX -
                    iceCream.rotation.x) * 0.08

            iceCream.rotation.z +=
                (targetRotationZ -
                    iceCream.rotation.z) * 0.08
        }

        renderer.render(scene, camera)
    }

    animate()


    // --------------------------------
    // Responsive resizing
    // --------------------------------

    function handleResize() {

        const width =
            container.clientWidth

        const height =
            container.clientHeight

        camera.aspect =
            width / height

        camera.updateProjectionMatrix()

        renderer.setSize(
            width,
            height
        )

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        )
    }

    window.addEventListener(
        'resize',
        handleResize
    )


    // --------------------------------
    // Return customization controls
    // --------------------------------

    return {
        setFlavour,
        setTopping
    }
}