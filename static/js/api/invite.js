// MOSTRAR OS CONVITES RECEBIDOS NO HTML
function setReceivedInvite(username) {
	let receivedUrl = `http://localhost:8080/${username}/invites/received`;

	fetchPerso(receivedUrl, {
		method: "GET"
	})
		.then(data => data.json())
		.then(data => {
			let receivedInvitations = document.getElementsByClassName("received-invitations")[0];

			if (data.length == 0) {
				document.getElementById("not-found-received-invitations").innerHTML = "Nenhum convite recebido no momento"
				return;
			}

			for (let invite of data) {
				let inviteHTML = let = `
			<div class="received-invite"S>
				<div class="received-invite-content">
					<div class="received-invite-data">
						<h2 class="received-receivedTo">Solicitação do ${invite.invitedBy.username}</h2>
						<span class="received-receivedAt">Recebido em ${invite.createdAt}</span>
						<span class="received-target">Time: ${invite.teamTarget.name}</span>
					</div>
					<div class="received-invite-status">
						<span>${invite.inviteStatus}</span>
					</div>
				</div>
				<div class="received-invite-actions">
					<button class="received-accept-invite" data-invite-id="${invite.id}">Aceitar</button>
					<button class="received-reject-invite" data-invite-id="${invite.id}">Rejeitar</button>
				</div>
			</div>`;

				receivedInvitations.innerHTML += inviteHTML;

				document.querySelectorAll(".received-reject-invite").forEach(btn => {
					btn.addEventListener("click", () => {
						const inviteId = btn.dataset.inviteId;
						cancelInvite(inviteId);
					})
				});

				document.querySelectorAll(".received-accept-invite").forEach(btn => {
					btn.addEventListener("click", () => {
						const inviteId = btn.dataset.inviteId;
						acceptInvite(inviteId);
					});
				});
			}
		})
}

// MOSTRAR OS CONVITES ENVIADOS NO HTML
function setSentInvite(username) {

	let sentUrl = `http://localhost:8080/${username}/invites/sent`;

	fetchPerso(sentUrl, {
		method: "GET"
	})
		.then(data => data.json())
		.then(data => {
			let sentInvitations = document.getElementsByClassName("sent-invitations")[0];

			if (data.length == 0) {
				document.getElementById("not-found-sent-invitations").innerHTML = "Nenhum convite enviado no momento"
				return;
			}

			for (let invite of data) {
				let inviteHTML = let = `
			<div class="sent-invite">
				<div class="sent-invite-content">
					<div class="sent-invite-data">
						<h2 class="sent-sentTo">Convite para ${invite.invitedTarget.username}</h2>
						<span class="sent-sentAt">Enviado em ${invite.createdAt}</span>
						<span class="sent-target">Time: ${invite.teamTarget.name}</span>
					</div>
					<div class="sent-invite-status">
						<span>${invite.inviteStatus}</span>
					</div>
				</div>
				<div class="sent-invite-actions">
					<button class="cancel-btn" data-invite-id="${invite.id}">Cancelar</button>
				</div>
			</div>`;


				sentInvitations.innerHTML += inviteHTML;

				document.querySelectorAll(".cancel-btn").forEach(btn => {
					btn.addEventListener("click", () => {
						const inviteId = btn.dataset.inviteId;
						cancelInvite(inviteId);
					});
				});

			}
		})
}

function setTeamInvites() {
	url = "http://localhost:8080/user/auth/get"

	fetchPerso(url, {
		method: "GET"
	})
		.then(user => user.json())
		.then(user => {
			setReceivedInvite(user.username);
			setSentInvite(user.username);
		})
		.catch(e => {
			console.log("e: " + e);
		})
}

