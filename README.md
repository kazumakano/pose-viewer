# Pose Viewer
This web application allows you to view smartphone poses in real-time.
It visualizes the positions and orientations in 3D based on [Three.js](https://threejs.org/).

## Usage
### Server
You can launch the communication server with the following command.
It receives pose data from smartphones and sends it to viewers.
```sh
python server.py
```

The server binds addresses `0.0.0.0:49152` for UDP and `0.0.0.0:8765` for WebSocket by default.
You can specify other hosts and ports via the arguments as well.
```sh
python server.py --udp_host 192.168.207.123 --udp_port 49153 --ws_host 192.168.207.123 --ws_port 8766
```
