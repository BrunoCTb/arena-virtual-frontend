const API_URL = 'http://localhost:8080/';

fetch(API_URL)
    .then(response => response.text())
    .then(data => {
        console.log("api test");

    })
    .catch(error => {
        document.write("ERRO: " + error)
    }
    );