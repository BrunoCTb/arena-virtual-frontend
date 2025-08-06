function getTeam() {
    let urlParam = new URLSearchParams(window.location.search);
    let id = urlParam.get("teamId");

    const url = "http://localhost:8080/team/" + id;

    fetchPerso(url, {
        method: "GET"
    })
    .then(team => {
        console.log(team);
        

        let teamData = document.getElementsByClassName("team-data")[0];
        teamData.innerHTML = "";
        
        html = `<h2>${team.name}</h2>
                <p>${team.description}</p>

                <div class="team-others-data">
                    <div>
                        <span>Criador:</span>
                        <span>${team.createdBy.username}</span>
                    </div>
                    <div>
                        <span>Criado em:</span>
                        <span>${team.createdAt}</span>
                    </div>
                </div>`;

        teamData.innerHTML += html;
    })
    .catch(e => {
        console.log(e);
    })
}

function getPlayersFromTeam() {
    let urlParam = new URLSearchParams(window.location.search);
    let teamId = urlParam.get("teamId");

    const url = "http://localhost:8080/team/" + teamId + "/players";

    fetchPerso(url, {
        method: "GET"
    })
    .then(players => {
        let totalPlayersCount = document.getElementById("t-players-total-value");
        let playersListDiv = document.getElementsByClassName("t-list-of-players")[0];

        totalPlayersCount.innerHTML = players.length;
        
        for (let player of players) {
            playersHtml = `
                <div class="t-player-found">
                    <div class="t-player-img">
                        <img src="#" alt="">
                    </div>
                    <div class="t-player-data">
                        <span>${player.publicId}</span>
                        <span>${player.username}</span>
                    </div>
                    <div class="t-player-actions">
                        <a href="/pages/player-info.html">Ver perfil</a>
                    </div>
                </div>
            `

            playersListDiv.innerHTML += playersHtml;
        }

    })
    .catch(e => {
        console.log(e);
    })
}

getTeam();
getPlayersFromTeam();
