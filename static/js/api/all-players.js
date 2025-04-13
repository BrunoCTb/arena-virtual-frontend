const apiUrl = 'http://localhost:8080/players'; 

function getAllPlayers(url) {
    fetchPerso(url, {
        method: "GET"
    })
    .then(players => {
        let playerList = document.getElementsByClassName("list-of-players")[0];
        console.log(players);
        
        for (p of players) {
            playerHTML = `<div class="player player${p.publicId}">
                            <div class="player-img">
                                <img src="#" alt="">
                            </div>

                            <div class="player-data">
                                <div class="player-info">
                                    <h3>${p.username}</h3>
                                    <div class="player-current">
                                        <div class="player-tournaments">
                                            <span>null</span>
                                            <span>times</span>
                                        </div>
                                        <div class="player-teams">
                                            <span>null</span>
                                            <span>campeonatos</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="player-actions">
                                    <a href="/pages/player-info.html?playerId=${p.publicId}">Ver perfil</a>
                                </div>
                            </div>
                        </div>`

            playerList.innerHTML += playerHTML;
        }
    })
    .catch(error => { console.log(error); })
}

getAllPlayers(apiUrl)

