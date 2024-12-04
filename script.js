// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {

    // Select all elements with the class 'game-square' (likely representing game board squares)
    const squares = document.querySelectorAll('.game-square');

    // Select the element with ID 'turn' (used to track and display the current player's turn)
    const turnTracker = document.getElementById('turn');

    // Select the button element with ID 'button-play-again' (used to reset or replay the game)
    const playAgainButton = document.getElementById('button-play-again');

    // Initialize the game board as an array of 9 null values, representing empty squares
    let board = Array(9).fill(null);

    // Set the starting player to 'X'
    let currentTurn = 'X';

    // A flag to determine if the game is active (true = ongoing, false = ended)
    let gameActive = true;

    // Define the possible winning combinations for the game (e.g., rows, columns, diagonals)
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Left-to-right diagonal
        [2, 4, 6], // Right-to-left diagonal
    ];

    // Further functionality would go here to handle game logic, user interaction, etc.

    const checkWinner = () => {
        // Iterate over each winning combination in the array
        for (const [a, b, c] of winningCombinations) {
            // Check if the squares at indices a, b, and c are all occupied by the same player
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // If so, return the value at one of these indices (either 'X' or 'O') as the winner
                return board[a];
            }
        }
    
        // Check if all squares on the board are filled, indicating a tie
        if (board.every(square => square)) {
            // If every square is non-null and no winner is found, return 'Tie'
            return 'Tie';
        }
    
        // If no winner is found and the board is not full, return null (indicating the game continues)
        return null;
    }

        const handleSquareClick = (e) => {
            // Get the index of the clicked square by finding its position in the 'squares' NodeList
            const squareIndex = [...squares].indexOf(e.target);
        
            // If the game is not active or the square is already occupied, exit the function
            if (!gameActive || board[squareIndex]) return;
        
            // Update the board array at the clicked square's index with the current player's symbol ('X' or 'O')
            board[squareIndex] = currentTurn;
        
            // Update the clicked square's text content to display the current player's symbol
            e.target.textContent = currentTurn;
        
            // Check if there's a winner or a tie after the move
            const winner = checkWinner();
        
            // If a winner is found or the game ends in a tie
            if (winner) {
                // Update the turn tracker to display the winner or announce a tie
                turnTracker.textContent = winner === 'Tie' ? "It's a tie!" : `Player ${winner} wins!`;
                
                // Set the gameActive flag to false, indicating the game is over
                gameActive = false;
            } else {
                // If no winner is found, switch to the other player's turn
                currentTurn = currentTurn === 'X' ? 'O' : 'X';
        
                // Update the turn tracker to show which player's turn it is next
                turnTracker.textContent = currentTurn;
            }
        };
    
        

});
