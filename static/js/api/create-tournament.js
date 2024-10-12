// SETAR OS NÍVEIS DE CRIAÇÃO DE CAMPEONATO

/**
 * @param {number} level // ex: 1, 2 ou 3
 * 
*/
function changeLevel(event) {
    // os 3 itens que serao navegados
    let arr = document.getElementsByClassName("create-process");
    let balls = document.getElementsByClassName("process-visualize");


    for (let i = 0; i < arr.length; i++) {
        if (event.target.id == "advance-level") {
            console.log("advance");
            next = arr[i + 1] || arr[0];
            nextBall = balls[i + 1] || balls[0];
            
        } else if (event.target.id == "return-level") {
            console.log("return");
            next = arr[i - 1] || arr[arr.length - 1];
            nextBall = balls[i - 1] || balls[balls.length - 1];
        }

        if (arr[i].style.display != "none") {
            arr[i].style.display = "none";
            next.style.display = "flex";

            nextBall.style.backgroundColor = "#fff";
            balls[i].style.backgroundColor = "#ffffff94";

            break
        }
    }
}

returnBtn = document.getElementById("return-level");
advanceBtn = document.getElementById("advance-level");

advanceBtn.addEventListener("click", changeLevel);
returnBtn.addEventListener("click", changeLevel);
