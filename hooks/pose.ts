import { useCallback, useEffect, useState } from "react"


export type Orientation = [number, number, number, number]
export type Position = [number, number, number]
type PoseData = {
  ori: Orientation
  pos: Position
}

export default function usePose(): [Orientation | null, Position | null] {
  const [ori, setOri] = useState<Orientation | null>(null)
  const [pos, setPos] = useState<Position | null>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)

  const conn = useCallback(() => {
    const newWs = new WebSocket(`ws://${process.env.NEXT_PUBLIC_WS_HOST}:${process.env.NEXT_PUBLIC_WS_PORT}`)
    newWs.onclose = () => console.log("connection has been closed")
    newWs.onmessage = async (event: MessageEvent<Blob>) => {
      const data: PoseData = JSON.parse(await event.data.text())
      setOri([data.ori[0], data.ori[1], -data.ori[2], -data.ori[3]])
      setPos([100 * data.pos[0], 100 * data.pos[1], -100 * data.pos[2]])
    }
    newWs.onopen = () => console.log(`connected to ${process.env.NEXT_PUBLIC_WS_HOST}:${process.env.NEXT_PUBLIC_WS_PORT}`)

    setWs(newWs)
  }, [setOri, setPos, setWs])

  useEffect(() => {
    if (ws == null) {
      conn()
    }

    return () => ws?.close()
  }, [conn, ws])

  return [ori, pos]
}
