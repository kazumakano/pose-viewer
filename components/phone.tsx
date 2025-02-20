import type { Orientation, Position } from "../hooks/pose"
import { Box } from "@react-three/drei"

const ALTITUDE_OFFSET = 16
const SIZE = [8, 16, 1]    // (width, height, thickness)

type PhoneProps = {
  ori: Orientation | null
  pos: Position | null
}

export default function Phone({ ori, pos }: PhoneProps): JSX.Element {
  return ori && pos ? (
    <Box args={SIZE as [number, number, number]} castShadow position={[pos[0], pos[1] + ALTITUDE_OFFSET, pos[2]]} quaternion={ori} >
      <meshStandardMaterial />
    </Box>
  ) : <></>
}