// main tab para tipo de convite geral ou tournament
function selectInviteMainTab() {
	document.addEventListener("DOMContentLoaded", () => {
		const mainTabs = document.querySelectorAll(".invite-type-menu-select span");
		const generalInvites = document.querySelector(".general-invites");
		const tournamentInvites = document.querySelector(".tournament-invites");

		mainTabs.forEach(tab => {
			tab.addEventListener("click", () => {
				// remove 'active' de todos
				mainTabs.forEach(t => t.classList.remove("active"));
				tab.classList.add("active");

				// mostrar/ocultar +seção correta
				if (tab.textContent.trim() === "Geral") {
					generalInvites.classList.add("m-active");
					tournamentInvites.classList.remove("m-active");

					generalInvites.style.display = "block";
					tournamentInvites.style.display = "none";
				} else {
					tournamentInvites.classList.add("m-active");
					generalInvites.classList.remove("m-active");

					generalInvites.style.display = "none";
					tournamentInvites.style.display = "block";
				}
			});
		});
	});
}

// sub tabs de convites -> recebidos ou enviados
function setupSubTabs(menuSelector, sectionSelector) {
    const menuItems = document.querySelectorAll(`${menuSelector} span`);
    const sections = document.querySelectorAll(`${sectionSelector} > div`);

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove "active" de todos os menus e seções desse grupo
            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Adiciona "active" no menu clicado
            item.classList.add('active');

            // Ativa a seção correspondente
            const targetClass = item.getAttribute('data-target');
            document.querySelector(`.${targetClass}`).classList.add('active');
        });
    });
}

const tournamentInvitesMap = new Map();

function setTournamentInvites() {
    const url = `http://localhost:8080/user/tournament/invites`;

    fetchPerso(url, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            const sentDiv = document.querySelector(".sent-tournament-invitations");
            const receivedDiv = document.querySelector(".received-tournament-invitations");

            // limpa conteúdo antigo
            sentDiv.innerHTML = "";
            receivedDiv.innerHTML = "";

            data.forEach(inviteWrapper => {
                const invite = inviteWrapper.tournamentInvite;
                const id = invite.id; 

                // salva cada invite no map em memoria
                tournamentInvitesMap.set(id, invite);

                let html = "";
                let container = null;

                if (inviteWrapper.isSent) {
                    container = sentDiv;

                    if (invite.senderType === "TOURNAMENT") {
                        // HTML do invite enviado pelo campeonato
                        html = `
                            <div class="sent-tournament-invite" data-id="${id}">
								<div class="tournament-invite-type">
									<h3>Solicitação enviada<h3>
								</div>
								<div class="sent-tournament-invite-date">
									<span>enviado em</span>
									<span>${invite.createdAt}</span>
								</div>
								<div class="sent-tournament-invite-data">
									<div>
										<span>De: Seu time </span>
										<a href="/pages/team-info.html?teamId=${invite.team.id}">${invite.team.name}</a>
									</div>
									<div>
										<span>Para o campeonato:</span>
										<a href="/pages/tournament/tournament-info.html?id=${invite.tournament.id}">${invite.tournament.title}</a>
									</div>
								</div>
								<div class="sent-tournament-invite-action">
                                	<button class="tournament-invite-details-btn">Ver detalhes</button>
								</div>
                            </div>`;
                    } else {
                        // HTML do invite enviado pelo time
                        html = `
							<div class="sent-tournament-invite" data-id="${id}">
								<div class="tournament-invite-type">
									<h3>Convite enviado</h3>
								</div>
								<div class="sent-tournament-invite-date">
									<span>Enviado em</span>
									<span>${invite.createdAt}</span>
								</div>
								<div class="sent-tournament-invite-data">
									<div>
										<span>De: seu Campeonato</span>
										<a href="/pages/tournament/tournament-info.html?id=${invite.tournament.id}">${invite.tournament.title}</a>
									</div>
									<div>
										<span>Para o time:</span>
										<a href="/pages/team-info.html?teamId=${invite.team.id}">${invite.team.name}</a>
									</div>
								</div>
								<div class="sent-tournament-invite-action">
									<button class="tournament-invite-details-btn">Ver detalhes</button>
								</div>
							</div>`;
                    }

                } else {
                    container = receivedDiv;

                    if (invite.senderType === "TOURNAMENT") {
                        // HTML do invite recebido do campeonato
                        html = `
                            <div class="received-tournament-invite" data-id="${id}">
								<div class="tournament-invite-type">
									<h3>Solicitação recebida</h3>
								</div>
								<div class="received-tournament-invite-date">
									<span>Recebido em</span>
									<span>${invite.createdAt}</span>
								</div>
								<div class="received-tournament-invite-data">
									<div>
										<span>De: Time </span>
										<a href="/pages/team-info.html?teamId=${invite.team.id}">${invite.team.name}</a>
									</div>
									<div>
										<span>Para: seu campeonato:</span>
										<a href="/pages/tournament/tournament-info.html?id=${invite.tournament.id}">${invite.tournament.title}</a>
									</div>
								</div>
								<div class="received-tournament-invite-action">
									<button class="tournament-invite-details-btn">Ver detalhes</button>
								</div>
							</div>`;
                    } else {
                        // HTML do invite recebido do time
                        html = `
							<div class="received-tournament-invite" data-id="${id}">
								<div class="tournament-invite-type">
									<h3>Convite recebido</h3>
								</div>
								<div class="received-tournament-invite-date">
									<span>Recebido em</span>
									<span>${invite.createdAt}</span>
								</div>
								<div class="received-tournament-invite-data">
									<div>
										<span>De: Campeonato </span>
										<a href="/pages/tournament/tournament-info.html?id=${invite.tournament.id}">${invite.tournament.title}</a>
									</div>
									<div>
										<span>Para seu time:</span>
										<a href="/pages/team-info.html?teamId=${invite.team.id}">${invite.team.name}</a>
									</div>
								</div>
								<div class="received-tournament-invite-action">
									<button class="tournament-invite-details-btn">Ver detalhes</button>
								</div>
							</div>`;
                    }
                }

                container.innerHTML += html;
            });

            setupInviteClick();
        })
        .catch(e => console.log(e));
}


