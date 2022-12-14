import usePose from "../hooks/pose"
import { Box } from "@react-three/drei"

const ALTITUDE_OFFSET = 16
const SIZE: [number, number, number] = [8, 16, 1]    // (width, height, thickness)

export default function Phone(): JSX.Element {
  const [ori, pos] = usePose()

  if (ori && pos) {
    return (
      <Box
        args={SIZE}
        castShadow
        position={[pos[0], pos[1] + ALTITUDE_OFFSET, pos[2]]}
        quaternion={ori}
      >
        <meshStandardMaterial />
      </Box>
    )
  } else {
    return <></>
  }
}
