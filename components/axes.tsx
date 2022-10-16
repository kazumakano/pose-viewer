import { Line } from "@react-three/drei"


type AxesProps = {
  size: number
}

export default function Axes({ size }: AxesProps): JSX.Element {
  return (
    <>
      <axesHelper args={[size / 2]} />
      <Line points={[[-size / 2, 0, 0], [0, 0, 0]]} color={"gray"} />
      <Line points={[[0, -size / 2, 0], [0, 0, 0]]} color={"gray"} />
      <Line points={[[0, 0, -size / 2], [0, 0, 0]]} color={"gray"} />
    </>
  )
}
