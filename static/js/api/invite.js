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

function setTournamentInvites() {
	url = `http://localhost:8080/user/tournament/invites`
	// url = `http://localhost:8080/team/all`

	fetchPerso(url, {
		method: "GET"
	})
		.then(data => data.json())
		.then(data => {
			for (let i of data) {
				sentDiv = document.getElementsByClassName("sent-tournament-invitations")[0];
				receivedDiv = document.getElementsByClassName("received-tournament-invitations")[0];

				if (i.isSent) {
					
					console.log(i.tournamentInvite.senderType == "TOURNAMENT");
					
					if (i.tournamentInvite.senderType == "TOURNAMENT") {
						jsonData = i.tournamentInvite;
						subSentDiv = ` <div class="sent-tournament-data">
										<span>Enviado para o time <a href="/pages/team-info.html?teamId=${jsonData.team.id}">${jsonData.team.name}</a></span>
										<span>Do campeonato <a href="/pages/tournament/tournament-info.html?id=${jsonData.tournament.id}">${jsonData.tournament.title}</a></span>
									</div>`;

					} else if (i.tournamentInvite.senderType == "TEAM") {
						jsonData = i.tournamentInvite;
						subSentDiv = ` <div class="sent-tournament-data">
										<span>Enviado para o campeonato <a href="/pages/tournament/tournament-info.html?id=${jsonData.tournament.id}">${jsonData.tournament.title}</a></span>
										<span>Do time <a href="/pages/team-info.html?teamId=${jsonData.team.id}">${jsonData.team.name}</a></span>
									</div>`;
					}

					html = `
					<div class="sent-tournament-invite">
						${subSentDiv}
						<button>Cancelar envio</button>
					</div>`;

					sentDiv.innerHTML += html;
				} else {
					if (i.tournamentInvite.senderType == "TOURNAMENT") {
						jsonData = i.tournamentInvite;
						subReceivedDiv = ` <div class="received-tournament-data">
												<span>Recebido do campeonato <a href="/pages/tournament/tournament-info.html?id=${jsonData.tournament.id}">${jsonData.tournament.title}</a></span>
												<span>Para o time <a href="/pages/team-info.html?teamId=${jsonData.team.id}">${jsonData.team.name}</a></span>
											</div>`;
						
					} else if (i.tournamentInvite.senderType == "TEAM") {
						jsonData = i.tournamentInvite;
						subReceivedDiv = ` <div class="received-tour1nament-data">
												<span>Recebido do time <a href="/pages/team-info.html?teamId=${jsonData.team.id}">${jsonData.team.name}</a></span>
												<span>Para o campeonato<a href="/pages/tournament/tournament-info.html?id=${jsonData.tournament.id}">${jsonData.tournament.title}</a></span>
											</div>`;
					}

					html = `
					<div class="recived-tournament-invite">
						<div>${subReceivedDiv}</div>
						<button>Rejeitar</button>
					</div>`;

					receivedDiv.innerHTML += html;
				}
			}
		})
		.catch(e => {
			console.log("e: " + e);
		})
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

