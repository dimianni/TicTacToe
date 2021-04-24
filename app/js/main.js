
document.addEventListener("DOMContentLoaded", function () {

    const cells = document.querySelectorAll(".board-cell");
    const turn = document.querySelector(".turn");
    const reset = document.querySelector(".reset");


    function Player(id, img, className) {
        this.id = id
        this.img = img
        this.className = className
    }

    const player1 = new Player(1, "images/cross.svg", "cross")
    const player2 = new Player(2, "images/circle.svg", "circle")


    // On cell click
    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            move(this);
            checkWinner();
        })
    })

    // On reset click
    reset.addEventListener("click", function() {
       location.reload()
    })

    // Default
    let current = 1;
    turn.innerHTML = `Player <span class="active-turn">${current}</span> turn`

    function move(cell) {

        if (current === 1) {
            cell.querySelector("img").src = player1.img
            cell.classList.add(player1.className)
        } else {
            cell.querySelector("img").src = player2.img
            cell.classList.add(player2.className)
        }

        current === 1 ? current = 2 : current = 1;
        turn.innerHTML = `Player <span class="active-turn">${current}</span> turn`
    }

    function checkWinner() {


          // Check for a draw
        const cellsArr = [];
        for (let i = 0; i < cells.length; i++) {
            cellsArr.push(cells[i])
        }
        if (cellsArr.every(el => el.classList.contains(player1.className) || el.classList.contains(player2.className))) {
            turn.innerHTML = "Draw!"
            reset.classList.add("active")
        }

        // Loop through arrays of possible combinations
        for (let i = 0; i < combinations.length; i++) {

            // Winning combination cells
            let cell1 = cells[combinations[i][0]];
            let cell2 = cells[combinations[i][1]];
            let cell3 = cells[combinations[i][2]];

            if (cell1.classList.contains("cross") && cell2.classList.contains("cross") && cell3.classList.contains("cross")) {
                turn.innerHTML = `<div class="winner">Player ${player1.id} won!</div>`

                highlight([cell1, cell2, cell3])
                reset.classList.add("active")
            } else if (cell1.classList.contains("circle") && cell2.classList.contains("circle") && cell3.classList.contains("circle")){
                turn.innerHTML = `<div class="winner">Player ${player2.id} won!</div>`

                highlight([cell1, cell2, cell3])
                reset.classList.add("active")
            }
        }

    }

    const combinations = [
        [0, 1, 2], // <- for each of these arrays check if corresponding ids have same class (cross/circle)
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function highlight(arr) {
        arr.forEach(el => {
            el.classList.add("winning-cell")
        })
    }

})
