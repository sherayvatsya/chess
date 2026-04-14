const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';

    board.forEach((row, rank) => {
        row.forEach((piece, file) => {

            const squareElement = document.createElement('div');
            squareElement.classList.add(
                'square',
                (rank + file) % 2 === 0 ? 'light' : 'dark'
            );

            squareElement.dataset.row = rank;
            squareElement.dataset.col = file;

            if (piece) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add(
                    'piece',
                    piece.color === 'w' ? 'white' : 'black'
                );

                pieceElement.innerText = getPieceUnicode(piece);
                pieceElement.draggable = playerRole === piece.color;

                pieceElement.addEventListener('dragstart', (e) => {
                    if (!pieceElement.draggable) return;

                    draggedPiece = pieceElement;
                    sourceSquare = { row: rank, col: file };
                    e.dataTransfer.setData('text/plain', '');
                });

                pieceElement.addEventListener('dragend', () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();

                if (!draggedPiece || !sourceSquare) return;

                const targetSquare = {
                    row: parseInt(squareElement.dataset.row),
                    col: parseInt(squareElement.dataset.col)
                };

                handleMove(sourceSquare, targetSquare);
            });

            // IMPORTANT: Append inside loop
            boardElement.appendChild(squareElement);
        });
    });

    if (playerRole === 'b') {
        boardElement.classList.add('flipped');
    } else {
        boardElement.classList.remove('flipped');
    }
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q'
    };

    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const pieces = {
        p: '♙',
        r: '♖',
        n: '♘',
        b: '♗',
        q: '♕',
        k: '♔'
    };

    return pieces[piece.type];
};


socket.on("playerRole", function (role) {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", function () {
    playerRole = null;
    renderBoard();
});

socket.on("boardState", function (fen) {
    chess.load(fen);
    renderBoard();
});

socket.on("move", function (move) {
    chess.move(move);
    renderBoard();
});

renderBoard();
