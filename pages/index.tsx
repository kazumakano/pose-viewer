import type { NextPage } from "next"
import Scene from "../components/scene"
import Axes from "../components/axes"
import Phone from "../components/phone"

const SCENE_SIZE = 1024

const Home: NextPage = () => {
  return (
    <Scene size={SCENE_SIZE}>
      <Axes size={SCENE_SIZE} />
      <Phone />
    </Scene>
  )
}

export default Home
