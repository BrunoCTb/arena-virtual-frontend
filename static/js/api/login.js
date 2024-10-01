const api_url = "http://localhost:8080/user/login";

document.getElementById("login-form").addEventListener("submit", async function (event) {
    // evitar o reload da página
    event.preventDefault();

    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    let bodyData = JSON.stringify({
        "login": login,
        "password": password,
    });

    console.log(bodyData);
    
    
    try {
        const responseApi = await fetch(api_url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: bodyData
        });
        
        const data = await responseApi.json();
        
        if (data.token) {
            localStorage.setItem("authToken", data.token)
            console.log("token armazenado com sucesso!");
        } else {
            console.log("token não recebido!");
        }

        console.log("enviado | " + responseApi);
    } catch (error) {
        console.log("erro | ", error);
    }

});