// setar os event click para cada tournament invite
function setupInviteClick() {
    document.querySelectorAll(".tournament-invite-details-btn").forEach(btn => {
        btn.addEventListener("click", e => {
			// nao deixar click externo ao abrir o card
            e.stopPropagation(); 

            // sobe até a div do convite (pai) para pegar o data-id
            const parentDiv = btn.closest(".sent-tournament-invite, .received-tournament-invite");
            const id = parentDiv.dataset.id;

            const invite = tournamentInvitesMap.get(id);

            openInviteCard(invite);
        });
    });
}


function openInviteCard(invite) {
    console.log("Abrir card para: ", invite);
}

async function cancelInvite(inviteId) {
	bodyData = JSON.stringify({
		"acceptInvite": false
	});

	try {
		url = `http://localhost:8080/invite/${inviteId}`;

		let resp = await fetchPerso(url, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			body: bodyData
		})
		alert("Convite removido")
		window.location.reload();
	} catch (error) {
		console.log("catch => " + error);
	}
}

async function acceptInvite(inviteId) {
	bodyData = JSON.stringify({
		"acceptInvite": true
	});

	try {
		url = `
				"Accept": "application/json",http://localhost:8080/invite/${inviteId}`;

		let resp = await fetchPerso(url, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			body: bodyData
		})

		alert("Convite aceito")
		window.location.reload();
	} catch (error) {
		console.log("catch => " + error);
	}
}


setTournamentInvites()
setTeamInvites();
selectInviteMainTab();

// chamar funcao para as subtabs dos team invites e tournament invites
setupSubTabs('.invites-menu-select', '.all-general-invites');
setupSubTabs('.tournament-invites-menu-select', '.all-tournament-invites');

