function getPlayer() {
    let publicId = localStorage.getItem("playerProfileIdSelected");
    
    // Ao dar reload não encontra nada
    // localStorage.removeItem("playerProfileIdSelected")

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
    
        for (let i=0; i<teams.length; i++) {
            html = `<div class="team1" >
                        <span>Time 1</span>
                </div>`;

            div.innerHTML += html;
        }

        div.style.display = "block";
    })
    .catch(error => { console.log(error); })
}


getPlayer();



