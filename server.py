import asyncio
import json
from websockets import server as ws


class UdpProto(asyncio.DatagramProtocol):
    def __init__(self, wsp: ws.WebSocketServerProtocol) -> None:
        self.wsp = wsp

    def datagram_received(self, data_bytes: bytes, _: tuple[str, int]) -> None:
        data_strs = data_bytes.decode().split(",")[1:]
        asyncio.create_task(self.wsp.send(json.dumps({
            "ori": [float(d) for d in data_strs[3:]],
            "pos": [float(d) for d in data_strs[:3]]
        }).encode()))

async def _on_conn_viewer(udp_host: str, udp_port: int, wsp: ws.WebSocketServerProtocol) -> None:
    print(f"connected to viewer {wsp.remote_address[0]}:{wsp.remote_address[1]}")
    print(f"waiting smartphones at {udp_host}:{udp_port}")
    await asyncio.get_running_loop().create_datagram_endpoint(lambda: UdpProto(wsp), local_addr=(udp_host, udp_port))
    await wsp.wait_closed()

async def serve(udp_host: str, udp_port: int, ws_host: str, ws_port: int) -> None:
    print(f"running websocket server at {ws_host}:{ws_port}")
    async with ws.serve(lambda wsp: _on_conn_viewer(udp_host, udp_port, wsp), host=ws_host, port=ws_port):
        await asyncio.Future()

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-uh", "--udp_host", default="0.0.0.0", help="specify udp host", metavar="UDP_HOST")
    parser.add_argument("-up", "--udp_port", default=49152, type=int, help="specify udp port", metavar="UDP_PORT")
    parser.add_argument("-wh", "--ws_host", default="0.0.0.0", help="specify websocket host", metavar="WS_HOST")
    parser.add_argument("-wp", "--ws_port", default=8765, type=int, help="specify websocket port", metavar="WS_PORT")
    args = parser.parse_args()

    asyncio.run(serve(args.udp_host, args.udp_port, args.ws_host, args.ws_port))
