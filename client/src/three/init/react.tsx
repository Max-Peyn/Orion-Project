import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Models } from "./models";
export const ThreeReact = () => {
    return (
        <Canvas
            onCreated={({ gl }) => {
                gl.setClearColor('#C0C0C0');
            }}
            shadows
            style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [3, 0, 4] }}>
            <Environment
                files="/texture/studio_small_08_1k.exr"
                environmentIntensity={0.4}
            />
            <ambientLight intensity={0.3}/>
            <directionalLight
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                position={[0, 5, 0]}
                castShadow
                intensity={1.2}
            />
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.28, 0]}
                receiveShadow>
                <planeGeometry args={[10, 10]} />
                <shadowMaterial opacity={0.3} />
            </mesh>
            <OrbitControls 
                maxPolarAngle={Math.PI * .55}
                maxDistance={7}/>
            <Models />
        </Canvas>
    )
}