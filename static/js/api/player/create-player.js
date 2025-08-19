async function createPlayer() {
    let username = document.getElementById("player-username");
    let imageUrl = "test.png";

    let bodyData = JSON.stringify({
        "username": username.value,
        "imageUrl": imageUrl
    });
    
    try {
        let url = `http://localhost:8080/user/player`;

        let resp = await fetchPerso(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: bodyData
        });

        let data = await resp.text();

        if (!resp.ok) {
            console.error("Erro no backend:", data);
            
            let formClass = document.getElementsByClassName("form-error")[0];

            const errorHtml = `
                <span>${data}</span>`;

            formClass.innerHTML = errorHtml;

            return;
        }

        alert("Você é um player agora! Bem vindo " + username.value);
        window.location.href = "/pages/";

    } catch (e) {
        console.error("Erro na requisição:", e.message);
    }
}
