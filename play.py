import asyncio
from datetime import datetime


async def play(file: str, host: str, port: int, spd: float) -> None:
    trans = (await asyncio.get_running_loop().create_datagram_endpoint(asyncio.DatagramProtocol, remote_addr=(host, port)))[0]

    with open(file) as f:
        l = f.readline()
        trans.sendto(l.encode())
        last_ts = datetime.strptime(l.split(",")[0], "%Y-%m-%d %H:%M:%S.%f")

        for l in f:
            ts = datetime.strptime(l.split(",")[0], "%Y-%m-%d %H:%M:%S.%f")
            await asyncio.sleep((ts - last_ts).total_seconds() / spd)
            trans.sendto(l.encode())
            last_ts = ts

    trans.close()

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--file", required=True, help="specify log file", metavar="PATH_TO_FILE")
    parser.add_argument("--host", default="127.0.0.1", help="specify server host", metavar="HOST")
    parser.add_argument("--port", default=49152, type=int, help="specify server port", metavar="PORT")
    parser.add_argument("-s", "--spd", default=1, type=float, help="specify playing speed", metavar="SPD")
    args = parser.parse_args()

    asyncio.run(play(args.file, args.host, args.port, args.spd))
