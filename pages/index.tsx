import type { NextPage } from "next"
import usePose from "../hooks/pose"
import Scene from "../components/scene"
import Axes from "../components/axes"
import Phone from "../components/phone"

const SCENE_SIZE = 1024

const Home: NextPage = () => {
  const [ori, pos] = usePose()

  return (
    <Scene size={SCENE_SIZE}>
      <Axes size={SCENE_SIZE} />
      <Phone ori={ori} pos={pos} />
    </Scene>
  )
}

export default Home
