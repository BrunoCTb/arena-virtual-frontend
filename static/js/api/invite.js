let username = "username123"

function setReceivedInvite() {
	let receivedUrl = `http://localhost:8080/${username}/invites/received`;
	
	fetchPerso(receivedUrl, {
		method: "GET"
	})
	.then(data => {
		let receivedInvitations = document.getElementsByClassName("received-invitations")[0];

		if (data.length == 0) {
			document.getElementById("not-received-sent-invitations").innerHTML = "Nenhum convite enviado no momento"
			return;
		}

		for (let received of data) {
			let inviteHTML = let = `<div class="received-invite">
																			<div class="received-invite-content">
																					<div class="received-invite-data">
																							<h2>Solicitação do ${received.invitedTarget.username}</h2>
																							<span>Recebido em ${received.createdAt}</span>
																							<span>Time: ${received.teamTarget.name}</span>
																					</div>
																					<div class="received-invite-status">
																							<span>${received.inviteStatus}</span>
																					</div>
																			</div>
																			<div class="received-invite-actions">
																					<button>Aceitar</button>
																					<button>Rejeitar</button>
																			</div>
																	</div>`

			receivedInvitations.innerHTML += inviteHTML;
		}
	})
}

function setSentInvite() {
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
			let inviteHTML = let = `<div class="sent-invite">
									<div class="sent-invite-content">
											<div class="sent-invite-data">
													<h2>Convite para ${invite.invitedBy.username}</h2>
													<span>Enviado em ${invite.createdAt}</span>
													<span>Time: ${invite.teamTarget.name}</span>
											</div>
											<div class="sent-invite-status">
													<span>${invite.inviteStatus}</span>
											</div>
									</div>
									<div class="sent-invite-actions">
											<button>Cancelar</button>
									</div>
							</div>`

			sentInvitations.innerHTML += inviteHTML;
		}
	})
}

setReceivedInvite();
setSentInvite();

