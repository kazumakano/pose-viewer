# Pose Viewer
This web application allows you to view smartphone poses in real-time.
It visualizes the positions and orientations in 3D with [Three.js](https://threejs.org/).

## Usage
### Server
You can launch the communication server with the following command.
It receives pose data from smartphones on UDP and sends it to viewers on WebSocket.
```sh
python server.py
```

The server binds addresses `0.0.0.0:49152` for UDP and `127.0.0.1:8765` for WebSocket on default.
You can also specify other hostnames and ports with the arguments.
```sh
python server.py --udp_host 192.168.207.123 --udp_port 49153 --ws_host 192.168.207.123 --ws_port 8766
```
