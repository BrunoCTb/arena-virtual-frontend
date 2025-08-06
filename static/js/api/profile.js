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
											<span>${user.username}</span>
									</div>
									<div>
											<span>${user.firstName}</spsan>
									</div>
							</div>

							<div class="profile-created">
									<span>Desde ${null}</span>
							</div>`;

			profileArea.innerHTML += html;

		})
		.catch(error => {
			console.log(error);
		})
}

setProfileArea();
