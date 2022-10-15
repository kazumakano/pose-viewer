import { useEffect, useState } from "react"


export default function usePose(): [[number, number, number, number] | null, [number, number, number] | null] {
  const [ori, setOri] = useState<[number, number, number, number] | null>(null)
  const [pos, setPos] = useState<[number, number, number] | null>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)

  const conn = () => {
    const newWs = new WebSocket(`ws://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`)
    newWs.onmessage = async (event: MessageEvent<Blob>) => {
      const data = JSON.parse(await event.data.text())
      setOri(data.ori)
      setPos(data.pos)
    }
    newWs.onopen = () => console.log(`connect to ${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`)
    newWs.onclose = () => console.log("connection has been closed")

    setWs(newWs)
  }

  useEffect(() => {
    if (ws == null) {
      conn()
    }

    return () => ws?.close()
  }, [conn, ws])

  return [ori, pos]
}
