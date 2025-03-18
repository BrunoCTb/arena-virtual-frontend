function getFormData() {
    // nome, tag, description, image, invites e button de criacao

    let data = document.querySelectorAll(".getData");
    
    let image =  "test.png" // data[0].value;
    title = data[1].value;
    tag = data[2].value;
    description = data[3].value;

    invite = true;
    if (!data[4].checked) invite = false;
    
    
    let json = {
        "name": title,
        "tag": tag,
        "description": description,
        "image": image,
        "invite": invite
    }

    console.log(JSON.stringify(json));
    

}