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
            if (response.status == 403) {
                localStorage.removeItem("authToken");
                window.location.href = "/pages/login.html";
                throw new Error("Não autorizado");
            } else {
                
            }
            
            return response; // <-- devolve o Response inteiro
        })
        .catch(error => {
            console.log("backend not working...");

            window.location.href = "/pages/error/backend-not-working.html"
        });
}
