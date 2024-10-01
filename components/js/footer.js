const FOOTER_CONTENT = `
    <footer>
        <div class="footer-up">
            <div class="footer-logo">
                <span>Logo</span>
            </div>
            
            <div class="footer-items">
                <ul>
                    <li><a href="#">Sobre</a></li>
                </ul>    
                <ul>
                    <li><a href="#">Contato</a></li>
                </ul>
                <ul>
                    <li><a href="#">Projeto</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <ul class="footer-social-links">
                <li><a href="#"><img src="/static/images/icons/github.png" alt="Github"></a></li>
                <li><a href="#"><img src="/static/images/icons/linkedin.png" alt="LinkedIn"></a></li>
            </ul>
        </div>
    </footer>
`

document.getElementById("footer").innerHTML = FOOTER_CONTENT;
