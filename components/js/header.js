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
            <a href="/pages/all-tournaments.html"><li>Campeonatos</li></a>
            <a href="/pages/all-players.html"><li>Jogadores</li></a>
            <a href="/pages/all-teams.html""><li>Times</li></a>
            <a href="#"><li>Ranking</li></a>
        </ul>
        
        <ul id="authFalse">
            <a href="/pages/login.html"><li>Login</li></a>
            <a href="/pages/register.html"><li>Cadastro</li></a>
        </ul>

        <ul id="authTrue" onclick="openProfileCard()">
            <div class="profileIdt">
                <span id="user-header-show">Email</span>
                <img src="https://cdn-icons-png.flaticon.com/512/54/54785.png">
            </div>

            <ul class="auth-options-card">
                <li><a href="/pages/profile/profile.html" id="header-profile-link">Perfil</a></li>
                <li><a href="/pages/profile/invites.html" id="header-invite-link">Convites</a></li>
            </ul>
        </ul>
        

    </header>
` ;

function openProfileCard() {
    let card = document.getElementsByClassName("auth-options-card")[0];
    let trigger = document.getElementById("authTrue");

    let profileLink = document.getElementById("header-profile-link");;

    card.style.display = "flex";

    // Define o event listener para clicar fora
    function handleOutsideClick(event) {
        if (!card.contains(event.target) && !trigger.contains(event.target)) {
            card.style.display = "none";

            // Remove o event listener depois de usado
            document.removeEventListener("click", handleOutsideClick);
        }
    }

    // Timeout necessário para não capturar o clique de abertura como "fora"
    setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
    }, 0);
}




document.getElementById('header').innerHTML = NAV_BAR_CONTENT;
function updateHeader() {
    const api_url = "http://localhost:8080/user/auth" 

    fetchPerso(api_url, {
        method: "GET",
    })
    .then(data => {
        const profileMsg = "Olá!";
        if (data) {
            document.getElementById("user-header-show").innerHTML = profileMsg;
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

