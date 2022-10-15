# Pose Viewer
This is web application to view smartphone pose.
This application is based on [Three.js](https://threejs.org/) and built with [Next.js](https://nextjs.org/).

## Usage
### server.py
You can launch server with following command.
The server receives pose data from smartphone on UDP and sends them to viewer on WebSocket.
You can specify server address to bind for UDP and viewer address to communicate on WebSocket.
Default server address and viewer address are `0.0.0.0:49152` and `127.0.0.1:80`, respectively.
```sh
python server.py [--server_host SERVER_HOST] [--server_port SERVER_PORT] [--viewer_host VIEWER_HOST] [--viewer_port VIEWER_PORT]
```
