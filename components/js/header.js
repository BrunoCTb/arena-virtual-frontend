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
            <a href="#"><li>Times</li></a>
            <a href="#"><li>Ranking</li></a>
        </ul>
        
        <ul class="authFalse">
            <a href="/pages/login.html"><li>Login</li></a>
            <a href="/pages/register.html"><li>Cadastro</li></a>
        </ul>

        <ul class="authTrue">
            <span>Email</span>
        </ul>
    </header>
` 

document.getElementById('header').innerHTML = NAV_BAR_CONTENT;


console.log();

