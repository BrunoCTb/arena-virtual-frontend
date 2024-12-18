// SETAR OS NÍVEIS DE CRIAÇÃO DE CAMPEONATO
function changeLevel(event) {
    let arr = document.getElementsByClassName("create-process");
    let balls = document.getElementsByClassName("process-visualize");
    const showDisplay = "flex";

    // Qual botao acionado (agora fora do loop)
    const isAdvance = event.target.id === "advance-level";
    const isReturn = event.target.id === "return-level";

    // loop de cada etapa para encontrar a atual
    for (let i = 0; i < arr.length; i++) {

        // a atual que sera a que está sendo mostrada logicamente sera substituida por outra
        if (arr[i].style.display !== "none") {
            // Define os próximos índices, podendo ser o anterior ou seguinte
            let nextIndex = isAdvance ? i + 1 : i - 1;

            // Impede o usuario de ir direto da etapa 1 para a 3 ou da 3 para 1,
            // no caso tendo que realizar o caminho '123' ou '321'
            if (nextIndex < 0 || nextIndex >= arr.length) {
                return; // assim causa o efeito de efeito nenhum
            }

            // a etapa atual fica "display none" e a proxima aparece, que pode ser a anterior
            arr[i].style.display = "none";
            arr[nextIndex].style.display = showDisplay;

            // atualiza as bolinhas visuais
            balls[i].style.backgroundColor = "#ffffff94";
            balls[nextIndex].style.backgroundColor = "#fff";

            break;
        }
    }
}

// Mudança de tipo de quantidade de times na etapa 1,
// podendo ser fixa (x times) ou dinâmica (de x até y)
function chooseTeamQuantityStyle(type) {
    let fixedDisplay = "flex";
    let dynamicDisplay = "none";
        
    if (type == "dynamic") {
        fixedDisplay = "none";
        dynamicDisplay = "flex";
    }

    let fixed = document.getElementsByClassName("fixed-teams-quantity")[0];
    fixed.style.display = fixedDisplay;

    let dynamic = document.getElementsByClassName("dynamic-teams-quantity")[0];
    dynamic.style.display = dynamicDisplay;
}


// Botões de avancer e retornar a etapa
returnBtn = document.getElementById("return-level");
advanceBtn = document.getElementById("advance-level");

advanceBtn.addEventListener("click", changeLevel);
returnBtn.addEventListener("click", changeLevel);

// Adicionar ou remover formatos - de 1 (pelo menos) até 3
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
