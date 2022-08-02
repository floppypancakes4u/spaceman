let Game = {};
Game.Entities = {};
Game.Users = {};
Game.SaltRounds = 3;
Game.io = undefined;
Game.NPCCount = 1000;
Game.SocketIDtoSocket = {};

Game.SetupIO = (io) => {
  Game.io = io;
};

export default Game;
