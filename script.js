let board = [['', '', ''], ['', '', ''], ['', '', '']];
        let currentPlayer = 'X';

        function handleClick(row, col) {
            if (board[row][col] === '') {
                board[row][col] = currentPlayer;
                document.getElementsByClassName('row')[row].children[col].textContent = currentPlayer;
                if (checkWinner()) {
                    showPopup(`Player ${currentPlayer} you won the game!`);
                } else if (isBoardFull()) {
                    showPopup("It's a tie!");
                } else {
                    switchPlayer();
                }
            }
        }

        function switchPlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('playerX').classList.toggle('active', currentPlayer === 'X');
            document.getElementById('playerO').classList.toggle('active', currentPlayer === 'O');
        }

        function checkWinner() {
            return board.some(row => row.every(cell => cell === currentPlayer)) ||
                   [0, 1, 2].some(col => board.every(row => row[col] === currentPlayer)) ||
                   [board[0][0], board[1][1], board[2][2]].every(cell => cell === currentPlayer) ||
                   [board[0][2], board[1][1], board[2][0]].every(cell => cell === currentPlayer);
        }

        function isBoardFull() {
            return board.flat().every(cell => cell !== '');
        }

        function showPopup(message) {
            document.getElementById('resultMessage').textContent = message;
            document.getElementById('resultPopup').style.display = 'block';
            document.getElementById('gameContainer').classList.add('blurred');
        }

        function closePopup() {
            document.getElementById('resultPopup').style.display = 'none';
            document.getElementById('gameContainer').classList.remove('blurred');
            resetBoard();
        }

        function resetBoard() {
            board = [['', '', ''], ['', '', ''], ['', '', '']];
            document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
            currentPlayer = 'X';
            switchPlayer();
        }