import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

import Game from './game.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

Game.SetupIO(io); // Add our io object to the Game Object for calling anywhere

app.use(express.static('public'));
app.use('/public/assets', express.static(__dirname + '/public/assets'));
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080, () => {
  io.on('connection', (socket) => {
    //Commands
    socket.on('command', (input) => {
      /*
      models.Log.create({
        ip: socket.handshake.address,
        entry: JSON.stringify(input),
        action: "input"
      }).then((data) => {
        api_bridge(socket, input.termID, input.cmd, input.args);
      })
      */
    });

    // socket.on('register', (data) => {
    //   UserTools.Register(socket, data);
    // });

    // socket.on('login', (data) => {
    //   UserTools.Login(socket, data);
    // });

    console.log(
      `New Socket: ${socket.id} auth: ${socket.auth} secure: ${socket.secure}`
    );
  });

  console.log(`Space app listening on port ${8080}!`);
});
