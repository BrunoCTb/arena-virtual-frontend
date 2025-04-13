function getPlayer() {
    // let publicId = localStorage.getItem("playerProfileIdSelected");
    const urlParm = new URLSearchParams(window.location.search);
    const publicId = urlParm.get("playerId")
    
    const url = 'http://localhost:8080/player/' + publicId; 

    fetchPerso(url, {
        method: "GET"
    })
    .then(player => {
        let playerCard = document.getElementsByClassName("player-card")[0];

        let playerCardContent = `<div class="div-player-image">
            <img src="#" alt="player-img">
        </div>
        <div class="player-main-info">
            <h2>${player.username}</h2>
            <p>${null} (description)</p>
            <div class="player-others-info">
                <span>Infomações do jogador</span>
                <div>
                    <span>Desde:</span>
                    <span>${null} (quando criou a conta)</span>
                </div>
            </div>
        </div>`

        playerCard.innerHTML += playerCardContent;
    })
    .catch(error => {
        console.log(error);
    });
}

// map que armazena os tiemes e é usado 
// para buscar um especifico quando clicado no html 
let userCreatedTeams = new Map();

/* 
    - Deve estar logado
    - Deve ter ao menos um time criado
    - Será mostrado um card para escolher qual time que criou quer convidar
*/
function openUserCreatedTeamsCard() {
    const url = "http://localhost:8080/user/my/teams";

    fetchPerso(url, {
        method: "GET"
    })
    .then(teams => {
        let div = document.getElementsByClassName("user-created-teams")[0];
    
        div.innerHTML = "";
        let teamData = div.getElementsByClassName(".team-data");

        div.innerHTML += `<label>Seus times criados:</label>`;
        for (let i=0; i<teams.length; i++) {
            html = `<div class="team-data" onclick="createInvite(this)">
                        <span class="team-data-name">${teams[i].name}</span>
                    </div>`;
                    
            userCreatedTeams.set(teams[i].name, teams[i]);
    
            div.innerHTML += html;
        }

        div.style.display = "flex";
    })
    .catch(error => { console.log(error); })
}

async function createInvite(e) {    
    try {
        // pega a div mais proxima que tem o nome do time do elemento clicado
        let teamName = e.querySelector(".team-data-name").innerHTML;

        let playerId = localStorage.getItem("playerProfileIdSelected");
        
        let team = userCreatedTeams.get(teamName);
        
        // let x = 'b637685a-cca6-4114-928d-1832da7e6b19'   
        url = "http://localhost:8080/team/" + team.id + "/invite/send";
        
        let bodyData = JSON.stringify({
            "playerPublicId": playerId
        })

        let resp = await fetchPerso(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: bodyData
        })

        if(!resp) {
            console.log("ERRO!");
            throw "Não é possível enviar o convite para si mesmo ou player não encontrado!"
        }

        console.log("convite criado | backend: " + resp);

    } catch (error) {
        console.log("erro ao criar invite: " + error);
    }
}


getPlayer();



