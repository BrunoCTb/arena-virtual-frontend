const api_url = "http://localhost:8080/tournament/all"

function getTournaments() {
    fetchPerso(api_url, {
        method: "GET"
    })
    .then(data => data)
    .catch(error => console.error("Erro: ", error));
}

// getTournaments();

// RECEBE OS TORNEIOS DISPONIVEIS DO BACKEND E MODIFICA O HTML
function setTournaments() { 
    const url = "http://localhost:8080/tournament/all";

    fetchPerso(api_url, {
        method: "GET"
    })
    .then(data => {
        let tournaments = document.getElementsByClassName("list-of-tournaments")[0];
        
        for (let t of data) {
            var tournamentHTML = 
            `
            <div class="tournament">
                <div class="tournament-image">
                    <img src="" alt="tournament image">
                </div>
        
                <div class="tournament-info">
                    <div class="t-title">
                        <span id="tournament-title">${t.title}</span>
                    </div>
                    <div class="t-sec-info">
                        <span id="tournament-teams-quantity">Quantidade de times: ${t.teamsQuantity}</span>
                        <span id="tournament-online-mode">Online: ${t.onlineMode}</span>
                        <span id="tournament-modality">Modalidade: ${t.modality}</span>
                        <span id="tournament-formats">Formatos: ${t.format}</span>
                    </div>
        
                    <div class="t-time">
                        <span id="tournament-formats">Criado em: ${t.createdAt}</span>
                        <span id="tournament-formats">Termino em: ${t.endsAt}</span>
                    </div>
                </div>
        
                <div class="tournament-actions">
                    <button>Ver detalhes</button>
                    <button>Solicitar participação</button>
                </div>
            </div>

            `
            tournaments.innerHTML += tournamentHTML;
        }
        

    })
    .catch(error => console.error("Erro: ", error));
    
}

setTournaments();
