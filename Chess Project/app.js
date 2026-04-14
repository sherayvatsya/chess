const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const chess = new Chess();
let player = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Assign roles
    if (!player.white) {
        player.white = socket.id;
        socket.emit("playerRole", "w");
    }
    else if (!player.black) {
        player.black = socket.id;
        socket.emit("playerRole", "b");
    }
    else {
        socket.emit("spectatorRole");
    }

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        if (socket.id === player.white) {
            delete player.white;
        }
        else if (socket.id === player.black) {
            delete player.black;
        }
    });

    // Handle move
    socket.on("move", (move) => {
        try {

            if (chess.turn() === 'w' && socket.id !== player.white) return;
            if (chess.turn() === 'b' && socket.id !== player.black) return;

            const result = chess.move(move);

            if (result) {
                currentPlayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen());
            }
            else {
                socket.emit("invalidMove", move);
            }

        } catch (err) {
            console.log(err);
            socket.emit("invalidMove", move);
        }
    });

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
