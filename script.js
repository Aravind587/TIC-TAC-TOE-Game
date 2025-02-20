let board = [['', '', ''], ['', '', ''], ['', '', '']];
        let currentPlayer = 'X';

        function handleClick(row, col) {
            if (board[row][col] === '' && !isGameFinished()) {
                board[row][col] = currentPlayer;
                renderBoard();
                if (checkWinner(currentPlayer)) {
                    showPopup(`Player ${currentPlayer} wins!`);
                } else if (isBoardFull()) {
                    showPopup("It's a tie!");
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }

        function renderBoard() {
            let cells = document.querySelectorAll('.cell');
            for (let i = 0; i < cells.length; i++) {
                let row = Math.floor(i / 3);
                let col = i % 3;
                cells[i].textContent = board[row][col];
            }
        }

        function checkWinner(player) {
            for (let i = 0; i < 3; i++) {
                if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
                if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
            }
            if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
            if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
            return false;
        }

        function isBoardFull() {
            return board.flat().every(cell => cell !== '');
        }

        function isGameFinished() {
            return checkWinner('X') || checkWinner('O') || isBoardFull();
        }

        function showPopup(message) {
            document.getElementById('resultMessage').textContent = message;
            document.getElementById('resultPopup').style.display = 'flex';
        }

        function closePopup() {
            document.getElementById('resultPopup').style.display = 'none';
            resetBoard();
        }

        function resetBoard() {
            board = [['', '', ''], ['', '', ''], ['', '', '']];
            currentPlayer = 'X';
            renderBoard();
        }

        renderBoard();