const api_url = "http://localhost:8080/tournament/all"

function getTournaments() {
    fetchPerso(api_url, {
        method: "GET"
    })
    .then(data => console.log("Dados recebidos: ", data))
    .catch(error => console.error("Erro: ", error));
}

getTournaments();
