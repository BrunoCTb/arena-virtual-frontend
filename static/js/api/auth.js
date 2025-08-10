// fetch personalizado
function fetchPerso(url, options = {}) {
    const token = localStorage.getItem("authToken");

    if (!options.headers) {
        options.headers = {};
    }

    // enviar o token com o prefix bearer para o backend identificar e fazer o replace
    if (token) {
        options.headers['Authorization'] = "Bearer " + token;
    }

    return fetch(url, options)
        .then(response => {
            // caso nao esteja autorizado ou autenticado
            // ira remover o token caso tenha e redirecionar para login
            if (response.status == 403) { 
                localStorage.removeItem("authToken");
                window.location.href = "/pages/login.html";
                return;   
            }

            if (!response.ok) {
                console.log("falha na resposta");
                return;
            }
            
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch {
                    return text;
                }
            });
        })
        .catch(error => {
            console.log("errooo" + error);
            return;
        })
}
