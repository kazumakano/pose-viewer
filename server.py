import asyncio
import json
from websockets import server as ws


class UdpProto(asyncio.DatagramProtocol):
    def __init__(self, wsp: ws.WebSocketServerProtocol) -> None:
        self.wsp = wsp

    def connection_lost(self, _: Exception | None) -> None:
        print("connection to logger has been closed")

    def connection_made(self, transport: asyncio.DatagramTransport) -> None:
        sock_name = transport.get_extra_info("sockname")
        print(f"waiting logger at {sock_name[0]}:{sock_name[1]}")

    def datagram_received(self, data_bytes: bytes, _: tuple[str, int]) -> None:
        data_strs = data_bytes.decode().split(",")[1:]
        asyncio.create_task(self.wsp.send(json.dumps({
            "ori": [float(d) for d in data_strs[3:]],
            "pos": [float(d) for d in data_strs[:3]]
        }).encode()))

async def _on_viewer_conn(udp_host: str, udp_port: int, wsp: ws.WebSocketServerProtocol) -> None:
    print(f"connect to viewer {wsp.host}:{wsp.port}")

    await asyncio.get_running_loop().create_datagram_endpoint(lambda: UdpProto(wsp), local_addr=(udp_host, udp_port))
    await asyncio.Future()

async def serve(udp_host: str, udp_port: int, ws_host: str, ws_port: int) -> None:
    async with ws.serve(lambda wsp: _on_viewer_conn(udp_host, udp_port, wsp), host=ws_host, port=ws_port):
        await asyncio.Future()

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-uh", "--udp_host", default="0.0.0.0", help="specify UDP server host", metavar="UDP_HOST")
    parser.add_argument("-up", "--udp_port", default=49152, type=int, help="specify UDP server port", metavar="UDP_PORT")
    parser.add_argument("-wh", "--ws_host", default="127.0.0.1", help="specify websocket server host", metavar="WS_HOST")
    parser.add_argument("-wp", "--ws_port", default=8765, type=int, help="specify websocket server port", metavar="WS_PORT")
    args = parser.parse_args()

    asyncio.run(serve(args.udp_host, args.udp_port, args.ws_host, args.ws_port))
