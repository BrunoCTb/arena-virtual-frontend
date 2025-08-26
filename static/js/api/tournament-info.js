function getTournament() {
    const urlParam = new URLSearchParams(window.location.search);
    const tournamentId = urlParam.get("id");

    const url = 'http://localhost:8080/tournament/' + tournamentId;

    fetchPerso(url, {
        method: "GET"
    })
    // .then(t => t.json())
    .then(t => {
        let mainCard = document.getElementsByClassName("tournament-main-card")[0];
        mainCard.innerHTML = "";

        html = `<div class="tournament-image">
                    <img src="#">
                </div>
                <div class="tournament-main-content">
                    <div class="tournament-main-info">
                        <div class="tournament-title">
                            <h2>${t.title}</h2>
                            <span>${t.status}</span>
                        </div>
                        <div class="tournament-category">
                            <span>${t.category}</span>
                        </div>
                        <div class="tournament-description">
                            <span>${t.description}</span>
                        </div>
                    </div>

                    <div class="tournament-visual-content">
                        <div class="tournament-teams-quantity">
                            <span>Times</span>
                            <span>${null}</span>
                        </div>
                        <div class="tournament-award">
                            <span>Premiação</span>
                            <span>${null}</span>
                        </div>
                    </div>

                    <div class="tournament-other-data">
                        <div>
                            <span>Início:</span>
                            <span>${null}</span>
                        </div>
                        <div>
                            <span>Finaliza em:</span>
                            <span>${null}</span>
                        </div>
                        <div>
                            <span>Criador:</span>
                            <span>${null}</span>
                        </div><div>
                            <span>Criado em:</span>
                            <span>${null}</span>
                        </div>
                    </div>

                    <div class="tournament-rules">
                        <ul class="tournament-rules-list">
                            <li>${null}</li>
                            <li>${null}</li>
                            <li>${null}</li>
                        </ul>
                    </div>
                </div>`;

        mainCard.innerHTML += html;
    })
    .catch(error => {
        console.log(error);
    })
}

getTournament();
