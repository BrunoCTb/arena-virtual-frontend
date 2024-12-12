// SETAR OS NÍVEIS DE CRIAÇÃO DE CAMPEONATO
function changeLevel(event) {
    // os 3 itens que serao navegados
    let arr = document.getElementsByClassName("create-process");
    let balls = document.getElementsByClassName("process-visualize");
    const showDisplay = "flex";


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
            next.style.display = showDisplay;

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


// mudar quantidade de form dependendo de quantos formatos forem selecionados
function selectFormat() {
    // criar um novo form
    

    
}

// adicionar ou remover formatos - de 1 (pelo menos) até 3

const FORMAT_QUANTITY = 3
const removeFormatBtn = document.getElementById("remove-format");
const addFormatBtn = document.getElementById("add-format");
const formats = document.getElementsByClassName("format");

let currentFormat = 0;

removeFormatBtn.addEventListener("click", formatsConfig)
addFormatBtn.addEventListener("click", formatsConfig)

// adicionar/remover formatos, precisando ter ao menos 1 e limite de 3
function formatsConfig(event) {
    if (event.target == addFormatBtn && currentFormat < FORMAT_QUANTITY - 1 ) {
        formats[currentFormat+1].style.display = "block";
        currentFormat += 1;
        
    } else if (event.target == removeFormatBtn && currentFormat > 0) {
        formats[currentFormat].style.display = "none";
        currentFormat -= 1;
    }

}
