function getTeam() {
    let urlParam = new URLSearchParams(window.location.search);
    let id = urlParam.get("teamId");

    const url = "http://localhost:8080/team/" + id;

    fetchPerso(url, {
        method: "GET"
    })
    .then(team => {
        let teamData = document.getElementsByClassName("team-data")[0];
        teamData.innerHTML = "";
        
        html = `<h2>${team.name}</h2>
                <p>${team.description}</p>

                <div class="team-visual-info">
                    <div>
                        <span>${null}</span>
                        <span>Jogadores</span>
                    </div>
                    <div>
                        <span>${null}</span>
                        <span>Partidas</span>
                    </div>
                    <div>
                        <span>${null}</span>
                        <span>Vitórias</span>
                    </div>
                    <div>
                        <span>${null}</span>
                        <span>Derrotas</span>
                    </div>
                </div>

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

getTeam();
