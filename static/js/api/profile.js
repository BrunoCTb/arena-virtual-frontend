function setProfileArea() {
	const url = 'http://localhost:8080/user/auth/get';

	fetchPerso(url, {
		method: "GET"
	})
		.then(user => {
			console.log("......- " + user);

			let profileArea = document.getElementsByClassName("profile-main-info")[0];
			profileArea.innerHTML = "";

			html = `<div class="profile-image">
						<img src="#" alt="">
					</div>

					<div class="profile-data">
						<div class="profile-name-info">
							<div>
								<span id="p-username">${user.username}</span>
							</div>
							<div>
								<span id="p-firstName">${user.firstName}</spsan>
							</div>
						</div>

						<div class="profile-created">
							<span>Desde:</span>
							<span id="p-created">${null}</span>
						</div>
					</div>
					`;

			profileArea.innerHTML += html;

		})
		.catch(error => {
			console.log(error);
		})
}

function setCreatedTeams() {
	const url = 'http://localhost:8080/user/my/teams';

	fetchPerso(url, {
		method: "GET"
	})
	.then(teams => {
		let createdTeamsDiv = document.getElementsByClassName("profile-created-teams")[0];
		
		if (teams.length == 0) {
			createdTeamsDiv.innerHTML += `<span class="not-found-teams">Nenhum time criado</span>`;
			return;
		}

		for (let t of teams) {
			let html = `
				<div class="created-team">
					<span>${t.name}</span>
					<a href="/pages/team-info.html?teamId=${t.id}">Ver detalhes</a>
				</div>
			`;
			createdTeamsDiv.innerHTML += html;
		}
	})
	.catch(error => {
		console.log(error);
	})
}

function setCreatedTournaments() {
	const url = 'http://localhost:8080/user/my/tournaments';

	fetchPerso(url, {
		method: "GET"
	})
	.then(tournaments => {
		let createdTournamentsDiv = document.getElementsByClassName("created-tournaments-list")[0];
		
		if (tournaments.length == 0) {
			createdTournamentsDiv.innerHTML += `<span class="not-found-tournaments">Nenhum campeonato criado</span>`;
			return;
		}
		
		for (let t of tournaments) {
			let html = `
				<div class="created-tourmanent">
					<span>${t.title}</span>
					<a href="/pages/tournament/tournament-info.html?id=${t.id}">Ver detalhes</a>
				</div>
			`;
			createdTeamsDiv.innerHTML += html;
		}
	})
	.catch(error => {
		console.log(error);
	})
}

function selectEventsMenu() {
	const menuItems = document.querySelectorAll('.profile-menu-options span');
	const sections = document.querySelectorAll('.profile-selected-content > div');

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


setProfileArea();
setCreatedTeams();
setCreatedTournaments();

selectEventsMenu();
