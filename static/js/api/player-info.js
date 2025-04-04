function getPlayer() {
    let publicId = localStorage.getItem("playerProfileIdSelected");
    
    localStorage.removeItem("playerProfileIdSelected")

    const url = 'http://localhost:8080/player/' + publicId; 

    fetchPerso(url, {
        method: "GET"
    })
    .then(player => {
        console.log(player);

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

getPlayer();



