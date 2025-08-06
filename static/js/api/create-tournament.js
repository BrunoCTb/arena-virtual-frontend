async function finishesCreation(json) {
    bodyData = JSON.stringify(json);

    try {
        const url = "http://localhost:8080/tournament/create"

        let resp = await fetchPerso(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: bodyData
        })

        alert("Campeonato criado com sucesso!");
        window.location.href = "/pages/"

    } catch (error) {
        console.log("catch => " + error);
    }
}

function getFormData() {
    let step1 = document.getElementsByClassName("level-one")[0];
    let d1 = step1.querySelectorAll(".getData1");

    let title = d1[0].value;
    let description = d1[1].value;

    let teamsTotal = d1[2].value;
    let teamsMin, teamsMax;

    let dinamicTeamsDiv = document.getElementsByClassName("dynamic-teams-quantity")[0];

    if (dinamicTeamsDiv.style.display == "none") {
        teamsMin = teamsMax = teamsTotal;
    } else {
        teamsMin = d1[3].value;
        teamsMax = d1[4].value;
    }
    
    let image = "image.png";
    
    let step3 = document.getElementsByClassName("level-three")[0];
    let d3 = step3.querySelectorAll(".getData3");
    
    let online = true;
    if (!d3[0].checked) {
        online = false;
    }
    
    let modality = d3[2].value;

    json = {
        "title": title,
        "modality": modality,
        "onlineMode": online, 
        "totalTeams": teamsTotal,
        "minTeams": teamsMin,
        "maxTeams": teamsMax,
        "totalTeams": teamsTotal,
        "imageRepresentationUrl": image,
        "format": null
    };

    finishesCreation(json)
}

function getFormats() { 
    let formatsArray = []
    let formats = document.getElementsByClassName("format");    

    for (let i=0; i<formats.length; i++) {
        if (window.getComputedStyle(formats[i]).display == 'block') {
            let select = formats[i].querySelector('select');
            let input = formats[i].querySelector('input[type="number"]');

            // adicionar no array cada formato selecionado com os atributos
            formatsArray.push({
                select: select.value,
                input: input.value 
            });
        }
    }

    return formatsArray;
}

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

            if (isAdvance && nextIndex >= arr.length) {
                getFormData();
                return;
            }

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
        
    // resetar o outro modo do input oculto
    let qtdInputs = document.querySelectorAll(".teams-quantity input");
    console.log(qtdInputs);

    qtdInputs.forEach(e => {
        e.value = "";
    });
    
    if (type == "dynamic") {
        fixedDisplay = "none";
        dynamicDisplay = "flex";
        // resetar o outro modo do input oculto
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
// FINALIZAR CRIAÇÃO DO CAMPEONATO