function getTeam() {
    let urlParam = new URLSearchParams(window.location.search);
    let id = urlParam.get("teamId");
    
    console.log("team id: " + id);
}

getTeam();
