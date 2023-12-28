# Pose Viewer
This is web application to view smartphone pose.
This application is based on [Three.js](https://threejs.org/) and built with [Next.js](https://nextjs.org/).

## Usage
### server.py
You can launch server with following command.
The server receives pose data from smartphone on UDP and sends them to viewer on WebSocket.
You can specify server address to bind.
Default server address for UDP and WebSocket are `0.0.0.0:49152` and `127.0.0.1:8765`, respectively.
```sh
python server.py [--udp_host UDP_HOST] [--udp_port UDP_PORT] [--ws_host WS_HOST] [--ws_port WS_PORT]
```
