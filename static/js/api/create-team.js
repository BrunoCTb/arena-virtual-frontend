function getFormData() {
    let data = document.querySelectorAll(".getData");
    
    let image =  "test.png" // data[0].value;
    title = data[1].value;
    tag = data[2].value;
    description = data[3].value;

    invite = true;
    if (!data[4].checked) invite = false;
    
    
    let json = JSON.stringify({
        "name": title,
        "openToInvite": invite,
        "logoUrl": image
        // ATRIBUTOS PARA ADICIONAR DEPOIS
        // "tag": tag,
        // "description": description,
    })

    createTeam(json);
}

async function createTeam(bodyData) {
    console.log(bodyData);
    
    try {
        url = 'http://localhost:8080/team/create';

        let resp = await fetchPerso(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: bodyData
        })

        alert("Time criado com sucesso!");
        window.location.href = "/pages/"
        
        if (!resp) {
            throw "erro ao criar time!";
        }
    } catch (error) {
        console.log(error);
        
    }
}
