const api_url = "http://localhost:8080/user/register";

document.getElementById("register-form").addEventListener("submit", async function (event) {
    // evitar o reload da página
    event.preventDefault();

    let username = document.getElementById("username").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let bodyData = JSON.stringify({
        "username": username,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword
    });

    try {
        const response = await fetch(api_url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: bodyData
        });

        console.log("enviado | " + response);
    } catch (error) {
        console.log("erro | ", error);
    }
});
