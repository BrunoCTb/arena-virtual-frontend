const NAV_BAR_CONTENT = `
    <header>
        <div class="logo">
            <h1>Logo</h1>
        </div>

        <ul class="project-header-links">
            <a href="/pages/index.html"><li>Início</li></a>
            <a href="#"><li>Projeto</li></a>
            <a href="#"><li>Sobre</li></a>
        </ul>
        
        <ul class="app-header-links">
            <a href="#"><li>Campeonatos</li></a>
            <a href="/pages/create-tournament.html"><li>Criar campeonato (provisório)</li></a>
            <a href="#"><li>Times</li></a>
            <a href="#"><li>Ranking</li></a>
        </ul>
        
        <ul id="authFalse">
            <a href="/pages/login.html"><li>Login</li></a>
            <a href="/pages/register.html"><li>Cadastro</li></a>
        </ul>

        <ul id="authTrue">
            <span id="user-header-show">Email</span>
        </ul>
    </header>
` 

document.getElementById('header').innerHTML = NAV_BAR_CONTENT;

function updateHeader() {
    const api_url = "http://localhost:8080/user/auth" 

    fetchPerso(api_url, {
        method: "GET",
    })
    .then(data => {
        if (data) {
            document.getElementById("user-header-show").innerHTML = data;
            document.getElementById("authTrue").style.display = "flex";
            document.getElementById("authFalse").style.display = "none";
        } else {
            document.getElementById("authFalse").style.display = "flex";
            document.getElementById("authTrue").style.display = "none";
        }
    })
    .catch(error => console.error("Erro: ", error));
}

updateHeader()

