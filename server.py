import asyncio
import json
from websockets import server as wss


class UdpProto(asyncio.DatagramProtocol):
    def __init__(self, wsp: wss.WebSocketServerProtocol) -> None:
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

async def _on_viewer_conn(server_host: str, server_port: int, wsp: wss.WebSocketServerProtocol) -> None:
    print(f"connect to viewer {wsp.host}:{wsp.port}")

    await asyncio.get_running_loop().create_datagram_endpoint(lambda: UdpProto(wsp), local_addr=(server_host, server_port))
    await asyncio.Future()

async def serve(server_host: str, server_port: int, viewer_host: str, viewer_port: int) -> None:
    async with wss.serve(lambda wsp: _on_viewer_conn(server_host, server_port, wsp), host=viewer_host, port=viewer_port):
        await asyncio.Future()

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-sh", "--server_host", default="0.0.0.0", help="specify server host", metavar="SERVER_HOST")
    parser.add_argument("-sp", "--server_port", default=49152, type=int, help="specify server port", metavar="SERVER_PORT")
    parser.add_argument("-vh", "--viewer_host", default="127.0.0.1", help="specify viewer host", metavar="VIEWER_HOST")
    parser.add_argument("-vp", "--viewer_port", default=80, type=int, help="specify viewer port", metavar="VIEWER_PORT")
    args = parser.parse_args()

    asyncio.run(serve(args.server_host, args.server_port, args.viewer_host, args.viewer_port))
