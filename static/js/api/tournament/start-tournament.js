function getTournamentData() {
    const urlParam = new URLSearchParams(window.location.search);
    const tournamentId = urlParam.get("id");

    const url = `http://localhost:8080/tournament/${tournamentId}`;

    fetchPerso(url, {
        method: "GET"
    })
    .then(t => {
        topContent = document.getElementsByClassName("tournament-started-main-info")[0];
        topContent.innerHTML = "";
        
        html = `
            <div class="tournament-started-title">
                <h1>${t.title}</h1>
                <p>{Description lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam at doloremque
                    incidunt.}</p>
            </div>

            <div class="tournament-started-short-info">
                <div class="t-short tourmanent-creator">
                    <label>Criador:</label>
                    <span>${null}</span>
                </div>

                <div class="t-short tourmanent-category">
                    <label>Categoria:</label>
                    <span>${t.modality}</span>
                </div>

                <div class="t-short tourmanent-teams-size">
                    <label>Times:</label>
                    <span>${t.minTeams} - ${t.maxTeams}</span>
                </div>

                <div class="t-short tourmanent-date">
                    <label>Data:</label>
                    <span>${null}</span>
                </div>
            </div>`;

        topContent.innerHTML += html;
        
    })
    .catch(e => {
        console.log(e);
        
    })
}

function getTeams() {
    const urlParam = new URLSearchParams(window.location.search);
    const tournamentId = urlParam.get("id");

    const teamsUrl = `http://localhost:8080/tournament/${tournamentId}/findteams`;

    fetchPerso(teamsUrl, {
        method: "GET"
    })
    .then(t => {
        let teamsDiv = document.getElementsByClassName("tournament-all-teams")[0];
        teamsDiv.innerHTML = "";
        console.log(t);

        console.log("---- " +!t);
        
        if(!t) {
            const notFoundText = "Nenhum time encontrado"
            const html = `<span>${notFoundText}</span>`;
            teamsDiv.innerHTML += html;
            return;
        }
        
        for (let e of t) {
            const html = `<div class="tourmanent-menu-partcipant-team"><h4>${t.name}</h4></div>`
            teamsDiv.innerHTML += html
        }
        
    })
    .catch(error => {
        console.log(error);
    })
}


getTournamentData();
getTeams();

