function getAllTeams() {
    const apiUrl = "http://localhost:8080/team/all";

    fetchPerso(apiUrl, {
        method: "GET"
    })
    .then(teams => {
        // quantidade encontrada
        document.getElementById("teams-quantity-found").innerHTML = teams.length;

        let teamsList = document.getElementsByClassName("list-of-teams")[0];
        teamsList.innerHTML = "";

        console.log(teamsList);
        
        for (t of teams) {
            html = `<div class="team-data">
                    <div class="team-card">
                        <div class="tm-image">
                            <img src="#" alt="">
                        </div>
                        <div class="tm-content">
                            <div class="tm-title">
                                <h3>${t.name}</h3>
                            </div>
                            <div class="tm-info">
                                <div>
                                    <span>Jogadores:</span>
                                    <span>${t.quantity}</span>
                                </div>
                                <div>
                                    <span>Aberto para convite:</span>
                                    <span>${t.openToInvite}</span>
                                </div>
                                <div>
                                    <span>Campeonatos participando:</span>
                                    <span>${null}</span>
                                </div>
                                <div>
                                    <span>Criador:</span>
                                    <span>${t.createdBy.username}</span>
                                </div>
                            </div>
                            <div class="tm-actions">
                                <a href="/pages/team-info.html?teamId=${t.id}">Ver detalhes</a>
                            </div>
                        </div>
                    </div>
                </div>`;

            teamsList.innerHTML += html;
        }

    })
    .catch(error => {
        console.log(error);
    })
}

getAllTeams();
