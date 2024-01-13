const   boxes = document.querySelectorAll('.box'),
        gameWindow = document.getElementById('gameWindow');
let turn = false;
let currentPlayer = 'X',
    changePlayer = function(){
        (currentPlayer === 'X')?currentPlayer = 'O':currentPlayer ='X';
        document.getElementById('turn').textContent = String('Turn -> '+currentPlayer); 
        document.getElementById('err').textContent = '';
    };



function GameBox() {
    const arr = [
        [document.getElementById('OO').textContent, document.getElementById('OT').textContent, document.getElementById('OTh').textContent],
        [document.getElementById('TO').textContent, document.getElementById('TT').textContent, document.getElementById('TTh').textContent],
        [document.getElementById('ThO').textContent, document.getElementById('ThT').textContent, document.getElementById('ThTh').textContent]
    ];
    return arr;
}

function checkWinner(board) {
    const winConditions = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a[0]][a[1]] !== '' &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[b[0]][b[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
        }
    }

    return null;
}



boxes.forEach(box => {
    box.addEventListener('click', function () {
        if(this.textContent === ''){
                                this.textContent = currentPlayer;
                                const winner = checkWinner(GameBox());

                                if (winner) {
                                    console.log(`Player ${winner} wins!`);
                                    gameWindow.style.display = 'none';
                                    document.getElementById('won').textContent = String(currentPlayer + ' WON!!!')
                                    turn = turn+1;
                                    changePlayer();
                                }else if(turn == 9){document.getElementById('won').textContent = String('DRAW')
                                draw = true}
                                
                                }else{document.getElementById('err').textContent = 'invalid input.';}
    });
});

const startBtn = document.getElementById('startBtn');

function resetGame() {
    boxes.forEach(box => {
        box.textContent = '';
    });
    currentPlayer = 'X';
    gameWindow.style.display = 'flex';
    document.getElementById('turn').textContent = String('Turn -> '+currentPlayer);
    document.getElementById('won').textContent = ''
}

startBtn.addEventListener('click', resetGame);
