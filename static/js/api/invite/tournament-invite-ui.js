export function openDinTournamentInviteCard(invite) {
    const cardType = invite.isSent ? "sent" : "received"; // diferenciar se o invite foi enviado ou recebido
    const cardDivBase = `card-${cardType}-tournament-invite`;
    const card = document.querySelector(`.${cardDivBase}`);

    clearCardContent(card, cardDivBase);

    // ====== TÍTULO ======
    const titleEl = card.querySelector(`.${cardDivBase}-title`);
    const titleText = invite.isSent ? "Convite Enviado" : "Convite Recebido";
    titleEl.innerHTML = `<h2>${titleText}</h2>`;

    // ====== RELAÇÃO (quem envia / para quem envia) ======
    const relContainer = card.querySelector(`.${cardDivBase}-rel`);
    const spanFrom = document.createElement("span");
    const spanTo = document.createElement("span");

    if (invite.invite.senderType === "TOURNAMENT") {
        spanFrom.textContent = `De: ${invite.invite.tournament.title}`;
        spanTo.textContent = `Para: ${invite.invite.team.name}`;
    } else {
        spanFrom.textContent = `De: ${invite.invite.team.name}`;
        spanTo.textContent = `Para: ${invite.invite.tournament.title}`;
    }
    relContainer.append(spanFrom, spanTo);

    // ====== DESCRIÇÃO ======
    const descriptionEl = card.querySelector(`.${cardDivBase}-description`);
    const descriptionP = document.createElement("p");
    descriptionP.textContent = invite.description || "Sem descrição";
    descriptionEl.appendChild(descriptionP);

    // ====== DATAS (quando criou o invite e qnd expira) ======
    const dateEl = card.querySelector(`.${cardDivBase}-date`);
    dateEl.innerHTML = "";

    const sentDateSpan = document.createElement("span");
    const expDateSpan = document.createElement("span");
    const sentDate = new Date(invite.invite.createdAt).toLocaleString();
    const expDate = invite.invite.expiration
        ? new Date(invite.invite.expiration).toLocaleString()
        : null;

    sentDateSpan.textContent = `Enviado em: ${sentDate}`;
    dateEl.appendChild(sentDateSpan);
    if (expDate) {
        expDateSpan.textContent = `Expira em: ${expDate}`;
        dateEl.appendChild(expDateSpan);
    }

    // ====== BOTOES DE ACEITE/REJEITE ======
    const actionsContainer = card.querySelector(`.${cardDivBase}-actions`);
    actionsContainer.innerHTML = ""; 

    if (invite.isSent) {
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancelar";
        actionsContainer.appendChild(cancelBtn);
    } else {
        const acceptBtn = document.createElement("button");
        const rejectBtn = document.createElement("button");
        acceptBtn.textContent = "Aceitar";
        rejectBtn.textContent = "Recusar";
        actionsContainer.append(acceptBtn, rejectBtn);
    }

    card.classList.add("active");
    showCard(cardType);
}


function clearCardContent(card, cardDivBase) {
    card.querySelector(`.${cardDivBase}-title`).textContent = "";
    card.querySelector(`.${cardDivBase}-rel`).innerHTML = "";
    card.querySelector(`.${cardDivBase}-description`).textContent = "";
    card.querySelector(`.${cardDivBase}-date`).textContent = "";
    card.querySelector(`.${cardDivBase}-actions`).innerHTML = "";
}


document.querySelectorAll(".close-card-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card-received-tournament-invite, .card-sent-tournament-invite");
        hideCard(card);
    });
});

function showCard(type) {
    const overlay = document.getElementById("inviteOverlay");
    const allCards = document.querySelectorAll(
        ".card-received-tournament-invite, .card-sent-tournament-invite"
    );
    const card = document.querySelector(`.card-${type}-tournament-invite`);

    // fecha todos os cards antes de abrir o novo
    allCards.forEach((c) => {
        c.classList.remove("active");
        c.style.display = "none";
    });

    overlay.classList.add("active");

    card.style.display = "flex";
    card.classList.add("active");

    // configurar botão de fechar
    const closeBtn = card.querySelector(".close-card-btn");
    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            hideCard();
        };
    }

    // fechar quando clicar fora do cards
    overlay.onclick = (e) => {
        if (e.target === overlay) hideCard();
    };
}

function hideCard() {
    const overlay = document.getElementById("inviteOverlay");
    overlay.classList.remove("active");

    document
        .querySelectorAll(".card-received-tournament-invite, .card-sent-tournament-invite")
        .forEach((c) => {
            c.classList.remove("active");
            c.style.display = "none"; // força sumir mesmo se o CSS bugar
        });
}