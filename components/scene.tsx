import styles from "../styles/Scene.module.css"
import type { ReactNode } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Plane } from "@react-three/drei"
import { DoubleSide } from "three"

const INIT_CAM_POS: [number, number, number] = [64, 128, 32]
const LIGHT_ALTITUDE = 256

type SceneProps = {
  children: ReactNode
  size: number
}

export default function Scene({ children, size }: SceneProps): JSX.Element {
  return (
    <div className={styles.scene}>
      <Canvas
        camera={{
          far: 4 * size,
          fov: 32,
          position: [INIT_CAM_POS[0], INIT_CAM_POS[2], INIT_CAM_POS[1]]
        }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          intensity={0.5}
          position={[0, LIGHT_ALTITUDE, 0]}
        />
        <OrbitControls />
        <Plane
          args={[size, size]}
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            opacity={0.5}
            side={DoubleSide}
            transparent
          />
        </Plane>
        {children}
      </Canvas>
    </div>
  )
}
