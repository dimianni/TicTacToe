document.addEventListener("DOMContentLoaded", function () {

    const figures = ["images/cross.svg", "images/circle.svg"],
        classes = ["cross", "circle"],
        cells = document.querySelectorAll(".board-row__el"),
        player = document.querySelector(".turn-who"),
        winner = document.querySelector(".winner");

    // Default
    let turn = 1;
    player.innerHTML = turn;

    cells.forEach(cell => {

        cell.addEventListener("click", function () {

            const self = this,
                img = this.querySelector("img")

                
            const check = el => self.classList.contains(el);
            if (classes.some(check)) {
                console.log("already taken");
                return;
            }

            // if it is player 1 turn...
            if (turn % 2 !== 0) {

                // put a cross on cell click
                img.src = figures[0];
                this.classList.add("cross")
                player.innerHTML = 2;

            } else {

                img.src = figures[1];
                this.classList.add("circle");
                player.innerHTML = 1;

            }

            checkWinner()

            turn++;

        })

    })


    const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const checkWinner = () => {

        for (let i = 0; i < combinations.length; i++) {
            if (cells[combinations[i][0]].classList.contains("cross") && cells[combinations[i][1]].classList.contains("cross") && cells[combinations[i][2]].classList.contains("cross")) {
                winner.classList.add("active")
            }
            if (cells[combinations[i][0]].classList.contains("circle") && cells[combinations[i][1]].classList.contains("circle") && cells[combinations[i][2]].classList.contains("circle")) {
                winner.classList.add("active")
            }
        }

    }

})