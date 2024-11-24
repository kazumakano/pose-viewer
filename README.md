# Pose Viewer
This web application allows you to view smartphone poses in real-time.
It visualizes the positions and orientations in 3D with [Three.js](https://threejs.org/).

## Usage
### server.py
You can launch server with following command.
The server receives pose data from smartphone on UDP and sends them to viewer on WebSocket.
You can specify server address to bind.
Default server address for UDP and WebSocket are `0.0.0.0:49152` and `127.0.0.1:8765`, respectively.
```sh
python server.py [--udp_host UDP_HOST] [--udp_port UDP_PORT] [--ws_host WS_HOST] [--ws_port WS_PORT]
```
