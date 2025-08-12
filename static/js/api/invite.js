let receivedInvitesVar = [];
let sentInvitesVar = [];

// MOSTRAR OS CONVITES RECEBIDOS NO HTML
function setReceivedInvite(username) {
	let receivedUrl = `http://localhost:8080/${username}/invites/received`;
	
	fetchPerso(receivedUrl, {
		method: "GET"
	})
	.then(data => {
		let receivedInvitations = document.getElementsByClassName("received-invitations")[0];

		if (data.length == 0) {
			document.getElementById("not-found-received-invitations").innerHTML = "Nenhum convite enviado no momento"
			return;
		}
		
		for (let invite of data) {
			let inviteHTML = let = `
			<div class="received-invite">
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
					<button class="received-accept-invite">Aceitar</button>
					<button class="received-reject-invite">Rejeitar</button>
				</div>
			</div>`;

			receivedInvitesVar.push(invite);

			receivedInvitations.innerHTML += inviteHTML;
		}
	})
}

// MOSTRAR OS CONVITES ENVIADOS NO HTML
function setSentInvite(username) {
	let sentUrl = `http://localhost:8080/${username}/invites/sent`;
	
	fetchPerso(sentUrl, {
		method: "GET"
	})
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

			sentInvitesVar.push(invite);

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

function setInvites() {
	url = "http://localhost:8080/user/auth/get"

	fetchPerso(url, {
		method: "GET"
	})
	.then(user => {
		setReceivedInvite(user.username);
		setSentInvite(user.username);
	})
	.catch(e => {
		console.log("e: " + e);
	})
}

function selectEventsInvitesMenu() {
	const menuItems = document.querySelectorAll('.invites-menu-select span');
	const sections = document.querySelectorAll('.all-invites > div');

	menuItems.forEach(item => {
		item.addEventListener('click', () => {
			// Remove "active" de todos os menus e seções
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

		alert("Convite cancelado")
		window.location.reload();
    } catch (error) {
        console.log("catch => " + error);
    }
}

function acceptInvite() {
}

setInvites();
selectEventsInvitesMenu();
