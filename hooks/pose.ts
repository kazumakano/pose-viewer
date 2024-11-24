import { useEffect, useRef, useState } from "react"


export type Orientation = [number, number, number, number]
export type Position = [number, number, number]
type Msg = {
  ori: Orientation
  pos: Position
}

export default function usePose(): [Orientation | null, Position | null] {
  const [ori, setOri] = useState<Orientation | null>(null)
  const [pos, setPos] = useState<Position | null>(null)
  const ws = useRef<WebSocket>()

  useEffect(() => {
    console.log(`connecting to server ${process.env.NEXT_PUBLIC_WS_HOST}:${process.env.NEXT_PUBLIC_WS_PORT}`)
    ws.current = new WebSocket(`ws://${process.env.NEXT_PUBLIC_WS_HOST}:${process.env.NEXT_PUBLIC_WS_PORT}`)
    ws.current.onmessage = async (ev: MessageEvent<Blob>) => {
      const msg: Msg = JSON.parse(await ev.data.text())
      setOri([msg.ori[0], msg.ori[1], -msg.ori[2], -msg.ori[3]])
      setPos([100 * msg.pos[0], 100 * msg.pos[1], -100 * msg.pos[2]])    // meter to centimeter
    }
    return () => ws.current?.close()
  }, [setOri, setPos, ws])

  return [ori, pos]
}
