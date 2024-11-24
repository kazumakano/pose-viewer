import type { ReactNode } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Plane } from "@react-three/drei"
import { DoubleSide } from "three"

const INIT_CAM_POS: [number, number, number] = [64, 32, 128]

type SceneProps = {
  children: ReactNode
  size: number
}

export default function Scene({ children, size }: SceneProps): JSX.Element {
  return (
    <Canvas camera={{ far: 4 * size, fov: 32, position: INIT_CAM_POS }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        intensity={1}
        position={[0, size / 2, 0]}
        shadow-camera-bottom={-size / 2}
        shadow-camera-far={size / 2 + 1}
        shadow-camera-left={-size / 2}
        shadow-camera-right={size / 2}
        shadow-camera-top={size / 2}
        shadow-mapSize-height={4 * size}
        shadow-mapSize-width={4 * size}
      />
      <OrbitControls />
      <Plane args={[size, size]} receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial opacity={0.5} side={DoubleSide} transparent />
      </Plane>
      {children}
    </Canvas>
  )
}
